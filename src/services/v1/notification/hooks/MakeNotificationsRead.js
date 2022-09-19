/**
 * Created By Soumya (soumyaranjansahoo338@gmail.com) on 9/13/2020 at 8:50 PM
 * @description make the notification read
 */

const MakeNotificationsRead = () => async (context) => {
    const { params, app } = context;

    const { user } = params;

    const unreadNotifications = await app
        .service('v1/notification')
        ._find({
            query: {
                notifiedUser: user._id,
                status: 1,
            },
            paginate: false,
        })
        .then((res) => res.map((each) => each._id));

    if (unreadNotifications.length > 0) {
        await app.service('v1/notification')._patch(
            null,
            {
                status: 2,
            },
            {
                query: {
                    _id: {
                        $in: unreadNotifications,
                    },
                },
            },
        );
    }

    return context;
};

export default MakeNotificationsRead;
