/**
 * Created By Soumya(soumya@smarttersstudio.com) on 5/27/2022 at 1:14 PM.
 */
import getTotalExams from '../../admin-dashboard/utils/getTotalExams';
import getTotalStudentsAppearedForExam from '../../admin-dashboard/utils/getTotalStudentsAppearedForExam';
import getTotalQuestionsForExam from '../../admin-dashboard/utils/getTotalQuestionsForExam';

const GetInstituteStatistics = () => async (context) => {
    const { app, params } = context;

    const { query } = params;

    const institute = query.institute;

    const instituteData = await app.service('v1/institute')._get(institute);

    const { createdAt: joinedAt } = instituteData;

    const totalExams = await getTotalExams(app, institute);
    const totalStudentsAppeared = await getTotalStudentsAppearedForExam(app, institute);
    const totalQuestions = await getTotalQuestionsForExam(app, institute);

    context.result = {
        joinedAt,
        totalExams,
        totalStudentsAppeared,
        totalQuestions,
    };

    return context;
};

export default GetInstituteStatistics;
