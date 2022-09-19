// Initializes the `v1/exam-report` service on path `/v1/exam-report`
import { ExamReport } from './exam-report.class';
import hooks from './exam-report.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/exam-report', new ExamReport(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/exam-report');

    service.hooks(hooks);
}
