/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 6:14 PM.
 * @description things to be managed after institute super user is deleted.
 */
import { INST_SUPER_ADMIN } from '../../../../constants/Roles';

const OnInstituteSuperUserDeleted = async (result, context) => {
    const { app, params } = context;

    const { role, institute } = result;

    if (role === INST_SUPER_ADMIN) {
        await app.service('v1/institute').remove(institute, { user: params.user });
    }
};

export default OnInstituteSuperUserDeleted;
