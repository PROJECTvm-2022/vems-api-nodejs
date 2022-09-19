// Initializes the `v1/student-exam` service on path `/v1/student-exam`
import { StudentExam } from './student-exam.class';

import createModel from '../../../models/student-exam.model';
import hooks from './student-exam.hooks';
import OnStudentExamEnded from './events/OnStudentExamEnded';
import OnStudentExamCreated from './events/OnStudentExamCreated';
import OnStudentExamResultPublished from './events/OnStudentExamResultPublished';
import OnStudentExamResultPublishedDateAdded from './events/OnStudentExamResultPublishedDateAdded';

export default function (app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        multi: true,
    };

    // Initialize our service with any options it requires
    app.use('/v1/student-exam', new StudentExam(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/student-exam');

    service.hooks(hooks);

    service.on('created', OnStudentExamCreated);

    service.on('patched', OnStudentExamEnded);
    service.on('patched', OnStudentExamResultPublished);
    service.on('patched', OnStudentExamResultPublishedDateAdded);
}
