// v1/banner-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'banner';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            createdBy: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            updatedBy: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
            attachment: {
                type: String,
                required: true,
            },
            link: {
                type: String,
            },
            status: {
                type: Number,
                enum: [
                    1, // Active
                    0, // Deleted
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
