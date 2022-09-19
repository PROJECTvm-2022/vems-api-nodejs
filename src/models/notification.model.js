// v1/notification-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'notification';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            createdBy: {
                type: ObjectId,
                ref: 'user',
                default: null,
            },
            notifiedUser: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            entityType: {
                type: String,
                enum: ['liveClass', 'studentVideo', 'studentExam', 'studentAssignment'],
                required: true,
            },
            entityId: {
                type: ObjectId,
                ref: 'entityType',
                required: true,
            },
            action: {
                type: String,
                enum: [
                    'liveClassSchedule',
                    'liveClassTerminate',
                    'liveClassEnded',
                    'videoAdded',
                    'examSchedule',
                    'examTerminate',
                    'assignmentSchedule',
                    'assignmentTerminate',
                ],
                required: true,
            },
            status: {
                type: Number,
                enum: [
                    1, // created
                    2, // seen
                    3, // deleted
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
