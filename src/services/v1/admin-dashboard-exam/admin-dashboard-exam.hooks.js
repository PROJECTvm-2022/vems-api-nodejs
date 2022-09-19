import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';
import Permit from '../../../hooks/Permit';
import FRequiredQuery from '../../../hooks/FRequiredQuery';
import GetDayWiseExams from './hooks/GetDayWiseExams';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [Permit.or(Permit.ADMIN, Permit.SUPER_ADMIN), FRequiredQuery(['from', 'to']), GetDayWiseExams()],
        get: [disallow()],
        create: [disallow()],
        update: [disallow()],
        patch: [disallow()],
        remove: [disallow()],
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
