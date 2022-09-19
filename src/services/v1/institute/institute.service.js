// Initializes the `v1/institute` service on path `/v1/institute`
import { Institute } from './institute.class';
import createModel from '../../../models/institute.model';
import hooks from './institute.hooks';
import OnInstituteCreated from './events/OnInstituteCreated';
import OnInstituteDeleted from './events/OnInstituteDeleted';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$regex', '$options'],
    };

    // Initialize our service with any options it requires
    app.use('/v1/institute', new Institute(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/institute');

    service.hooks(hooks);

    service.on('created', OnInstituteCreated);
    // service.on('removed', OnInstituteDeleted);
}
