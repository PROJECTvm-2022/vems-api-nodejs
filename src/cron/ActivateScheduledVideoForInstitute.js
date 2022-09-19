/**
 * Created By Soumya(soumyaranjansahoo338@gmail.com) on 2/19/2021 at 8:15 PM
 */
import { CronJob } from 'cron';

const ActivateScheduledVideoForInstitute = async (app) => {
    const job = new CronJob('*/2 * * * *', async function () {
        // console.log(1);
        try {
            const service = app.service('v1/institute-batch-video');
            const instituteBatchVideos = await service
                ._find({
                    query: {
                        status: 2,
                        scheduledOn: { $lte: Date.now() },
                    },
                    paginate: false,
                })
                .then((res) => (res.length ? res.map((each) => each._id) : null));

            // console.log(instituteBatchVideos);
            if (instituteBatchVideos) {
                await service.patch(
                    null,
                    {
                        status: 1,
                    },
                    {
                        query: {
                            _id: {
                                $in: instituteBatchVideos,
                            },
                        },
                    },
                );
            }
        } catch (e) {
            // console.log(e);
        }
    });
    job.start();
};

export default ActivateScheduledVideoForInstitute;
