// Initializes the `v1/institute-dashboard-exam` service on path `/v1/institute-dashboard-exam`
import { InstituteDashboardExam } from './institute-dashboard-exam.class';
import hooks from './institute-dashboard-exam.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/institute-dashboard-exam', new InstituteDashboardExam(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/institute-dashboard-exam');

    service.hooks(hooks);
}
