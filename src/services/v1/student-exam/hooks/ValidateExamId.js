/**
 * Created By Soumya(soumya@smarttersstudio.com) on 4/15/2022 at 2:22 PM.
 */
import { BadRequest } from '@feathersjs/errors';

const ValidateExamId = () => async (context) => {
    const { data, app } = context;

    const { exam, institute } = data;

    const examData = await app
        .service('v1/exam')
        ._get(exam, {
            query: {
                institute,
                status: 2,
            },
        })
        .catch(() => {
            throw new BadRequest('Invalid exam id given.');
        });

    const { entityId } = examData;

    data.examData = examData;

    data.answers = await app
        .service('v1/question')
        ._find({
            query: {
                entityId,
                status: {
                    $ne: 0,
                },
            },
        })
        .then((res) => {
            return res.map((each) => ({
                question: each._id,
            }));
        });
};

export default ValidateExamId;
