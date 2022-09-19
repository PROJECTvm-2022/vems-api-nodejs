/**
 * Created By Soumya(soumya@smarttersstudio.com) on 10/04/21 at 11:23 PM.
 */
import moment from 'moment';
import { CronJob } from 'cron';

const OnScheduledExamStarted = async (result, context) => {
    const { app } = context;

    const { _id: exam, duration, entityType, status, scheduledOn } = result;

    const endDate = new Date(moment(scheduledOn).add(duration, 'minutes').toDate());

    if (entityType === 'exam' && status === 3) {
        const job = new CronJob(endDate, async function () {
            const studentExamService = app.service('v1/student-exam');

            // const studentExams = await studentExamService
            //     ._find({
            //         query: {
            //             exam,
            //             status: 3,
            //         },
            //         paginate: false,
            //     })
            //     .then((res) => res.map((each) => each._id));

            await app.service('v1/exam').patch(exam, {
                status: 4,
            });

            await studentExamService.patch(
                null,
                {
                    status: 4,
                    endedAt: endDate,
                },
                {
                    query: {
                        exam,
                        $populate: ['answers.question', 'exam'],
                    },
                },
            );
            // if (studentExams.length) {
            //
            // }
        });

        job.start();
    }
};

export default OnScheduledExamStarted;
