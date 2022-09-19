/**
 * Created By Soumya(soumya@smarttersstudio.com) on 02-12-2021 at 15:55.
 * @description check if user is a student.
 */
import { BadRequest } from '@feathersjs/errors';
import { STUDENT } from '../constants/Roles';

/**
 *
 * @returns {function(*): boolean}
 * @constructor
 */
const IsStudent = () => async (context) => {
    const { id, app, params } = context;

    const {
        user: { institute },
    } = params;

    if (!id) return false;

    const userData = await app
        .service('v1/user')
        ._get(id, {
            query: {
                institute: { $ne: null },
                status: { $ne: 0 },
            },
        })
        // eslint-disable-next-line no-unused-vars
        .catch((e) => {
            throw new BadRequest('Invalid user id given.');
        });

    return userData.role === STUDENT && userData.institute._id.toString() === institute.toString();
};

export default IsStudent;
