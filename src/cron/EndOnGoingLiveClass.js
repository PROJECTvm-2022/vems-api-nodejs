/**
 * Created by Soumya (soumya@smarttersstudio.com) on 12/06/21 at 8:27 PM.
 * @description End on going live class that exceeds their estimated end time.
 */
import { CronJob } from 'cron';
import moment from 'moment';

const EndOnGoingLiveClass = async (app) => {
    const job = new CronJob('0 */1 * * * *', async function () {
        const liveClassService = app.service('v1/live-class');

        const now = moment().utc(true);
        // console.log(now.toDate());

        const liveClasses = await liveClassService._find({
            query: {
                status: {
                    $in: [1, 2],
                },
                scheduledAt: {
                    $lte: now,
                },
                $populate: 'teacherSlot',
            },
            paginate: false,
        });

        // console.log(liveClasses.length);
        const patchLiveClass = async (id, data) => {
            await liveClassService.patch(id, data);
        };

        for (const each of liveClasses) {
            const {
                scheduledAt,
                teacherSlot: { startTime, endTime },
                status,
                _id,
            } = each;
            const duration = endTime - startTime;
            // console.log(moment().utc(true).format('h:mm a') > moment(scheduledAt).add
            // (duration, 'minutes').utc(false).format('h:mm a'));
            // console.log(moment(scheduledAt).utcOffset(getTimeZoneOffset).toDate());
            const estimatedEndTime = moment(scheduledAt)
                .add(duration + 30, 'minutes')
                .utc(false);
            // console.log(estimatedEndTime);
            // console.log(now);
            // console.log(estimatedEndTime < now);
            if (estimatedEndTime < now) {
                if (status === 1) {
                    await patchLiveClass(_id, {
                        status: 5,
                    });
                } else if (status === 2) {
                    await patchLiveClass(_id, {
                        status: 4,
                        endedAt: now,
                    });
                }
            }
        }
    });
    job.start();
};

export default EndOnGoingLiveClass;
