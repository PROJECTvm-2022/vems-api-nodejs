/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 9:43 PM.
 * @description publish exam result according to given time.
 */
import { CronJob } from 'cron';

const PublishResultOfExam = async (app) => {
    const job = new CronJob('0 */1 * * * *', async function () {
        const examService = app.service('v1/exam');
        // const studentExamService = app.service('v1/student-exam');

        const exams = await examService._find({
            query: {
                entityType: 'exam',
                status: 4,
                resultPublishDate: {
                    $ne: null,
                    $lte: new Date(),
                },
            },
            paginate: false,
        });

        for (const each of exams) {
            const { _id: exam } = each;

            await app.service('v1/exam').patch(exam, {
                status: 6,
            });

            // await studentExamService.patch(
            //     null,
            //     {
            //         status: 6,
            //     },
            //     {
            //         query: {
            //             exam,
            //             $populate: ['answers.question', 'exam'],
            //         },
            //     },
            // );
        }
    });
    job.start();
};

export default PublishResultOfExam;
