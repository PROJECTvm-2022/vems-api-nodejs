/**
 * Created By Soumya(soumya@smarttersstudio.com) on 5/27/2022 at 12:54 PM.
 */

/**
 * @description return total questions presented in exams.
 * @param app
 * @param institute
 * @returns {Promise<number>}
 */
const getTotalQuestionsForExam = async (app, institute = null) => {
    const examService = app.service('v1/exam');

    const aggregateQuery = [
        {
            $match: {
                status: 1,
                institute: institute ? institute : { $ne: null },
            },
        },
        {
            $group: {
                _id: null,
                totalQuestions: {
                    $sum: '$questionCount',
                },
            },
        },
    ];

    const response = await examService.Model.aggregate(aggregateQuery);

    if (response.length > 0) return response[0].totalQuestions;
    else return 0;
};

export default getTotalQuestionsForExam;
