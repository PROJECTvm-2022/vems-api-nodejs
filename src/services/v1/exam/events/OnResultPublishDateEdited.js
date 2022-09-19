/**
 * Created by Soumya(soumya.smartters@gmail.com) on 6/25/2022 at 11:19 AM.
 */

const OnResultPublishDateEdited = async (result, context) => {
    const { data, app } = context;

    const { resultPublishDate } = data;

    if (resultPublishDate && result.status !== 6) {
        await app.service('v1/student-exam').patch(
            null,
            {
                resultPublishDate,
            },
            {
                query: {
                    exam: result._id,
                },
                provider: undefined,
            },
        );

        // console.log(res)
    }
};

export default OnResultPublishDateEdited;
