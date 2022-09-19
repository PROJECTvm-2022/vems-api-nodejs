/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 6:18 PM.
 * @description things to be managed after institute is deleted.
 * @param result
 * @param context
 * @returns {Promise<void>}
 * @constructor
 */

const OnInstituteDeleted = async (result, context) => {
    const { app, params } = context;

    const { _id: institute, user } = result;

    await app.service('v1/user')._patch(user, {
        institute: null,
    });

    const instituteCourseService = app.service('v1/institute-course');

    const instituteCourses = await instituteCourseService
        ._find({
            query: {
                institute,
                status: { $ne: 0 },
            },
            paginate: false,
        })
        .then((res) => res.map((each) => each._id));

    for (const each of instituteCourses) {
        await instituteCourseService.remove(each._id, { user: params.user });
    }
};

export default OnInstituteDeleted;
