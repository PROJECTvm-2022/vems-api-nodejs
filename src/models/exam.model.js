// v1/exam-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const exam = new Schema(
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            institute: {
                type: Schema.Types.ObjectId,
                ref: 'institute',
            },
            mark: {
                total: {
                    type: Number,
                    default: 0,
                },
                passingMark: {
                    type: Number,
                    default: 0,
                },
                grades: [
                    {
                        mark: {
                            type: Number,
                            required: true,
                        },
                        name: {
                            type: String,
                            required: true,
                        },
                    },
                ],
            },
            duration: {
                type: Number,
            },
            instructions: {
                type: [String],
            },
            status: {
                type: Number,
                default: 1,
                enum: [
                    0, //Deleted
                    1, //Created
                    2, //Scheduled
                    3, //Started
                    4, //Ended
                    5, //Cancelled
                    6, // published
                ],
            },
            entityId: {
                type: Schema.Types.ObjectId,
                refPath: 'entityType',
            },
            entityType: {
                type: String,
                enum: ['exam'],
            },
            questionRequiredCount: {
                type: Number,
                default: 0,
            },
            questionCount: {
                type: Number,
                default: 0,
            },
            scheduledOn: {
                type: Date,
            },
            endTime: {
                type: Date,
            },
            resultPublishDate: {
                type: Date,
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://github.com/Automattic/mongoose/issues/1251
    try {
        return mongooseClient.model('exam');
    } catch (e) {
        return mongooseClient.model('exam', exam);
    }
}
