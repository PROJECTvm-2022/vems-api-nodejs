/**
 * Created By Soumya(soumya@smarttersstudio.com) on 10/04/21 at 10:58 PM.
 */
import { CronJob } from 'cron';

const OnScheduledExamCreatedStartCron = async (result, context) => {
    const { app } = context;
    const { scheduledOn, _id: exam, entityType, status, createdAt } = result;

    if (entityType === 'exam' && status === 2) {
        // console.log(scheduledOn);
        const job = new CronJob(scheduledOn, async function () {
            const studentExamService = app.service('v1/student-exam');

            // console.log(createdAt);
            // console.log(exam);
            // const studentExams = await studentExamService
            //     ._find({
            //         query: {
            //             exam,
            //             status: 2,
            //             createdAt: {
            //                 $gte: createdAt,
            //             },
            //         },
            //         paginate: false,
            //     })
            //     .then((res) => res.map((each) => each._id));

            // console.log(studentExams);
            await app.service('v1/exam').patch(exam, {
                status: 3,
            });

            // console.log(startedAt);
            await studentExamService.patch(
                null,
                {
                    status: 3,
                    startedAt: Date.now(),
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
        });

        job.start();
    }
};

export default OnScheduledExamCreatedStartCron;
