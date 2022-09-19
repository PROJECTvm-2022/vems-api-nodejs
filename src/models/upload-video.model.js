// v1/upload-video-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'uploadVideo';
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
            s3Path: {
                type: String,
            },
            cloudfrontPath: {
                type: String,
            },
            thumbnailPath: {
                type: String,
            },
            length: {
                type: Number,
                default: 0,
            },
            lecture: {
                type: ObjectId,
                ref: 'video',
                default: null,
            },
            materialDrive: {
                type: ObjectId,
                ref: 'materialDrive',
                default: null,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // progressing
                    0, // deleted
                ],
                default: 2,
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
