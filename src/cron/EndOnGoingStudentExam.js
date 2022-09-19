/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 9:43 PM.
 * @description end all the ongoing student exams as per scheduled time.
 */
import { CronJob } from 'cron';
import moment from 'moment';

const EndOnGoingStudentExam = async (app) => {
    const job = new CronJob('0 */1 * * * *', async function () {
        const studentExamService = app.service('v1/student-exam');

        const now = new Date();

        const exams = await studentExamService._find({
            query: {
                status: 3,
                attendanceStatus: 2,
                $populate: {
                    path: 'exam',
                    select: ['duration'],
                },
            },
            paginate: false,
        });

        // console.log(exams);
        for (const each of exams) {
            const {
                _id: studentExamId,
                exam: { duration },
                startedAt,
            } = each;

            // console.log(duration);
            const endTime = moment(startedAt).add(duration, 'minutes').toDate();

            if (now >= endTime) {
                // console.log(1);
                await studentExamService.patch(
                    studentExamId,
                    {
                        status: 4,
                        endedAt: endTime,
                        attendanceStatus: 3,
                    },
                    {
                        query: {
                            $populate: ['answers.question', 'exam'],
                        },
                    },
                );
            }
        }
    });
    job.start();
};

export default EndOnGoingStudentExam;
