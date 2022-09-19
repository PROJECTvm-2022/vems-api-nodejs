import { BadRequest } from '@feathersjs/errors';
import { STUDENT } from '../../../../constants/Roles';

const CheckEmail = () => async (context) => {
    const { data, app } = context;
    const { email } = data;

    let emailValue = null,
        rollValue = null;

    if (email) {
        /* eslint-disable no-useless-escape */
        if (
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            )
        ) {
            emailValue = email;
        } else if (email.toString().startsWith('VMEMS')) {
            rollValue = email;
        } else {
            throw new BadRequest('Please provide your email address or roll number of exam.');
        }
    }

    let query = {
        status: { $ne: 0 },
        role: STUDENT,
    };

    let userData = null;

    if (emailValue) {
        query.email = emailValue;

        userData = await app
            .service('v1/user')
            ._find({
                query,
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (!userData) {
            throw new BadRequest('You have not registered yet.');
        }

        data.userData = userData;
    }

    if (rollValue) {
        userData = await app
            .service('v1/student-exam')
            ._find({
                query: {
                    studentExamRoll: rollValue,
                    $limit: 1,
                    status: { $in: [2, 3] },
                    $populate: 'student',
                },
            })
            .then((res) => (res.total ? res.data[0] : null));

        if (!userData) {
            throw new BadRequest('Roll no is not found.');
        }

        data.userData = {
            ...userData.student,
            name: userData.studentName,
        };
    }
};

export default CheckEmail;
