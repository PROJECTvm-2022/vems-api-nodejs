// Initializes the `v1/exam-audience` service on path `/v1/exam-audience`
import { ExamAudience } from './exam-audience.class';
import hooks from './exam-audience.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/exam-audience', new ExamAudience(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/exam-audience');

    service.hooks(hooks);
}
