// v1/student-video-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'studentVideo';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            student: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
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
            instituteBatchVideo: {
                type: ObjectId,
                ref: 'instituteBatchVideo',
                required: true,
            },
            topic: {
                type: ObjectId,
                ref: 'topic',
            },
            unit: {
                type: ObjectId,
                ref: 'unit',
                required: true,
            },
            chapter: {
                type: ObjectId,
                ref: 'chapter',
                required: true,
            },
            syllabus: {
                type: ObjectId,
                ref: 'syllabus',
                required: true,
            },
            video: {
                type: String,
            },
            thumbnail: {
                type: String,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // locked
                    3, // hidden
                    0, // deleted
                ],
                default: 3,
            },
            videoId: {
                type: ObjectId,
                ref: 'video',
                required: true,
            },
            answers: {
                type: [
                    {
                        question: {
                            type: ObjectId,
                            ref: 'question',
                        },
                        answer: {
                            type: String,
                        },
                        status: {
                            type: Number,
                            enum: [
                                1, // correct
                                2, // wrong
                            ],
                        },
                    },
                ],
            },
            scheduledOn: {
                type: Date,
                default: null,
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
