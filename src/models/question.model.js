// v1/question-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'question';
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
            updatedBy: {
                type: ObjectId,
                ref: 'user',
            },
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: {
                    answerOfQuestion: {
                        type: [String],
                        required: true,
                    },
                    description: {
                        type: String,
                        default: '',
                    },
                },
                required: true,
            },
            mark: {
                type: Number,
            },
            negativeMark: {
                type: Number,
                default: 0,
            },
            choices: {
                type: [String],
                default: [],
            },
            answerType: {
                type: Number,
                required: true,
                enum: [
                    1, // multiple-choice
                    2, // single-answer
                ],
            },
            entityType: {
                type: String,
                enum: ['video', 'exam'],
                required: true,
            },
            entityId: {
                type: ObjectId,
                required: true,
                refPath: 'entityType',
            },
            questionType: {
                /**
                 * 1. theory
                 * 2. practical
                 */
                type: Number,
                default: 1,
                enum: [
                    1, // theory
                    2, // practical
                ],
            },
            hardnessLevel: {
                /**
                 * 1. easy
                 * 2. medium
                 * 3. hard
                 */
                type: Number,
                default: 1,
                enum: [
                    1, // easy
                    2, // medium
                    3, // hard
                ],
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    0, // deleted
                    -1, // disabled
                ],
                default: 1,
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://github.com/Automattic/mongoose/issues/1251
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
}
