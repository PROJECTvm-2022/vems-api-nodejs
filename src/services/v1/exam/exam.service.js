// Initializes the `v1/exam` service on path `/v1/exam`
import { Exam } from './exam.class';

import createModel from '../../../models/exam.model';
import hooks from './exam.hooks';
import OnScheduledExamCreated from './events/OnScheduledExamCreated';
import OnScheduledExamCancelled from './events/OnScheduledExamCancelled';
import OnResultPublishDateEdited from './events/OnResultPublishDateEdited';
import PublishExamResultToStudents from './events/PublishExamResultToStudents';
import OnScheduledExamEnded from './events/OnScheduledExamEnded';

export default function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$regex', '$options'],
    };

    // Initialize our service with any options it requires
    app.use('/v1/exam', new Exam(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/exam');

    service.on('created', OnScheduledExamCreated);
    service.on('patched', OnScheduledExamCancelled);
    service.on('removed', OnScheduledExamCancelled);

    service.on('patched', OnResultPublishDateEdited);
    service.on('patched', PublishExamResultToStudents);

    service.on('patched', OnScheduledExamEnded);

    service.hooks(hooks);
}
