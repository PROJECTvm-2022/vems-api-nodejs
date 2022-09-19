import * as feathersAuthentication from '@feathersjs/authentication';
import Permit from '../../../hooks/Permit';
import FRequired from '../../../hooks/FRequired';
import setCreatedBy from '../../../hooks/setCreatedBy';
import { disallow, iff, isProvider } from 'feathers-hooks-common';
import patchDeleted from '../../../hooks/patchDeleted';
import setDefaultQuery from '../../../hooks/setDefaultQuery';
import HasData from '../../../utils/HasData';
import validateExam from './hooks/validateExam';
import setDefaultItem from '../../../hooks/setDefaultItem';
import setCreatedByQuery from '../../../hooks/setCreatedByQuery';
import setInstitute from '../../../hooks/setInstitute';
import CheckStudents from './hooks/CheckStudents';
import SetCurrentTime from '../../../hooks/SetCurrentTime';
import HasDataExist from '../../../utils/HasDataExist';
import CheckResultPublishDate from './hooks/CheckResultPublishDate';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [
            iff(Permit.is(Permit.SUPER_ADMIN)).else(
                iff(Permit.is(Permit.INST_SUPER_ADMIN), setCreatedByQuery()).else(disallow()),
            ),
            (ctx) => {
                const {
                    params: { query },
                } = ctx;
                if (!query.status) query.status = { $ne: 0 };
            },
        ],
        get: [
            iff(Permit.is(Permit.SUPER_ADMIN)).else(
                iff(Permit.is(Permit.INST_SUPER_ADMIN), setCreatedByQuery()).else(disallow()),
            ),
            (ctx) => {
                const {
                    params: { query },
                } = ctx;
                if (!query.status) query.status = { $ne: 0 };
            },
        ],
        create: [
            Permit.INST_SUPER_ADMIN,
            setCreatedBy(),
            setInstitute(),
            iff(HasData('entityType', 'exam'), [
                FRequired(['entityId', 'scheduledOn', 'endTime', 'duration']),
                validateExam(),
                setDefaultItem('status', 2),
                iff(HasData('students'), CheckStudents()),
            ]).else(FRequired(['title', 'description'])),
        ],
        update: [disallow()],
        patch: [
            iff(
                isProvider('external'),
                Permit.INST_SUPER_ADMIN,
                setDefaultQuery('status', {
                    $in: [1, 2, 3, 4],
                }),
                iff(HasDataExist('resultPublishDate'), setDefaultQuery('status', 4), CheckResultPublishDate()),
                iff(HasData('status', 6), setDefaultQuery('status', 4), SetCurrentTime('resultPublishDate')),
            ),
        ],
        remove: [Permit.SUPER_ADMIN, patchDeleted()],
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
