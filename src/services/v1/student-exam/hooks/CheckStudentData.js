/**
 * Created By Soumya(soumya@smarttersstudio.com) on 4/15/2022 at 2:48 PM.
 */
import { BadRequest } from '@feathersjs/errors';

const CheckStudentData = () => async (context) => {
    const { data, app } = context;

    const { exam, answers, institute, students, examData } = data;

    if (!Array.isArray(students)) throw new BadRequest('Student data must be given as list.');

    let studentEmails = students.map((e) => e.email).filter((each, i, self) => self.indexOf(each) === i);

    const studentService = app.service('v1/user');

    let registeredStudents = await studentService._find({
        query: {
            email: {
                $in: studentEmails,
            },
            status: { $ne: 0 },
            $select: ['email'],
        },
        paginate: false,
    });

    let registeredEmails = registeredStudents.map((e) => e.email);
    // console.log('Registered Students------------');
    let emailsNotRegistered = studentEmails
        .filter((e) => !registeredEmails.includes(e))
        .map((each) => {
            return {
                email: each,
            };
        });

    // console.log('Not Registered Students------------', emailsNotRegistered);
    let newRegisteredStudents = [];
    if (emailsNotRegistered.length) {
        newRegisteredStudents = await studentService._create(emailsNotRegistered, {
            query: {
                $limit: emailsNotRegistered.length,
            },
        });
    }

    const allStudents = registeredStudents.concat(newRegisteredStudents);

    const { resultPublishDate } = examData;

    // console.log(allStudents);
    context.data = allStudents.map((e) => {
        let studentId = e._id;
        let studentEmail = e.email;
        let index = students.findIndex((s) => s.email === studentEmail);
        let studentName = students[index].name;

        return {
            exam,
            institute,
            answers,
            student: studentId,
            studentName,
            resultPublishDate,
        };
    });

    context.params.query = {
        $limit: allStudents.length,
    };

    return context;
};

export default CheckStudentData;
