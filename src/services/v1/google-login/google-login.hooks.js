import { disallow } from 'feathers-hooks-common';
import SetIp from '../../../hooks/SetIp';
import FRequired from '../../../hooks/FRequired';
import CatchCustomError from '../../../hooks/CatchCustomError';

export default {
    before: {
        all: [],
        find: [disallow()],
        get: [disallow()],
        create: [SetIp(), FRequired(['accessToken'])],
        update: [disallow()],
        patch: [disallow()],
        remove: [disallow()],
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [CatchCustomError()],
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
