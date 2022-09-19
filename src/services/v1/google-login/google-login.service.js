// Initializes the `v1/google-login` service on path `/v1/google-login`
import { GoogleLogin } from './google-login.class';
import hooks from './google-login.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/google-login', new GoogleLogin(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/google-login');

    service.hooks(hooks);
}
