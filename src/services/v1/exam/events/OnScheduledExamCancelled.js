/**
 * Created By Soumya(soumya@smarttersstudio.com) on 10/04/21 at 11:23 PM.
 */
import NotificationHelper from '../../../../utils/NotificationHelper';

const OnScheduledExamCancelled = async (result, context) => {
    const { app } = context;

    const { _id: exam, entityType, status } = result;

    if (entityType === 'exam' && (status === 5 || status === 0)) {
        const studentExamService = app.service('v1/student-exam');

        // const studentExams = await studentExamService
        //     ._find({
        //         query: {
        //             exam,
        //             status: 2,
        //         },
        //         paginate: false,
        //     })
        //     .then((res) => res.map((each) => each._id));

        await studentExamService.patch(
            null,
            {
                status: 5,
            },
            {
                query: {
                    exam,
                    $populate: ['answers.question', 'exam'],
                },
            },
        );

        // sends notification to students of the exam regarding exam cancellation.
        // await NotificationHelper.sendStudentExamNotification(app, result, 4);

        // if (studentExams.length) {
        //
        // }
    }
};

export default OnScheduledExamCancelled;
