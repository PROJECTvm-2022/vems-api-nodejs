import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow, iff, isProvider, keep } from 'feathers-hooks-common';
import Permit from '../../../hooks/Permit';
import setCreatedByQuery from '../../../hooks/setCreatedByQuery';
import setInstituteQuery from '../../../hooks/setInstituteQuery';
import HasData from '../../../utils/HasData';
import setDefaultQuery from '../../../hooks/setDefaultQuery';
import setDefaultItem from '../../../hooks/setDefaultItem';
import SetExamPopulateQuery from './hooks/SetExamPopulateQuery';
import FRequired from '../../../hooks/FRequired';
import setInstitute from '../../../hooks/setInstitute';
import ValidateExamId from './hooks/ValidateExamId';
import CheckStudentData from './hooks/CheckStudentData';
import CheckStudents from '../exam/hooks/CheckStudents';
import CheckIfNotResultPublishDate from './hooks/CheckIfNotResultPublishDate';

const { authenticate } = feathersAuthentication.hooks;
export default {
    before: {
        all: [iff(isProvider('external'), authenticate('jwt'))],
        find: [
            iff(
                isProvider('external'),
                iff(Permit.is(Permit.STUDENT), setCreatedByQuery('student')).else([
                    iff(Permit.is(Permit.INST_SUPER_ADMIN), setInstituteQuery('institute')),
                ]),
            ),
            SetExamPopulateQuery(),
        ],
        get: [
            iff(
                isProvider('external'),
                iff(Permit.is(Permit.STUDENT), setCreatedByQuery('student')).else([
                    iff(Permit.is(Permit.INST_SUPER_ADMIN), setInstituteQuery('institute')),
                ]),
            ),
            SetExamPopulateQuery(),
        ],
        create: [
            FRequired(['exam', 'students']),
            iff(isProvider('external'), Permit.INST_SUPER_ADMIN, CheckStudents()),
            setInstitute(),
            ValidateExamId(),
            CheckStudentData(),
        ],
        update: [disallow()],
        patch: [
            iff(
                isProvider('external'),
                iff(
                    isProvider('socketio'),
                    Permit.STUDENT,
                    // StudentPermission('access_exam'),
                    setCreatedByQuery('student'),
                    setDefaultItem('attendanceStatus', 2),
                    keep('attendanceStatus'),
                ).else(
                    Permit.or(Permit.INST_SUPER_ADMIN),
                    iff(
                        HasData('attendanceStatus', 1),
                        setDefaultQuery('status', 3),
                        setDefaultQuery('attendanceStatus', 3),
                        setInstituteQuery('institute'),
                    ).else(Permit.SUPER_ADMIN),
                ),
            ),
        ],
        remove: [disallow()],
    },

    after: {
        all: [],
        find: [iff(isProvider('external'), iff(Permit.is(Permit.STUDENT), CheckIfNotResultPublishDate()))],
        get: [iff(Permit.is(Permit.STUDENT), CheckIfNotResultPublishDate())],
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
