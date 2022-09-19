// v1/institute-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'institute';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            user: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },
            updatedBy: {
                type: ObjectId,
                ref: 'user',
            },
            email: {
                type: String,
            },
            phone: {
                type: String,
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    0, // deleted
                    2, // pending,
                    -1, // deactivated
                ],
                default: 2,
            },
            yearOfEstablishment: {
                type: Number,
            },
            logo: {
                type: String,
                // required: true,
            },
            cover: {
                type: String,
            },
            name: {
                type: String,
                required: true,
            },
            about: {
                type: String,
            },
            website: {
                type: String,
            },
            colorCode: {
                primary: {
                    type: String,
                },
                secondary: {
                    type: String,
                },
            },
            address: {
                type: String,
            },
            state: {
                type: String,
            },
            city: {
                type: String,
            },
            pin: {
                type: String,
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
