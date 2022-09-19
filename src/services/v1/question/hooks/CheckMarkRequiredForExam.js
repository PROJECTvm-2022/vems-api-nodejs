import { BadRequest } from '@feathersjs/errors';

const CheckMarkRequiredForExam = () => async (context) => {
    const { data } = context;

    if (Array.isArray(data)) {
        for (const each of data) {
            if (each.entityType === 'exam') {
                if (!each.mark) throw new BadRequest('Mark is required.');
            }
        }
    } else {
        if (data.entityType === 'exam') {
            if (!data.mark) throw new BadRequest('Mark is required.');
        }
    }
};

export default CheckMarkRequiredForExam;
