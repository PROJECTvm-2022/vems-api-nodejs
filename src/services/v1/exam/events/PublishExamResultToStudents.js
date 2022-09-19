/**
 * Created by Soumya(soumya.smartters@gmail.com) on 6/27/2022 at 12:29 PM.
 */

const PublishExamResultToStudents = async (result, context) => {
    const { app, data } = context;

    const { status } = data;

    if (status === 6) {
        const studentExamService = app.service('v1/student-exam');

        const { _id: exam } = result;

        await studentExamService.patch(
            null,
            {
                status: 6,
                resultPublishDate: new Date(),
            },
            {
                query: {
                    exam,
                    $populate: ['answers.question', 'exam'],
                },
            },
        );
    }
};

export default PublishExamResultToStudents;
