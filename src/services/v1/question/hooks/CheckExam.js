import { BadRequest } from '@feathersjs/errors';

const CheckExam = () => async (context) => {
    const { data, app, params } = context;

    let examData;

    const validateExam = async (id) => {
        examData = await app
            .service('v1/exam')
            ._get(id, {
                query: {
                    status: 1,
                },
            })
            .catch(() => {
                throw new BadRequest('Invalid Exam Id given.');
            });
    };

    if (Array.isArray(data)) {
        if (!data.length) {
            throw new BadRequest('Please provide questions.');
        }
        if (data.every((e) => e.entityType === 'exam')) {
            await validateExam(data[0].entityId);
        }
    } else {
        if (data.entityType === 'exam') {
            await validateExam(data.entityId);
        }
    }

    params.examData = examData;
};

export default CheckExam;
