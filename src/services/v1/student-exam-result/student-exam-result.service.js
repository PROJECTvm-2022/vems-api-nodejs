// Initializes the `v1/student-exam-result` service on path `/v1/student-exam-result`
import { StudentExamResult } from './student-exam-result.class';
import hooks from './student-exam-result.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/student-exam-result', new StudentExamResult(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/student-exam-result');

    service.hooks(hooks);
}
