/**
 * Created By Soumya(soumya@smarttersstudio.com) on 5/27/2022 at 1:09 PM.
 */
import getTotalInstitutions from '../utils/getTotalInstitutions';
import getTotalExams from '../utils/getTotalExams';
import getTotalStudentsAppearedForExam from '../utils/getTotalStudentsAppearedForExam';
import getTotalQuestionsForExam from '../utils/getTotalQuestionsForExam';

const GetStatistics = () => async (context) => {
    const { app } = context;

    const totalInstitutions = await getTotalInstitutions(app);
    const totalExams = await getTotalExams(app);
    const totalStudentsAppeared = await getTotalStudentsAppearedForExam(app);
    const totalQuestions = await getTotalQuestionsForExam(app);

    context.result = {
        totalInstitutions,
        totalExams,
        totalStudentsAppeared,
        totalQuestions,
    };

    return context;
};

export default GetStatistics;
