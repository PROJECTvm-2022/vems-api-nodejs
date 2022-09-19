// v1/material-drive-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const modelName = 'materialDrive';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const schema = new Schema(
        {
            // Title of the material
            title: {
                type: String,
                required: true,
            },

            // Detailed explanation about the material
            description: {
                type: String,
            },

            // Category of the material
            type: {
                type: Number,
                enum: [
                    1, //video
                    2, //reference material
                    3, //question material
                ],
                required: true,
            },

            // Link for the material
            attachment: {
                type: String,
            },

            // Thumbnail link for video materials
            thumbnail: {
                type: String,
            },

            // Duration of video materials
            duration: {
                type: Number,
            },

            // course under which material to be published
            course: {
                type: ObjectId,
                ref: 'course',
                required: true,
            },

            // subject under which material to be published
            subject: {
                type: ObjectId,
                ref: 'subject',
                required: true,
            },

            // syllabus under which material to be published
            syllabus: {
                type: ObjectId,
                ref: 'syllabus',
                required: true,
            },

            // unit under which material to be published
            unit: {
                type: ObjectId,
                ref: 'unit',
                required: true,
            },

            // chapter under which material to be published
            chapter: {
                type: ObjectId,
                ref: 'chapter',
                required: true,
            },

            // topic under which material to be published
            topic: {
                type: ObjectId,
                ref: 'chapter',
            },

            // creator of the material(adminId)
            createdBy: {
                type: ObjectId,
                ref: 'user',
                required: true,
            },

            // editor of the material(adminId)
            updatedBy: {
                type: ObjectId,
                ref: 'user',
            },

            // status of the material
            status: {
                type: Number,
                enum: [
                    1, // active
                    2, // progressing
                    -1, // disabled
                    0, // deleted
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
