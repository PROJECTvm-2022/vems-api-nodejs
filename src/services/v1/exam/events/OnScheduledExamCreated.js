import NotificationHelper from '../../../../utils/NotificationHelper';

const OnScheduledExamCreated = async (result, context) => {
    const { app, params, data } = context;
    const { students } = data;
    const { entityType, _id: scheduledExam } = result;

    if (entityType === 'exam') {
        if (students && students.length) {
            await app
                .service('v1/student-exam')
                .create(
                    {
                        exam: scheduledExam,
                        students,
                    },
                    {
                        user: params.user,
                    },
                )
                .catch((e) => {
                    // console.error(e);
                });
        }

        // sends notification to students of the exam regarding exam schedule.
        // await NotificationHelper.sendStudentExamNotification(app, result, 1);
    }
};

export default OnScheduledExamCreated;
