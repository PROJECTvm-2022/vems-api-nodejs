import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';
// import CheckForUserSession from './hooks/CheckForUserSession';
// import FRequired from './hooks/FRequired';
// import CheckForStudentSeat from './hooks/CheckForStudentSeat';
// import HasData from './utils/HasData';
// import CheckForAuthentication from './hooks/CheckForAuthentication';
// import { iff } from 'feathers-hooks-common';
// import CheckIfEmailExists from './hooks/CheckIfEmailExists';

export default (app) => {
    const authentication = new AuthenticationService(app);

    authentication.register('jwt', new JWTStrategy());
    authentication.register('local', new LocalStrategy());

    app.use('/authentication', authentication);
    app.configure(expressOauth());

    const service = app.service('authentication');

    service.hooks({
        before: {
            create: [
                // iff(HasData('strategy', 'jwt'), CheckForAuthentication()),
                // iff(HasData('strategy', 'local'), CheckIfEmailExists(), FRequired(['fcmId'])),
            ],
        },
        after: {
            create: [
                // CheckForUserSession(), CheckForStudentSeat()
            ],
        },
    });
};
