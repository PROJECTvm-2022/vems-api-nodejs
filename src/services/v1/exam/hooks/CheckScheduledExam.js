/**
 * Created By Soumya(soumya@smarttersstudio.com) on 11/04/21 at 1:02 PM.
 */

const CheckScheduledExam = () => async context => {

    const { data, app } = context;

    const { scheduledOn, duration, entityIdData } = data;

    const { _id: entityId, instituteBatches } = entityIdData;

    const batches = instituteBatches.map(each => each.instituteBatch.toString());

    const scheduledExams = await app.service('v1/exam')._find({
        query: {
            status: { $in: [2, 3] },
            entityType: 'exam',
            $populate: 'entityId',
        },
        paginate: false,
    });

};

export default CheckScheduledExam;
