// v1/video-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const video = new Schema(
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
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            video: {
                type: String,
            },
            thumbnail: {
                type: String,
            },
            duration: {
                type: Number,
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
            order: {
                type: Number,
                default: 0,
            },
            questionCount: {
                type: Number,
                default: 0,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // processing
                    0, // deleted
                    -1, // disabled
                ],
                default: 2,
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://github.com/Automattic/mongoose/issues/1251
    try {
        return mongooseClient.model('video');
    } catch (e) {
        return mongooseClient.model('video', video);
    }
}
