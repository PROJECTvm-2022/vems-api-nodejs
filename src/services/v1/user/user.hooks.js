import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { disallow, discard, iff, isProvider } from 'feathers-hooks-common';
import CheckEmailOrPhone from '../../../hooks/CheckEmailOrPhone';
import FRequired from '../../../hooks/FRequired';
import HasData from '../../../utils/HasData';
import { INST_SUPER_ADMIN, SUPER_ADMIN } from '../../../constants/Roles';
import Permit from '../../../hooks/Permit';
import setId from '../../../hooks/setId';
import patchDeleted from '../../../hooks/patchDeleted';
import CheckBlocked from './hooks/CheckBlocked';
import setDefaultQuery from '../../../hooks/setDefaultQuery';
import CheckNullQuery from '../../../hooks/CheckNullQuery';

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
    before: {
        all: [],
        find: [authenticate('jwt'), setDefaultQuery('status', { $ne: 0 }), CheckNullQuery('institute')],
        get: [authenticate('jwt')],
        create: [
            authenticate('jwt'),
            hashPassword('password'),
            iff(HasData('role', SUPER_ADMIN), disallow()),
            iff(
                isProvider('external'),
                FRequired(['password', 'email']),
                CheckEmailOrPhone(),
                iff(HasData('role', INST_SUPER_ADMIN), Permit.SUPER_ADMIN),
            ),
            discard('status'),
        ],
        update: [disallow()],
        patch: [
            hashPassword('password'),
            discard('role'),
            iff(
                isProvider('external'),
                authenticate('jwt'),
                iff(HasData('status', 2), Permit.SUPER_ADMIN, CheckBlocked()),
                iff(Permit.is(Permit.SUPER_ADMIN)).else(setId(), discard('email')),
            ),
            iff(HasData('status', 0), disallow()),
        ],
        remove: [iff(isProvider('external'), Permit.SUPER_ADMIN), patchDeleted()],
    },

    after: {
        all: [protect('password')],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },
};
