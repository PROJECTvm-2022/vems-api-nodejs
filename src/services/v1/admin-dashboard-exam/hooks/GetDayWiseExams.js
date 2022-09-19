/**
 * Created By Soumya(soumya@smarttersstudio.com) on 5/27/2022 at 1:31 PM.
 */
import moment from 'moment';

const GetDayWiseExams = () => async (context) => {
    const { app, params } = context;

    const examService = app.service('v1/exam');

    const { query } = params;
    const { from: startDate, to, institute } = query;

    let fromDate = new Date(startDate);
    const toDate = new Date(to);

    const match = {
        status: { $in: [2, 3, 4] },
        scheduledOn: {
            $gte: fromDate,
            $lte: toDate,
        },
        institute: institute ? institute : { $ne: null },
    };

    const exams = await examService.Model.aggregate([
        {
            $match: match,
        },
    ]);

    // console.log(exams.length);
    const examData = [];

    // console.log(fromDate);
    // console.log(toDate);

    // console.log(fromDate < toDate);
    while (fromDate < toDate) {
        let day = new Date(fromDate);
        // console.log(day);
        fromDate = new Date(moment(fromDate).add(1, 'day').toDate());
        // console.log(fromDate);
        let totalExams = 0;
        exams.map((each) => {
            if (each.scheduledOn >= day && each.scheduledOn < fromDate) {
                totalExams++;
            }
        });
        examData.push({
            day,
            totalExams,
        });
    }

    context.result = examData;
};

export default GetDayWiseExams;
