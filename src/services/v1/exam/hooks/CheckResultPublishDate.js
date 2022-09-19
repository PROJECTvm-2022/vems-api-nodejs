/**
 * Created by Soumya(soumya.smartters@gmail.com) on 7/7/2022 at 7:35 PM.
 */
import { BadRequest } from '@feathersjs/errors';

const CheckResultPublishDate = () => async (context) => {
    const { data } = context;

    const { resultPublishDate } = data;

    if (resultPublishDate) {
        if (new Date(resultPublishDate).getTime() < new Date().getTime()) {
            throw new BadRequest('Please give a valid publish date for the exam result');
        }
    }
};

export default CheckResultPublishDate;
