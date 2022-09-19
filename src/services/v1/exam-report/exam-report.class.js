/* eslint-disable no-unused-vars */
export const ExamReport = class ExamReport {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async find(params) {
        const { query } = params;
        const { scheduledExam } = query;

        const scheduleExamService = this.app.service('v1/exam');
        const examData = await scheduleExamService
            ._get(scheduledExam, {
                query: {
                    entityType: 'exam',
                    status: 4,
                },
            })
            .catch(() => null);

        if (!examData)
            return {
                averageScore: 0,
                averagePercentage: 0,
                gradeReports: [],
            };

        const {
            _id: exam,
            mark: { total, grades },
        } = examData;

        const studentExams = await this.app.service('v1/student-exam')._find({
            query: {
                exam,
                $populate: ['student', 'answers.question'],
                attendanceStatus: 3,
            },
            paginate: false,
        });

        let averageScore;
        let totalScore = 0;
        let totalPercentage = 0;
        let averagePercentage;
        let questions = [];

        studentExams.forEach((each) => {
            const { mark } = each;
            if (mark) {
                totalScore += mark;
                totalPercentage += parseInt(((mark / total) * 100).toFixed(0));
            }
        });

        const noOfStudents = studentExams.filter(
            (each) => typeof each.mark !== 'undefined' && each.attendanceStatus === 3,
        ).length;
        averageScore = parseInt((totalScore / noOfStudents).toFixed(0));
        averagePercentage = parseInt((totalPercentage / noOfStudents).toFixed(0));

        const gradeReports = grades.map((each) => {
            const { name } = each;
            const students = studentExams.filter((each) => each.grade && each.grade !== '' && each.grade === name)
                .length;
            const percentage = parseInt(((students / noOfStudents) * 100).toFixed(0));
            return {
                grade: name,
                students,
                percentage: !percentage ? 0 : percentage,
            };
        });

        if (studentExams.length) questions = studentExams[0].answers.map((each) => each.question);

        const studentAnswers = studentExams.map((each) => each.answers);
        // console.log(studentAnswers);

        const questionStats = questions.map((each) => {
            const { question: name, _id: question } = each;
            const correctAnswers = studentAnswers.filter(
                (each) => each.findIndex((q) => q.question._id.toString() === question.toString() && q.isCorrect) >= 0,
            ).length;
            const wrongAnswers = studentAnswers.length - correctAnswers;
            return {
                question: name,
                correctAnswers: parseInt(((correctAnswers / studentAnswers.length) * 100).toFixed(0)),
                wrongAnswers: parseInt(((wrongAnswers / studentAnswers.length) * 100).toFixed(0)),
            };
        });

        return {
            averageScore: !averageScore ? 0 : averageScore,
            averagePercentage: !averagePercentage ? 0 : averagePercentage,
            gradeReports,
            students: studentExams,
            questionStats,
        };
    }
};
