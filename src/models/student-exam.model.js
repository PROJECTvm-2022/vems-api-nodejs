// v1/student-exam-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const studentExam = new Schema(
        {
            exam: {
                type: Schema.Types.ObjectId,
                ref: 'exam',
                required: true,
            },
            status: {
                type: Number,
                default: 2,
                enum: [
                    2, //Scheduled
                    3, //Started
                    4, //Ended
                    5, //Cancelled
                    6, // published
                ],
            },
            attendanceStatus: {
                type: Number,
                default: 1,
                enum: [
                    1, //Not-attended
                    2, //Joined
                    3, //Completed
                ],
            },
            institute: {
                type: Schema.Types.ObjectId,
                ref: 'institute',
                required: true,
            },
            mark: {
                type: Number,
            },
            grade: {
                type: String,
            },
            answers: [
                {
                    question: {
                        type: Schema.Types.ObjectId,
                        ref: 'question',
                        required: true,
                    },
                    answer: {
                        type: String,
                    },
                    isCorrect: {
                        type: Boolean,
                    },
                },
            ],
            startedAt: {
                type: Date,
            },
            endedAt: {
                type: Date,
            },
            resultPublishDate: {
                type: Date,
            },
            student: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            studentName: {
                type: String,
                required: true,
            },
            studentExamRoll: {
                type: String,
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://github.com/Automattic/mongoose/issues/1251
    try {
        return mongooseClient.model('studentExam');
    } catch (e) {
        return mongooseClient.model('studentExam', studentExam);
    }
}
