/**
 * Created by Soumya(soumya.smartters@gmail.com) on 7/8/2022 at 3:34 PM.
 */
import { BadRequest } from '@feathersjs/errors';

const CheckQuestionLimitReached = () => async (context) => {
    const { data, params } = context;

    const { examData } = params;

    const { questionCount, questionRequiredCount = 0 } = examData;

    const questionsTobeAdded = Array.isArray(data) ? data.length : 1;

    if (questionCount + questionsTobeAdded > questionRequiredCount) {
        throw new BadRequest('Already required no. of questions are added.');
    }
};

export default CheckQuestionLimitReached;
