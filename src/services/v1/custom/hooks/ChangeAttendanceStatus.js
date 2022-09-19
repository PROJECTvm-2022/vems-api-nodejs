/**
 * Created By Soumya(soumya@smarttersstudio.com) on 5/27/2022 at 6:22 PM.
 */

const ChangeAttendanceStatus = () => async (context) => {
    const { app } = context;

    const service = app.service('v1/student-exam');

    const students = await service._find({
        query: {},
        paginate: false,
    });

    for (const each of students) {
        await service._patch(each._id, {
            studentExamRoll: `VMEMS${Date.now()}`,
        });
    }

    context.result = {
        students: students.length,
    };
};

export default ChangeAttendanceStatus;
