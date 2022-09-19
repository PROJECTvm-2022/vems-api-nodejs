// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { STUDENT, SUPER_ADMIN, INST_SUPER_ADMIN } from '../constants/Roles';

export default function (app) {
    const modelName = 'user';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new mongooseClient.Schema(
        {
            name: {
                type: String,
            },
            email: {
                type: String,
                lowercase: true,
            },
            password: {
                type: String,
            },
            avatar: {
                type: String,
            },
            role: {
                type: Number,
                enum: [STUDENT, INST_SUPER_ADMIN, SUPER_ADMIN],
                default: 1,
            },
            institute: {
                type: ObjectId,
                ref: 'institute',
                default: null,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // blocked
                    0, // deleted,
                ],
                default: 1,
            },
            blockedOrUnblockedByBy: {
                type: ObjectId,
                ref: 'user',
            },
            blockedOrUnblockedOn: {
                type: Date,
            },
            registrationNumber: {
                type: String,
            },
            zoomApiKey: {
                type: String,
            },
            zoomApiSecret: {
                type: String,
            },
            zoomAppKey: {
                type: String,
            },
            zoomAppSecret: {
                type: String,
            },
            averageRating: {
                type: Number,
            },
            zoomEmail: {
                type: String,
            },
            parentPhone: {
                type: String,
            },
            modules: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'module',
                },
            ],
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
}
