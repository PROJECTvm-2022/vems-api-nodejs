/**
 * Created by Soumya(soumya.smartters@gmail.com) on 6/25/2022 at 11:23 AM.
 */

const CheckIfNotResultPublishDate = () => async (context) => {
    const { result } = context;

    const checkResultDate = (each) => {
        const { status } = each;
        if (status !== 6) {
            if (each.grade) {
                delete each.grade;
            }
            if (each.mark) {
                delete each.mark;
            }

            return each;
        } else {
            return each;
        }
    };

    if (Array.isArray(result)) {
        for (let each of result) {
            each = checkResultDate(each);
        }
    } else if (typeof result.total !== 'undefined') {
        for (let each of result.data) {
            each = checkResultDate(each);
        }
    } else {
        // console.log(result);
        context.result = checkResultDate(result);
    }

    // console.log(context.result);
};

export default CheckIfNotResultPublishDate;
