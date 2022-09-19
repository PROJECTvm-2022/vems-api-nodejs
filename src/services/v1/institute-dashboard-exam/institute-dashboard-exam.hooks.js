import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow, iff } from 'feathers-hooks-common';
import Permit from '../../../hooks/Permit';
import FRequiredQuery from '../../../hooks/FRequiredQuery';
import GetDayWiseExams from '../admin-dashboard-exam/hooks/GetDayWiseExams';
import setInstituteQuery from '../../../hooks/setInstituteQuery';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [
            iff(Permit.is(Permit.INST_ADMIN, Permit.INST_SUPER_ADMIN), setInstituteQuery()).else(
                FRequiredQuery(['institute']),
            ),
            FRequiredQuery(['from', 'to']),
            GetDayWiseExams(),
        ],
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
