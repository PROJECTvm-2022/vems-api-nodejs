/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 8:51 PM.
 * @description sends notification to students regarding live class.
 */
import { CronJob } from 'cron';
import moment from 'moment';
import NotificationHelper from '../utils/NotificationHelper';

const LiveClassNotification = async (app) => {
    const job = new CronJob('0 */1 * * * *', async function () {
        const liveClassService = app.service('v1/live-class');

        const now = moment().utc(true);
        // console.log(now);
        const liveClasses = await liveClassService._find({
            query: {
                status: 1,
                $populate: 'teacherSlot',
                scheduledAt: {
                    $gt: now,
                    $lte: moment().utc(true).add(65, 'minutes'),
                },
            },
            paginate: false,
        });

        // console.log(now);
        // console.log(liveClasses.length);
        for (const each of liveClasses) {
            const { scheduledAt } = each;
            // console.log(moment(scheduledAt).utc(false));
            // console.log(moment(scheduledAt).utc(false).diff(now, 'minutes', true));
            const timeDifference = Math.ceil(moment(scheduledAt).utc(false).diff(now, 'minutes', true));
            //
            // console.log(timeDifference);
            if (timeDifference === 60) {
                await NotificationHelper.sendLiveClassNotification(app, each, {}, 2);
            } else if (timeDifference === 5) {
                await NotificationHelper.sendLiveClassNotification(app, each, {}, 3);
            }
        }
    });
    job.start();
};

export default LiveClassNotification;
