// v1/student-assignment-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'studentAssignment';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            assignment: {
                type: Schema.Types.ObjectId,
                ref: 'assignment',
                required: true,
            },
            status: {
                type: Number,
                default: 2,
                enum: [
                    2, //Not Submitted
                    3, //Submitted
                    4, //Verified
                    5, //Expired
                    0, //Cancelled
                ],
            },
            instituteBatch: {
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
            mark: {
                type: Number,
            },
            answers: [
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
                    reviewedLink: {
                        type: String,
                    },
                },
            ],
            student: {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },
            submittedAt: {
                type: Date,
            },
            VerifiedAt: {
                type: Date,
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
