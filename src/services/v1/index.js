import user from './user/user.service.js';

import institute from './institute/institute.service';

import question from './question/question.service';

import generateSignature from './generate-signature/generate-signature.service';

import exam from './exam/exam.service';
import studentExam from './student-exam/student-exam.service';
import studentExamAnswer from './student-exam-answer/student-exam-answer.service';
import examReport from './exam-report/exam-report.service';
import examAudience from './exam-audience/exam-audience.service';
import studentExamResult from './student-exam-result/student-exam-result.service';

import instituteDashboard from './institute-dashboard/institute-dashboard.service';
import adminDashboard from './admin-dashboard/admin-dashboard.service';
import adminDashboardExam from './admin-dashboard-exam/admin-dashboard-exam.service';
import instituteDashboardExam from './institute-dashboard-exam/institute-dashboard-exam.service';

import notification from './notification/notification.service';

import googleLogin from './google-login/google-login.service';
import authenticateEmail from './authenticate-email/authenticate-email.service';

import upload from './upload/upload.service';

import custom from './custom/custom.service';

// eslint-disable-next-line no-unused-vars
export default function (app) {
    app.configure(user);
    app.configure(institute);

    app.configure(question);

    app.configure(generateSignature);

    app.configure(exam);
    app.configure(studentExam);
    app.configure(studentExamAnswer);
    app.configure(examReport);
    app.configure(examAudience);
    app.configure(studentExamResult);

    app.configure(instituteDashboard);
    app.configure(adminDashboard);
    app.configure(adminDashboardExam);
    app.configure(instituteDashboardExam);

    app.configure(notification);

    app.configure(googleLogin);
    app.configure(authenticateEmail);

    app.configure(upload);

    app.configure(custom);
}
