// v1/chat-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'chat';
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
            text: {
                type: String,
                default: '',
            },
            answerOfQuiz: {
                type: String,
                default: '',
            },
            attachments: {
                type: [String],
                default: [],
            },
            entityType: {
                type: String,
                enum: ['liveClass', 'chat'],
                required: true,
            },
            entityId: {
                type: ObjectId,
                required: true,
                refPath: 'entityType',
            },
            duration: {
                type: Number,
            },
            type: {
                type: Number,
                enum: [
                    1, // message
                    2, // quiz
                    3, // quiz-answer
                ],
                required: true,
            },
            options: {
                type: [
                    {
                        name: {
                            type: String,
                            required: true,
                        },
                        supportCount: {
                            type: Number,
                            default: 0,
                        },
                    },
                ],
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // quiz created
                    3, // quiz ended
                    0, // deleted
                ],
                required: true,
            },
            publishedAt: {
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
