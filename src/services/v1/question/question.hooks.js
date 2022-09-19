import * as feathersAuthentication from '@feathersjs/authentication';
import Permit from '../../../hooks/Permit';
import { disallow, discard, iff, isProvider } from 'feathers-hooks-common';
import setCreatedBy from '../../../hooks/setCreatedBy';
import patchDeleted from '../../../hooks/patchDeleted';
import setDefaultQuery from '../../../hooks/setDefaultQuery';
import FRequiredQuery from '../../../hooks/FRequiredQuery';
import FRequired from '../../../hooks/FRequired';
import CheckMarkRequiredForExam from './hooks/CheckMarkRequiredForExam';
import CheckExam from './hooks/CheckExam';
import CheckQuestionLimitReached from './hooks/CheckQuestionLimitReached';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [iff(isProvider('external'), FRequiredQuery(['entityId'])), setDefaultQuery('status', { $ne: 0 })],
        get: [iff(isProvider('external'), FRequiredQuery(['entityId']), setDefaultQuery('status', { $ne: 0 }))],
        create: [
            Permit.INST_SUPER_ADMIN,
            FRequired(['question', 'answerType', 'answer', 'entityType', 'entityId']),
            CheckExam(),
            CheckMarkRequiredForExam(),
            CheckQuestionLimitReached(),
            setCreatedBy(),
            discard('status', 'updatedBy'),
        ],
        update: [disallow()],
        patch: [
            Permit.INST_SUPER_ADMIN,
            discard('createdBy', 'status', 'entityId', 'entityType'),
            setCreatedBy('updatedBy'),
        ],
        remove: [Permit.INST_SUPER_ADMIN, patchDeleted()],
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
