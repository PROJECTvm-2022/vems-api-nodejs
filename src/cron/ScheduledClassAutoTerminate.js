/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 7:01 PM.
 * @description terminates all the scheduled classes whose scheduled
 * times are already passed 1 hour but still not started.
 */

import { CronJob } from 'cron';
import moment from 'moment';

const ScheduledClassAutoTerminate = async (app) => {
    const job = new CronJob('0 */10 * * * *', async function () {
        const liveClassService = app.service('v1/live-class');

        const liveClasses = await liveClassService._find({
            query: {
                status: 1,
                $populate: 'teacherSlot',
                scheduledAt: {
                    $lte: moment().utc(true),
                },
            },
            paginate: false,
        });

        console.log(moment().utc(true));
        console.log(liveClasses);

        for (const each of liveClasses) {
            const {
                scheduledAt,
                teacherSlot: { startTime, endTime },
            } = each;
            const duration = endTime - startTime;
            const estimatedEndTime = moment(scheduledAt)
                .add(duration + 30, 'minutes')
                .utc(false);

            if (moment().utc(true) >= estimatedEndTime) {
                await liveClassService.patch(each._id, {
                    status: 5,
                });
            }
        }
    });
    job.start();
};

export default ScheduledClassAutoTerminate;
