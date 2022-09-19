// v1/attendance-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'attendance';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            institute: {
                type: ObjectId,
                ref: 'institute',
                required: true,
            },
            instituteBatch: {
                type: ObjectId,
                ref: 'instituteBatch',
                required: true,
            },
            student: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            liveClass: {
                type: ObjectId,
                ref: 'liveClass',
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // attended
                    2, // Not attended
                ],
                required: true,
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
