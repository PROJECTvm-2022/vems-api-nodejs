// v1/live-class-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'liveClassStats';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            liveClass: {
                type: ObjectId,
                ref: 'liveClass',
                required: true,
            },
            topic: {
                type: String,
                required: true,
            },
            teacher: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            expectedAttendees: {
                type: Number,
                required: true,
            },
            joinedAttendees: {
                type: Number,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
            questions: {
                type: Number,
                required: true,
            },
            chats: {
                type: Number,
                required: true,
            },
            joinedStudents: {
                type: [Object],
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
