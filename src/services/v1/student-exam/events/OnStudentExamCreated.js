/**
 * Created By Soumya(soumya@smarttersstudio.com) on 4/16/2022 at 7:38 AM.
 */
import moment from 'moment';

/**
 * @description send email notifications of exam to students.
 * @param result
 * @param context
 * @returns {Promise<void>}
 * @constructor
 */
const OnStudentExamCreated = async (result, context) => {
    const { app } = context;

    const { student, studentName, exam, _id: studentExamId } = result;

    const studentEmail = await app
        .service('v1/user')
        ._get(student)
        .then((res) => res.email);

    const studentExamService = app.service('v1/student-exam');
    let studentExamRoll = null,
        rollExists = true;

    while (rollExists) {
        studentExamRoll = `VMEMS${Date.now()}`;
        rollExists = await studentExamService
            ._find({
                query: {
                    studentExamRoll,
                },
            })
            .then((res) => !!res.total);
    }

    if (studentExamRoll) {
        await studentExamService._patch(studentExamId, {
            studentExamRoll,
        });
    }

    if (studentEmail) {
        const { scheduledOn, endTime, duration, institute, title } = await app.service('v1/exam')._get(exam, {
            query: {
                $populate: 'institute',
            },
        });

        const startingTime = moment(scheduledOn).utcOffset('+05:30').format('dddd, MMMM Do YYYY, [at] h:mm a');
        const endingTime = moment(endTime).utcOffset('+05:30').format('dddd, MMMM Do YYYY, [at] h:mm a');

        const subject = `Exam Notification`;

        // Exam notification mail.
        const message =
            `Hi ${studentName},` +
            '\n\n' +
            `Your ${title} at ${institute.name} has been scheduled on ${startingTime}.` +
            '\n\n' +
            `Start Time: ${startingTime}` +
            '\n' +
            `End Time: ${endingTime}` +
            '\n' +
            `Duration of the exam: ${duration} minutes` +
            '\n' +
            `Roll no.: ${studentExamRoll}` +
            '\n\n' +
            `Login to our system using our VM - EMS app (https://play.google.com/store/apps/details?id=com.vernacularmedium.ems&hl=en) using your Mail ID specified.` +
            `Try to complete the exam between the given time interval. The exam can be appeared only once.` +
            `So while attempting the exam make sure you have a stable and active internet connection.` +
            '\n\n' +
            'All The Best!!!' +
            '\n\n' +
            'Regards,' +
            '\n' +
            'VM - EMS Team';

        /**
         * @type {Utils}
         */
        const utils = app.get('utils');
        await utils.sendMail(studentEmail, subject, message);
    }
};

export default OnStudentExamCreated;
