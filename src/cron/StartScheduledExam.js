/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 9:43 PM.
 * @description start all the scheduled exams as per time.
 */
import { CronJob } from 'cron';

const StartScheduledExam = async (app) => {
    const job = new CronJob('0 */1 * * * *', async function () {
        const examService = app.service('v1/exam');
        const studentExamService = app.service('v1/student-exam');

        const now = new Date();

        const exams = await examService._find({
            query: {
                entityType: 'exam',
                status: 2,
                scheduledOn: {
                    $lte: now,
                },
            },
            paginate: false,
        });

        // console.log(exams);

        for (const each of exams) {
            const { _id: exam, createdAt } = each;

            // console.log(each.scheduledOn < now);
            await app.service('v1/exam').patch(exam, {
                status: 3,
            });

            await studentExamService.patch(
                null,
                {
                    status: 3,
                    startedAt: now,
                },
                {
                    query: {
                        exam,
                        $populate: ['answers.question', 'exam'],
                        createdAt: {
                            $gte: createdAt,
                        },
                    },
                },
            );
        }
    });
    job.start();
};

export default StartScheduledExam;
