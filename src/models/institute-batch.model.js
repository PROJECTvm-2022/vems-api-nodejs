// v1/institute-batch-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'instituteBatch';
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
            name: {
                type: String,
                required: true,
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
            totalSeatCount: {
                type: Number,
                required: true,
                min: 1,
            },
            acquiredSeatCount: {
                type: Number,
                default: 0,
            },
            price: {
                type: Number,
                required: true,
            },
            syllabuses: [
                {
                    type: ObjectId,
                    ref: 'syllabus',
                },
            ],
            status: {
                type: Number,
                enum: [
                    1, // active
                    0, // deleted
                    -1, // disabled
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
