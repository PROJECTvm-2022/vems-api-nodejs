import { BadRequest } from '@feathersjs/errors';

const setCourseAndSubjectFromSyllabus = () => async (context) => {
    const { data, app } = context;

    if (!data.syllabus) return context;

    const service = app.service('v1/syllabus');

    const result = await service._get(data.syllabus, {
        query: {
            status: {
                $ne: 0,
            },
        },
    });

    if (!result) throw new BadRequest('Invalid value of syllabus');

    context.data.subject = result.subject;
    context.data.course = result.course;

    return context;
};

export default setCourseAndSubjectFromSyllabus;
