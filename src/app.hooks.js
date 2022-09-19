// Application hooks that run for every service

import { iff, isProvider } from 'feathers-hooks-common';
import HasAccessToken from './utils/HasAccessToken';
import * as feathersAuthentication from '@feathersjs/authentication';
import CheckForAuthentication from './hooks/CheckForAuthentication';
import CatchError from './hooks/CatchError';
import * as local from '@feathersjs/authentication-local';
import Permit from './hooks/Permit';
import CheckStudentForParent from './hooks/CheckStudentForParent';

const { authenticate } = feathersAuthentication.hooks;
const { protect } = local.hooks;

export default {
    before: {
        all: [
            // iff(HasAccessToken(), authenticate('jwt'), CheckForAuthentication())
        ],
        find: [
            iff(
                isProvider('external'),
                (ctx) => {
                    const { params } = ctx;
                    let {
                        query: { $limit },
                    } = params;
                    if (typeof $limit === 'string') $limit = parseInt($limit);
                    if ($limit === -1) {
                        delete ctx.params.query.$limit;
                        ctx.params.paginate = false;
                    }
                },
                // CheckStudentForParent(),
            ),
        ],
        // get: [iff(isProvider('external'), CheckStudentForParent())],
        create: [],
        update: [],
        patch: [],
        remove: [],
    },

    after: {
        all: [
            // CatchError(),
            // iff(
            //     isProvider('external'),
            //     iff(
            //         HasAccessToken(),
            //         iff(Permit.is(Permit.ADMIN, Permit.SUPER_ADMIN)).else(
            //             protect(
            //                 'password',
            //                 'teacher.password',
            //                 'student.password',
            //                 'institute.password',
            //                 'createdBy.password',
            //                 'user.password',
            //                 'teacher.zoomApiKey',
            //                 'teacher.zoomApiSecret',
            //                 'teacher.zoomAppKey',
            //                 'teacher.zoomAppSecret',
            //             ),
            //         ),
            //     ),
            // ),
        ],
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
