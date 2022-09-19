// v1/teacher-subject-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const teacherSubject = new Schema(
        {
            teacher: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'user',
            },
            syllabus: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'syllabus',
            },
            course: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'course',
            },
            subject: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'subject',
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    0, // deleted
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
    try {
        return mongooseClient.model('teacherSubject');
    } catch (e) {
        return mongooseClient.model('teacherSubject', teacherSubject);
    }
}
