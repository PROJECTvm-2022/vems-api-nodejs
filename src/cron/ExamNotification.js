/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 9:43 PM.
 * @description sends notification to students regarding exam.
 */
import { CronJob } from 'cron';
import moment from 'moment';
import NotificationHelper from '../utils/NotificationHelper';

const ExamNotification = async (app) => {
    // execute cron job in each minute.
    const job = new CronJob('0 */1 * * * *', async function () {
        const examService = app.service('v1/exam');

        // get current date
        const now = new Date();

        // get all scheduled exams between coming 65 minutes.
        const exams = await examService._find({
            query: {
                entityType: 'exam',
                status: 2,
                scheduledOn: {
                    $gt: now,
                    $lte: moment(now).add(120, 'minutes'),
                },
            },
            paginate: false,
        });

        for (const each of exams) {
            const { scheduledOn } = each;

            // console.log(scheduledOn);
            // console.log(new Date(scheduledOn).getTime());
            // console.log('scheduled', new Date(scheduledOn).getHours());
            // console.log('scheduled', new Date(scheduledOn).getUTCHours());
            // console.log(moment(scheduledOn).local(false).format('dddd, MMMM Do YYYY, [at] h:mm a'));
            // console.log(moment(scheduledOn).utc(true).format('dddd, MMMM Do YYYY, [at] h:mm a'));

            // calculate the time difference between current time and scheduled time.
            const timeDifference = Math.ceil(moment(scheduledOn).diff(now, 'minutes', true));

            // console.log(timeDifference);

            if (timeDifference === 60) {
                // if difference is 60 minutes then send notification
                await NotificationHelper.sendStudentExamNotification(app, each, 2);
            } else if (timeDifference === 5) {
                // if difference is 5 minutes then send notification
                await NotificationHelper.sendStudentExamNotification(app, each, 3);
            }
        }
    });
    job.start();
};

export default ExamNotification;
