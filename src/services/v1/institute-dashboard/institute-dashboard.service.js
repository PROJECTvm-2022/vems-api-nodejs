// Initializes the `v1/institute-dashboard` service on path `/v1/institute-dashboard`
import { InstituteDashboard } from './institute-dashboard.class';
import hooks from './institute-dashboard.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/institute-dashboard', new InstituteDashboard(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/institute-dashboard');

    service.hooks(hooks);
}
