/**
 * Created By Soumya(soumya@smarttersstudio.com) on 4/15/2022 at 9:39 PM.
 */
import { BadRequest } from '@feathersjs/errors';

/**
 * @description check duplication of email.
 * @returns {(function(*): Promise<void>)|*}
 * @constructor
 */
const CheckStudents = () => async (context) => {
    const { data } = context;

    const { students } = data;

    if (!Array.isArray(students)) {
        throw new BadRequest('Student must be given in list.');
    }

    students.forEach((e, i) => {
        let studentName = e.name;
        let studentEmail = e.email;

        if (!studentName || !studentEmail) {
            throw new BadRequest('Name and email of the student must be given.');
        }

        let emailIndex = students.findIndex((each) => each.email === studentEmail);

        if (i !== emailIndex) {
            throw new BadRequest('Duplicate email values must not be given.');
        }
    });
};

export default CheckStudents;
