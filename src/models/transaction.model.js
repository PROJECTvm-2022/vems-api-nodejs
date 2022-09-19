// v1/transaction-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'transaction';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            createdBy: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            institute: {
                type: ObjectId,
                ref: 'institute',
            },
            type: {
                type: Number,
                enum: [
                    1, // From student to institute
                    2, // From institute to admin
                    3, // From admin to institute
                ],
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            payment: {
                type: String,
            },
            entityType: {
                type: String,
                enum: ['studentSeat'],
                required: true,
            },
            entityId: {
                type: ObjectId,
                refPath: 'entityType',
            },
            status: {
                type: Number,
                enum: [
                    1, // initiated
                    2, // completed
                    3, // cancelled
                ],
                default: 1,
            },
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
