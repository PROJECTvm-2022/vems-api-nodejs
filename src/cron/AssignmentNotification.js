/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 9:43 PM.
 * @description sends notification to students regarding exam.
 */
import { CronJob } from 'cron';
import moment from 'moment';
import NotificationHelper from '../utils/NotificationHelper';

const AssignmentNotification = async (app) => {
    // execute cron job in each minute.
    const job = new CronJob('0 */1 * * * *', async function () {
        const assignmentService = app.service('v1/assignment');

        // get current date
        const now = new Date();

        // get all scheduled exams between coming 65 minutes.
        const exams = await assignmentService._find({
            query: {
                entityType: 'assignment',
                status: 2,
                deadline: {
                    $gt: now,
                    $lte: moment(now).add(120, 'minutes'),
                },
            },
            paginate: false,
        });

        for (const each of exams) {
            const { deadline } = each;

            // calculate the time difference between current time and scheduled time.
            const timeDifference = Math.ceil(moment(deadline).diff(now, 'minutes', true));

            // console.log(timeDifference);

            if (timeDifference === 60) {
                // if difference is 60 minutes then send notification
                await NotificationHelper.sendStudentAssignmentCreatedNotification(app, each, 2);
            } else if (timeDifference === 5) {
                // if difference is 5 minutes then send notification
                await NotificationHelper.sendStudentAssignmentCreatedNotification(app, each, 3);
            }
        }
    });
    job.start();
};

export default AssignmentNotification;
