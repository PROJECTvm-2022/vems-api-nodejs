import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow, discard, iff, isProvider } from 'feathers-hooks-common';
import Permit from '../../../hooks/Permit';
import FRequired from '../../../hooks/FRequired';
import setCreatedBy from '../../../hooks/setCreatedBy';
import patchDeleted from '../../../hooks/patchDeleted';
import setCreatedByQuery from '../../../hooks/setCreatedByQuery';
import setDefaultQuery from '../../../hooks/setDefaultQuery';
import MakeNotificationsRead from './hooks/MakeNotificationsRead';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [
            iff(Permit.is(Permit.ADMIN, Permit.SUPER_ADMIN)).else(setCreatedByQuery('notifiedUser')),
            setDefaultQuery('status', { $ne: 0 }),
            setDefaultQuery('$populate', 'entityId'),
        ],
        get: [disallow()],
        create: [
            iff(isProvider('external'), Permit.ADMIN),
            FRequired(['notifiedUser', 'entityType', 'entityId', 'action', 'text']),
            setCreatedBy(),
            discard('status'),
        ],
        update: [disallow()],
        patch: [disallow()],
        remove: [Permit.ADMIN, patchDeleted()],
    },

    after: {
        all: [],
        find: [MakeNotificationsRead()],
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
