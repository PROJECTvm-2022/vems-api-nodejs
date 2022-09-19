/**
 * Created By Soumya(soumya@smarttersstudio.com) on 4/16/2022 at 7:38 AM.
 */
import moment from 'moment';

/**
 * @description send email notifications of exam to students of result published.
 * @param result
 * @param context
 * @returns {Promise<void>}
 * @constructor
 */
const OnStudentExamResultPublishedDateAdded = async (result, context) => {
    const { app } = context;

    const { student, studentName, exam, status, _id: studentExamId, resultPublishDate, studentExamRoll } = result;

    if (resultPublishDate && status === 4) {
        const studentEmail = await app
            .service('v1/user')
            ._get(student)
            .then((res) => res.email);

        if (studentEmail) {
            const { scheduledOn, endTime, duration, institute, title } = await app.service('v1/exam')._get(exam, {
                query: {
                    $populate: 'institute',
                },
            });

            // const startingTime = moment(scheduledOn).utcOffset('+05:30').format('dddd, MMMM Do YYYY, [at] h:mm a');
            // const endingTime = moment(endTime).utcOffset('+05:30').format('dddd, MMMM Do YYYY, [at] h:mm a');
            const resultPublishTime = moment(resultPublishDate)
                .utcOffset('+05:30')
                .format('dddd, MMMM Do YYYY, [at] h:mm a');

            const subject = `Result Notification`;

            // Result notification mail.
            const message =
                `Hi ${studentName},` +
                '\n\n' +
                `Your ${title} Result at ${institute.name} has been schedule to publish on ${resultPublishTime}.` +
                '\n\n' +
                // `Start Time: ${startingTime}` +
                // '\n' +
                // `End Time: ${endingTime}` +
                // '\n' +
                // `Duration of the exam: ${duration} minutes` +
                `Roll no.: ${!studentExamRoll ? studentExamId : studentExamRoll}` +
                '\n\n' +
                `Visit our website (https://ems.vernacularmedium.com) result section to know about your Test Results. Use your Registered Mail ID and other Credentials to view your Results. ` +
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
    }
};

export default OnStudentExamResultPublishedDateAdded;
