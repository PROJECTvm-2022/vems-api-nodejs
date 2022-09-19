/**
 * Created by Guru (guru@smarttersstudio.com) on 14/01/2021 at 01:04 PM
 * @description validate email to send otp
 */
import { BadRequest } from '@feathersjs/errors';

const CheckLogInOTP = () => async (context) => {
    const { app, data, params } = context;
    const {
        query: { $populate = '' },
    } = params;
    let { otp: dataOTP, email } = data;

    if (email.toString().startsWith('VMEMS')) {
        const userData = await app
            .service('v1/student-exam')
            ._find({
                query: {
                    studentExamRoll: email,
                    $limit: 1,
                    status: { $in: [2, 3] },
                    $populate: 'student',
                },
            })
            .then((res) => (res.total ? res.data[0] : null));

        email = userData.student.email;
    }

    const RedisClient = app.get('RedisClient');

    /**
     * @type {Utils}
     */
    const utils = app.get('utils');

    // console.log(email);
    const storedData = await RedisClient.getAsync(`otp:${email}`);

    // console.log(storedData);
    const { otp, expireOn } = storedData ? JSON.parse(storedData) : {};

    // console.log(storedData);
    // console.log(utils.isOTPExpired(expireOn));
    // console.log(typeof otp, typeof dataOTP);
    //console.log(otp, otp.toString() === dataOTP.toString(), expireOn, utils.isOTPExpired(expireOn));
    if (otp && otp.toString() === dataOTP.toString() && expireOn && utils.isOTPExpired(expireOn)) {
        let query = {
            $populate,
            status: { $ne: 0 },
        };

        if (email) {
            query.email = email;
        }

        const userData = await app
            .service('v1/user')
            ._find({
                query,
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        const accessToken = await app.service('authentication').createAccessToken({
            sub: userData._id,
        });
        context.result = {
            accessToken,
            user: userData,
        };

        utils.removeOTPFromRedis(email);
    } else {
        // utils.removeOTPFromRedis(phone);
        throw new BadRequest('OTP is Invalid');
    }

    return context;
};

export default CheckLogInOTP;
