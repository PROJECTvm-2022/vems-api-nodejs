// v1/user-session-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'userSession';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            user: {
                type: ObjectId,
                ref: 'user',
                required: true,
                index: true,
            },
            sessionType: {
                type: Number,
                enum: [
                    1, // authentication
                    2, // passwordReset
                ],
                index: true,
            },
            fcmId: {
                type: String,
                index: true,
            },
            accessToken: {
                type: String,
                required: true,
            },
            tokenExpiredAt: {
                type: Date,
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
