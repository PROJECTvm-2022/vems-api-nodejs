/* eslint-disable no-unused-vars */
import { BadRequest } from '@feathersjs/errors';

export const StudentExamAnswer = class StudentExamAnswer {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async patch(id, data, params) {
        const {
            user: { _id: student },
        } = params;
        const studentExamId = id;
        const { question, answer } = data;

        const studentExamService = this.app.service('v1/student-exam');

        const studentExamData = await studentExamService
            ._get(studentExamId, {
                query: {
                    student,
                    status: 3,
                    attendanceStatus: 2,
                    $populate: 'answers.question',
                },
            })
            .catch(() => {
                throw new BadRequest('Invalid exam given.');
            });

        let { answers } = studentExamData;

        const index = answers.findIndex((each) => each.question._id.toString() === question.toString());

        if (index === -1) throw new BadRequest('Invalid question given.');

        const { question: examQuestion } = answers[index];

        let {
            answer: { answerOfQuestion },
        } = examQuestion;

        if (!Array.isArray(answerOfQuestion)) answerOfQuestion = [answerOfQuestion];
        answers[index].answer = answer;
        answers[index].isCorrect = !!answerOfQuestion.includes(answer.trim());

        const success = await studentExamService
            ._patch(studentExamId, {
                answers,
            })
            .then(() => true)
            .catch((e) => false);

        return {
            result: !!success,
        };
    }
};
