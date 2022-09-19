/**
 * Created By Soumya (soumyaranjansahoo338@gmail.com) on 9/13/2020 at 8:25 PM
 */
import sendNotification from '../../../../utils/sendNotification';

const OnNotificationCreated = async (result, context) => {
    const { app } = context;

    const { action, text, notifiedUser } = result;

    // const fcmIds = [];

    const fcmIds = await app
        .service('v1/user-session')
        ._find({
            query: {
                user: notifiedUser._id ? notifiedUser._id : notifiedUser,
                sessionType: 1,
            },
            paginate: false,
        })
        .then((res) => res.map((each) => each.fcmId));

    // userSessions.forEach((each) => {
    //     if (each.fcmId) fcmIds.push(each.fcmId);
    // });

    if (fcmIds.length > 0) {
        // result.thumbnailAvatar = thumbnailAvatar;

        await sendNotification(app, 'Jupion Classes', text, result, fcmIds, action);
    }
};

export default OnNotificationCreated;
