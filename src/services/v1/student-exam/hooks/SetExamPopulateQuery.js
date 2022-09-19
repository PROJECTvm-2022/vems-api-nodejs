/**
 * Created By Soumya(soumya@smarttersstudio.com) on 15/04/21 at 9:35 AM.
 */

const SetExamPopulateQuery = () => async (context) => {
    const { params } = context;

    const { query } = params;

    query.$populate = [
        {
            path: 'answers.question',
            model: 'question',
        },
        {
            path: 'student',
            model: 'user',
        },
        {
            path: 'exam',
            model: 'exam',
        },
    ];
};

export default SetExamPopulateQuery;
