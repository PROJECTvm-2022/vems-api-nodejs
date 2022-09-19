/**
 * Created by Soumya(soumya.smartters@gmail.com) on 7/7/2022 at 7:49 PM.
 */

const OnScheduledExamEnded = async (result, context) => {
    const { app, data } = context;

    const { status } = data;

    if (status && status === 4) {
        await app.service('v1/student-exam')._patch(
            null,
            {
                status: 4,
                endedAt: new Date(),
            },
            {
                query: {
                    $populate: ['answers.question', 'exam'],
                    exam: result._id,
                    status: 3,
                    attendanceStatus: 1,
                },
            },
        );

        // console.log('res---------', res);
    }
};

export default OnScheduledExamEnded;
