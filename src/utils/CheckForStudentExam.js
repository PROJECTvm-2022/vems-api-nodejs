/**
 * Created By Soumya(soumya@smarttersstudio.com) on 10/04/21 at 4:42 PM.
 * @description Check for ongoing exam of student
 */

const CheckForStudentExam = async (connection, app) => {
    const {
        user: { _id: student, role },
    } = connection;

    if (role === 1) {
        const examService = app.service('v1/student-exam');

        const examData = await examService
            ._find({
                query: {
                    student,
                    status: 3,
                    attendanceStatus: 2,
                    $sort: {
                        startedAt: -1,
                    },
                },
            })
            .then((res) => (res.total ? res.data[0] : null));
        // console.log(examData);

        if (examData) {
            return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    if (!Array.isArray(app.channel('authenticated'))) return null;
                    const authChannelAvailable = app
                        .channel('authenticated')
                        .some((conn) => conn.user._id.toString() === student.toString());

                    if (!authChannelAvailable) {
                        // console.log('Auth channel not exist.');
                        const result = await examService.patch(
                            examData._id,
                            {
                                attendanceStatus: 3,
                            },
                            {
                                query: {
                                    $populate: ['answers.question', 'exam'],
                                },
                            },
                        );
                        // console.log(result);
                        resolve();
                    } else {
                        reject();
                    }
                }, 60000);
            });
        } else {
            return null;
        }
    }
};

export default CheckForStudentExam;
