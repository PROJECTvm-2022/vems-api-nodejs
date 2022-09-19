// Initializes the `v1/authenticate-email` service on path `/v1/authenticate-email`
import { AuthenticateEmail } from './authenticate-email.class';
import hooks from './authenticate-email.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/authenticate-email', new AuthenticateEmail(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate-email');

    service.hooks(hooks);
}
