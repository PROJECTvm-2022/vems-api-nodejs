import { BadRequest } from '@feathersjs/errors';

const validateExam = () => async (context) => {
    const { data, app } = context;

    const { entityId, scheduledOn, endTime, duration, institute } = data;

    if (!entityId) return context;

    const service = app.service('v1/exam');

    // console.log(new Date(scheduledOn));
    // console.log(new Date());
    // if (new Date(scheduledOn).getTime() - Date.now() < 60000) throw new BadRequest('Invalid schedule given.');
    //
    // if (new Date(endTime).getTime() < new Date(scheduledOn).getTime())
    //     throw new BadRequest('Ending time of exam must be greater than scheduled time.');
    //
    // if (new Date(endTime).getTime() - new Date(scheduledOn).getTime() < duration * 60 * 1000)
    //     throw new BadRequest('The exam time interval must be greater than the exam duration.');

    const result = await service._get(entityId, {
        query: {
            status: {
                $ne: 0,
            },
            institute,
        },
    });

    if (!result) throw new BadRequest('Invalid exam');

    const { title, description, mark, questionCount, questionRequiredCount = 0 } = result;

    if (questionCount === 0) {
        throw new BadRequest('Please add some questions to schedule the exam');
    }

    if (questionCount !== questionRequiredCount) {
        throw new BadRequest(
            `Please add ${questionRequiredCount - questionCount} more questions to schedule the exam.`,
        );
    }

    data.title = title;
    data.description = description;
    data.mark = mark;
    data.questionCount = questionCount;
    data.entityIdData = result;

    return context;
};

export default validateExam;
