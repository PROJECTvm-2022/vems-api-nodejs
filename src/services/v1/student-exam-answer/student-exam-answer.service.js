// Initializes the `v1/student-exam-answer` service on path `/v1/student-exam-answer`
import { StudentExamAnswer } from './student-exam-answer.class';
import hooks from './student-exam-answer.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/student-exam-answer', new StudentExamAnswer(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/student-exam-answer');

    service.hooks(hooks);
}
