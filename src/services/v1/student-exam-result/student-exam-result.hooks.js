import { disallow } from 'feathers-hooks-common';
import GetStudentExamResult from './hooks/GetStudentExamResult';

export default {
    before: {
        all: [],
        find: [disallow()],
        get: [GetStudentExamResult()],
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
