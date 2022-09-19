/**
 * Created By Soumya(soumyaranjansahoo338@gmail.com) on 2/17/2021 at 9:50 PM
 */

const OnInstituteCreated = async (result, context) => {
    const { app } = context;

    const { _id: institute, user } = result;

    await app.service('v1/user')._patch(user, {
        institute,
    });
};

export default OnInstituteCreated;
