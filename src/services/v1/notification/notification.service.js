// Initializes the `v1/notification` service on path `/v1/notification`
import { Notification } from './notification.class';
import createModel from '../../../models/notification.model';
import hooks from './notification.hooks';
import OnNotificationCreated from './events/OnNotificationCreated';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        multi: true,
    };

    // Initialize our service with any options it requires
    app.use('/v1/notification', new Notification(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/notification');

    service.hooks(hooks);

    service.on('created', OnNotificationCreated);
}
