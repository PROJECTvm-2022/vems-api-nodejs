// v1/assignment-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'assignment';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            course: {
                type: Schema.Types.ObjectId,
                ref: 'course',
                required: true,
            },
            syllabus: {
                type: Schema.Types.ObjectId,
                ref: 'syllabus',
                required: true,
            },
            subject: {
                type: Schema.Types.ObjectId,
                ref: 'subject',
                required: true,
            },
            totalMark: {
                type: String,
                required: true,
            },
            questions: [
                {
                    type: {
                        type: String,
                        enum: ['image'],
                        default: 'image',
                    },
                    link: {
                        type: String,
                        required: true,
                    },
                    mark: {
                        type: Number,
                    },
                },
            ],
            instituteBatches: [
                {
                    institute: {
                        type: Schema.Types.ObjectId,
                        ref: 'institute',
                        required: true,
                    },
                    instituteBatch: {
                        type: Schema.Types.ObjectId,
                        ref: 'instituteBatch',
                        required: true,
                    },
                },
            ],
            deadLine: {
                type: Date,
            },
            Instructions: {
                type: [String],
            },
            entityType: {
                type: String,
                enum: ['assignment'],
            },
            entityId: {
                type: String,
            },
            status: {
                type: Number,
                default: 1,
                enum: [
                    0, //Deleted
                    1, //Created
                    2, //Scheduled
                    4, //Ended
                    5, //Cancelled
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
