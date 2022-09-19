// Initializes the `v1/admin-dashboard` service on path `/v1/admin-dashboard`
import { AdminDashboard } from './admin-dashboard.class';
import hooks from './admin-dashboard.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/admin-dashboard', new AdminDashboard(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/admin-dashboard');

    service.hooks(hooks);
}
