// v1/faq-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'faq';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true,
            },
            updatedBy: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    0, // deleted
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
