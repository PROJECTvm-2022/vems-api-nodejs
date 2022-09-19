// v1/live-class-feedback-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'liveClassFeedback';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            student: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            liveClass: {
                type: Schema.Types.ObjectId,
                ref: 'liveClass',
                required: true,
            },
            teacher: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5,
            },
            review: {
                type: String,
            },
            status: {
                type: Number,
                enum: [
                    1, //Active
                ],
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
