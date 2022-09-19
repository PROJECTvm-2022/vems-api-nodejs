/**
 * Created By Soumya(soumya@smarttersstudio.com) on 11/04/21 at 1:09 AM.
 */
const OnStudentExamEnded = async (result, context) => {
    const { app } = context;
    let {
        answers,
        _id: examId,
        exam: { mark },
        status,
        attendanceStatus,
    } = result;
    // console.log(result);

    if (status === 4 && attendanceStatus === 3) {
        // console.log(result);
        const examService = app.service('v1/student-exam');

        if (!mark) {
            mark = await app
                .service('v1/exam')
                ._get(result.exam)
                .then((res) => res.mark);
        }

        let { grades, total: examTotalMark } = mark;

        // let totalMark = answers.reduce((a, each) => a + (each.isCorrect ? each.question.mark : 0));
        let totalMark = 0;
        answers.forEach((each) => {
            const {
                question: { mark, negativeMark },
                isCorrect,
            } = each;
            if (isCorrect) {
                totalMark += mark;
            } else if (typeof isCorrect !== 'undefined') {
                totalMark -= negativeMark;
            }
        });

        // console.log(totalMark);
        const data = {
            mark: totalMark,
        };
        const percentage = parseFloat(((totalMark / examTotalMark) * 100).toFixed(2));
        if (grades.length) {
            grades = grades.sort((i, j) => j.mark - i.mark);
            let index = grades.findIndex((each) => percentage >= parseFloat(each.mark));
            data.grade = index >= 0 ? grades[index].name : 'No Grade';
        }
        // console.log(data);
        await examService._patch(examId, data);
        // console.log(r);
    }
};

export default OnStudentExamEnded;
