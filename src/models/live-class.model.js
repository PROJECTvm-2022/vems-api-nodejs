// v1/live-class-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'liveClass';
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
            topic: {
                type: String,
            },
            teacher: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            teacherSlot: {
                type: ObjectId,
                ref: 'teacherSlot',
                required: true,
            },
            syllabus: {
                type: ObjectId,
                required: true,
                ref: 'syllabus',
            },
            course: {
                type: ObjectId,
                required: true,
                ref: 'course',
            },
            subject: {
                type: ObjectId,
                required: true,
                ref: 'subject',
            },
            meetingId: {
                type: String,
                required: true,
            },
            meetingPassword: {
                type: String,
                default: '',
            },
            scheduledAt: {
                type: Date,
                required: true,
            },
            endedAt: {
                type: Date,
            },
            status: {
                type: Number,
                enum: [
                    1, // scheduled
                    2, // started
                    4, // ended
                    5, // terminated
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
