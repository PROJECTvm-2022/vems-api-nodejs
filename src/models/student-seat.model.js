// v1/Student-seat-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
export default function (app) {
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const { ObjectId } = Schema.Types;
    const studentSeat = new Schema(
        {
            student: {
                type: ObjectId,
                ref: 'user',
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
            instituteBatch: {
                type: ObjectId,
                ref: 'instituteBatch',
            },
            status: {
                type: Number,
                enum: [
                    1, // pending
                    2, // accepted
                    3, // rejected
                    0, // deleted
                ],
                default: 1,
            },
            acceptedOrRejectedBy: {
                type: ObjectId,
                ref: 'user',
            },
            acceptedOrRejectedOn: {
                type: Date,
            },
            removedOn: {
                type: Date,
            },
            type: {
                type: Number,
                enum: [
                    1, // from home
                    2, // from institution
                ],
                required: true,
            },
        },
        {
            timestamps: true,
        },
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://github.com/Automattic/mongoose/issues/1251
    try {
        return mongooseClient.model('studentSeat');
    } catch (e) {
        return mongooseClient.model('studentSeat', studentSeat);
    }
}
