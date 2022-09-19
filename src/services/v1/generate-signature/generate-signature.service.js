// Initializes the `v1/generate-signature` service on path `/v1/generate-signature`
import { GenerateSignature } from './generate-signature.class';
import hooks from './generate-signature.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/generate-signature', new GenerateSignature(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/generate-signature');

    service.hooks(hooks);
}
