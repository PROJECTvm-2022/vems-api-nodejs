/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 9:43 PM.
 * @description end all the ongoing exams as per scheduled time.
 */
import { CronJob } from 'cron';
// import moment from 'moment';

const EndOnGoingExam = async (app) => {
    const job = new CronJob('0 */1 * * * *', async function () {
        const examService = app.service('v1/exam');
        // const studentExamService = app.service('v1/student-exam');

        // const now = new Date();

        const exams = await examService._find({
            query: {
                entityType: 'exam',
                status: 3,
                endTime: {
                    $lte: new Date(),
                },
            },
            paginate: false,
        });

        for (const each of exams) {
            const { _id: exam } = each;

            await app.service('v1/exam').patch(exam, {
                status: 4,
            });

            // if (now >= endTime) {
            //     await app.service('v1/exam').patch(exam, {
            //         status: 4,
            //     });
            //
            //     await studentExamService.patch(
            //         null,
            //         {
            //             status: 4,
            //             endedAt: endTime,
            //             attendanceStatus: 3,
            //         },
            //         {
            //             query: {
            //                 exam,
            //                 $populate: ['answers.question', 'exam'],
            //             },
            //         },
            //     );
            // }
        }
    });
    job.start();
};

export default EndOnGoingExam;
