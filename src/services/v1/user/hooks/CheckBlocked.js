/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 8/12/2020 at 6:36 PM
 */
import { BadRequest } from '@feathersjs/errors';

/**
 * @description check block status for the user.
 * @returns {(function(*): Promise<*>)|*}
 * @constructor
 */
const CheckBlocked = () => async (context) => {
    const { params, app, id, data } = context;

    if (!id) throw new BadRequest('Invalid Operation');

    const { user } = params;
    if (!user) return context;

    const { status } = data;

    if (status) {
        const blockStatusOfUser = await app
            .service('v1/user')
            ._get(id)
            .then((res) => res.status);
        if (status === blockStatusOfUser) throw new BadRequest('Invalid Operation');

        data.blockedOrUnblockedByBy = user._id;
        data.blockedOrUnblockedOn = Date.now();
    }

    return context;
};

export default CheckBlocked;
