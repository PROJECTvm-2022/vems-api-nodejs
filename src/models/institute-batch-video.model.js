// v1/institute-batch-video-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'instituteBatchVideo';
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
            institute: {
                type: ObjectId,
                ref: 'institute',
                required: true,
            },
            instituteCourse: {
                type: ObjectId,
                ref: 'instituteCourse',
                required: true,
            },
            instituteBatch: {
                type: ObjectId,
                ref: 'instituteBatch',
                required: true,
            },
            topic: {
                type: ObjectId,
                ref: 'topic',
            },
            course: {
                type: ObjectId,
                ref: 'course',
                required: true,
            },
            subject: {
                type: ObjectId,
                ref: 'subject',
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
            unit: {
                type: ObjectId,
                ref: 'unit',
                required: true,
            },
            video: {
                type: String,
            },
            thumbnail: {
                type: String,
            },
            videoId: {
                type: ObjectId,
                ref: 'video',
                required: true,
            },
            publicCommentCount: {
                type: Number,
                default: 0,
            },
            privateCommentCount: {
                type: Number,
                default: 0,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // scheduled
                    3, // hidden
                    0, // deleted
                ],
                default: 3,
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
