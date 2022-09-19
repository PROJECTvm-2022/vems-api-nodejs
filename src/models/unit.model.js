// v1/unit-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const unit = new Schema(
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
            syllabus: {
                type: ObjectId,
                ref: 'syllabus',
                required: true,
            },
            avatar: {
                type: String,
            },
            chaptersCount: {
                type: Number,
                default: 0,
            },
            topicsCount: {
                type: Number,
                default: 0,
            },
            videosCount: {
                type: Number,
                default: 0,
            },
            order: {
                type: Number,
                default: 0,
            },
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
    // see https://github.com/Automattic/mongoose/issues/1251
    try {
        return mongooseClient.model('unit');
    } catch (e) {
        return mongooseClient.model('unit', unit);
    }
}
