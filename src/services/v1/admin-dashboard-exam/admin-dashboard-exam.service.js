// Initializes the `v1/admin-dashboard-exam` service on path `/v1/admin-dashboard-exam`
import { AdminDashboardExam } from './admin-dashboard-exam.class';
import hooks from './admin-dashboard-exam.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/admin-dashboard-exam', new AdminDashboardExam(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/admin-dashboard-exam');

    service.hooks(hooks);
}
