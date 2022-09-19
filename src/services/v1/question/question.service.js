// Initializes the `v1/question` service on path `/v1/question`
import { Question } from './question.class';
import createModel from '../../../models/question.model';
import hooks from './question.hooks';
import OnQuestionCreatedDeleted from './events/OnQuestionCreatedDeleted';

export default function (app) {
    const Model = createModel(app);

    const options = {
        Model,
        multi: true,
    };

    // Initialize our service with any options it requires
    app.use('/v1/question', new Question(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/question');

    service.hooks(hooks);

    service.on('created', OnQuestionCreatedDeleted);
    service.on('removed', OnQuestionCreatedDeleted);
}
