/**
 * Created By Soumya(soumya@smarttersstudio.com) on 5/27/2022 at 12:54 PM.
 */

/**
 * @description return total institutions.
 * @param app
 * @returns {Promise<number>}
 */
const getTotalInstitutions = async (app) => {
    const examService = app.service('v1/institute');

    return await examService
        ._find({
            query: {
                status: { $ne: 0 },
                $limit: 0,
            },
        })
        .then((res) => res.total);
};

export default getTotalInstitutions;
