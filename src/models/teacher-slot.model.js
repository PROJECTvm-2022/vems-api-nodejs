// v1/teacher-slot-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'teacherSlot';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            createdBy: {
                type: ObjectId,
                required: true,
                ref: 'user',
            },
            syllabus: {
                type: ObjectId,
                default: null,
                ref: 'syllabus',
            },
            course: {
                type: ObjectId,
                default: null,
                ref: 'course',
            },
            subject: {
                type: ObjectId,
                default: null,
                ref: 'subject',
            },
            teacher: {
                type: ObjectId,
                required: true,
                ref: 'user',
            },
            startTime: {
                type: Number,
                required: true,
            },
            endTime: {
                type: Number,
                required: true,
            },
            day: {
                type: Number,
                required: true,
                enum: [
                    0, // Sunday
                    1, // Monday
                    2, // Tuesday
                    3, // Wednesday
                    4, // Thursday
                    5, // Friday
                    6, // Saturday
                ],
            },
            status: {
                type: Number,
                enum: [
                    1, // open
                    2, // booked
                    0, // deleted
                ],
                default: 1,
            },
            institutionsCount: {
                type: Number,
                default: 0,
            },
            requestsCount: {
                type: Number,
                default: 0,
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
