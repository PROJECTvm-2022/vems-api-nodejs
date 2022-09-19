// v1/timetable-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'timetable';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
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
            teacherSlot: {
                type: ObjectId,
                ref: 'teacherSlot',
                required: true,
            },
            teacher: {
                type: ObjectId,
                required: true,
                ref: 'user',
            },
            syllabus: {
                type: ObjectId,
                ref: 'syllabus',
                required: true,
            },
            subject: {
                type: ObjectId,
                ref: 'subject',
                default: true,
            },
            course: {
                type: ObjectId,
                ref: 'course',
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // requested
                    2, // accepted
                    3, // rejected
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
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
}
