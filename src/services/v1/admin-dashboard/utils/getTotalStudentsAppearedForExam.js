/**
 * Created By Soumya(soumya@smarttersstudio.com) on 5/27/2022 at 12:54 PM.
 */

/**
 * @description return total students appeared for exam.
 * @param app
 * @param institute
 * @returns {Promise<number>}
 */
const getTotalStudentsAppearedForExam = async (app, institute = null) => {
    const studentExamService = app.service('v1/student-exam');

    return await studentExamService
        ._find({
            query: {
                status: { $in: [2, 3, 4] },
                attendanceStatus: { $in: [2, 3] },
                institute: institute ? institute : { $ne: null },
                $limit: 0,
            },
        })
        .then((res) => res.total);
};

export default getTotalStudentsAppearedForExam;
