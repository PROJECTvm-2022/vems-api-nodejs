/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 1/7/2021 at 3:06 AM
 */
import { STUDENT } from '../constants/Roles';

const CheckForUserSession = () => async (context) => {
    const { result, app, data } = context;

    const { user, accessToken } = result;

    const { strategy, fcmId } = data;

    const sessionService = app.service('v1/user-session');

    const userRole = user.role;

    let sessionData;

    if (userRole === STUDENT) {
        sessionData = await sessionService
            ._find({
                query: {
                    user: user._id,
                    sessionType: 1,
                    $sort: {
                        createdAt: -1,
                    },
                },
                paginate: false,
            })
            .then((res) => (res.length ? res : null));
    } else {
        sessionData = await sessionService
            ._find({
                query: {
                    user: user._id,
                    sessionType: 1,
                    fcmId,
                },
                paginate: false,
            })
            .then((res) => (res.length ? res : null));
    }

    if (sessionData && strategy && strategy === 'jwt') {
        await sessionService.patch(sessionData[0]._id, {
            accessToken,
        });

        return context;
    }

    if (sessionData) {
        if (userRole === STUDENT) {
            for (const each of sessionData) {
                await sessionService.remove(each._id);
            }
        }
    }

    await sessionService.create({
        user: user._id,
        sessionType: 1,
        accessToken,
        fcmId,
    });
};

export default CheckForUserSession;
