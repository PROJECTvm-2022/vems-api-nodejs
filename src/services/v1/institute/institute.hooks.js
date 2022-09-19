import * as feathersAuthentication from '@feathersjs/authentication';
import setDefaultQuery from '../../../hooks/setDefaultQuery';
import Permit from '../../../hooks/Permit';
import setCreatedBy from '../../../hooks/setCreatedBy';
import { disallow, discard, iff, isProvider } from 'feathers-hooks-common';
import setInstituteQuery from '../../../hooks/setInstituteQuery';
import patchDeleted from '../../../hooks/patchDeleted';
import FRequired from '../../../hooks/FRequired';
import ModuleValidateData from '../../../hooks/ModuleValidate';
import setDefaultItem from '../../../hooks/setDefaultItem';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [],
        find: [setDefaultQuery('status', { $ne: 0 })],
        get: [],
        create: [
            authenticate('jwt'),
            Permit.SUPER_ADMIN,
            FRequired(['user']),
            ModuleValidateData.isUser(),
            setDefaultItem('status', 1),
            discard('updatedBy'),
        ],
        update: [disallow()],
        patch: [
            authenticate('jwt'),
            Permit.or(Permit.SUPER_ADMIN, Permit.INST_SUPER_ADMIN),
            iff(Permit.is(Permit.INST_ADMIN, Permit.INST_SUPER_ADMIN), setInstituteQuery('_id'), discard('status')),
            setCreatedBy('updatedBy'),
            discard('createdBy', 'user'),
        ],
        remove: [authenticate('jwt'), iff(isProvider('external'), Permit.SUPER_ADMIN), patchDeleted()],
    },

    after: {
        all: [],
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
