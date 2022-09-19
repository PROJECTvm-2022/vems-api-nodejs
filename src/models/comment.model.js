// v1/comment-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const comment = new Schema(
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
            comment: {
                type: String,
                required: true,
            },
            entityType: {
                type: String,
                enum: ['instituteBatchVideo', 'comment'],
                required: true,
            },
            entityId: {
                type: ObjectId,
                required: true,
                refPath: 'entityType',
            },
            parentEntityType: {
                type: String,
                enum: ['instituteBatchVideo', 'video'],
                required: true,
            },
            parentEntityId: {
                type: ObjectId,
                required: true,
                refPath: 'parentEntityType',
            },
            type: {
                type: Number,
                default: 1,
                enum: [
                    1, // public
                    2, //private
                ],
            },
            status: {
                type: Number,
                enum: [
                    1, // active
                    0,
                ],
                default: 1,
            },
            commentCount: {
                type: Number,
                default: 0,
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://github.com/Automattic/mongoose/issues/1251
    try {
        return mongooseClient.model('comment');
    } catch (e) {
        return mongooseClient.model('comment', comment);
    }
}
