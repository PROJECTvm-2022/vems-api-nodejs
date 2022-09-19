import FRequired from '../../../hooks/FRequired';
import SendLogInOTP from './hooks/SendLogInOTP';
import { disallow } from 'feathers-hooks-common';
import CheckLogInOTP from './hooks/CheckLogInOTP';
import CheckEmail from './hooks/CheckEmail';

export default {
    before: {
        all: [],
        find: [disallow()],
        get: [disallow()],
        create: [FRequired(['email']), CheckEmail(), SendLogInOTP()],
        update: [disallow()],
        patch: [FRequired(['otp', 'email']), CheckLogInOTP()],
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
