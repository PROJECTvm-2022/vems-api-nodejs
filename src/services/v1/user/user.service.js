// Initializes the `user` service on path `/user`
import { User } from './user.class';

import createModel from '../../../models/user.model';
import hooks from './user.hooks';
import OnInstituteSuperUserDeleted from './events/OnInstituteSuperUserDeleted';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$regex', '$options'],
        multi: true,
    };

    // Initialize our service with any options it requires
    app.use('/v1/user', new User(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/user');

    service.hooks(hooks);

    service.on('removed', OnInstituteSuperUserDeleted);
}
