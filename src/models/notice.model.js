// v1/notice-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'notice';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            attachment: {
                type: String,
            },
            link: {
                type: String,
            },
            banner: {
                type: String,
            },
            icon: {
                type: String,
            },
            userTypes: {
                type: [Number],
                required: true,
            },
            institutes: [
                {
                    institute: {
                        type: Schema.Types.ObjectId,
                        ref: 'institute',
                        required: true,
                    },
                    batches: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'instituteBatch',
                        },
                    ],
                },
            ],

            status: {
                type: Number,
                enum: [
                    1, // Active
                    0, // Deleted
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
