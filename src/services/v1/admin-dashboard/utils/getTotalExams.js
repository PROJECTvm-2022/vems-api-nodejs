/**
 * Created By Soumya(soumya@smarttersstudio.com) on 5/27/2022 at 12:54 PM.
 */

/**
 * @description return total exams.
 * @param app
 * @param institute
 * @returns {Promise<number>}
 */
const getTotalExams = async (app, institute = null) => {
    const examService = app.service('v1/exam');

    return await examService
        ._find({
            query: {
                status: { $in: [2, 3, 4] },
                institute: institute ? institute : { $ne: null },
                $limit: 0,
            },
        })
        .then((res) => res.total);
};

export default getTotalExams;
