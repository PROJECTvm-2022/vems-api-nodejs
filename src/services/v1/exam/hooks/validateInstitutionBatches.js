import { BadRequest } from '@feathersjs/errors';

const validateInstitutionBatches = () => async (context) => {
    const { data, app } = context;

    const { instituteBatches: batches } = data;

    if (!Array.isArray(batches) || batches.length === 0) throw new BadRequest('Invalid Batches');

    const instituteBatches = batches.map((instituteBatch) => ({
        instituteBatch,
    }));
    const service = app.service('v1/institute-batch');

    for (let i = 0; i < instituteBatches.length; i++) {
        const { instituteBatch } = instituteBatches[i];
        const result = await service
            ._get(instituteBatch, {
                query: {
                    status: 1,
                },
            })
            .catch(() => {
                throw new BadRequest('Invalid Batches');
            });

        const { institute } = result;
        instituteBatches[i].institute = institute;
    }

    data.instituteBatches = instituteBatches;

    // console.log(instituteBatches);

    return context;
};

export default validateInstitutionBatches;
