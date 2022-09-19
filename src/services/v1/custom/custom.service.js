// Initializes the `v1/custom` service on path `/v1/custom`
import { Custom } from './custom.class';
import hooks from './custom.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/custom', new Custom(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/custom');

    service.hooks(hooks);
}
