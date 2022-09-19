/**
 * Created By Soumya(soumya@smarttersstudio.com) on 6/2/2022 at 12:10 PM.
 */
import { BadRequest } from '@feathersjs/errors';

/**
 * @description get student exam result.
 * @returns {function(*): *}
 * @constructor
 */
const GetStudentExamResult = () => async (context) => {
    const { app, id } = context;

    if (!id) throw new BadRequest('Please provide an exam roll no.');

    const studentExamService = app.service('v1/student-exam');

    const studentExamData = await studentExamService
        .find({
            query: {
                studentExamRoll: id,
            },
            provider: undefined,
        })
        .then((res) => (res.total === 1 ? res.data[0] : null));

    if (!studentExamData) {
        throw new BadRequest('Exam roll no. not found.');
    }

    if (studentExamData.status !== 6) {
        throw new BadRequest('Exam result is not published yet. Please wait for the date to be published.');
    }

    context.result = studentExamData;

    return context;
};

export default GetStudentExamResult;
