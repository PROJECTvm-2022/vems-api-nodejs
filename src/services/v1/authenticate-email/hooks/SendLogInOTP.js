/**
 * Created by Guru (guru@smarttersstudio.com) on 14/01/2021 at 01:04 PM
 * @description validate email to send otp
 */

const SendLogInOTP = () => {
    return async (context) => {
        const { data, app } = context;
        const { userData } = data;

        /**
         * @type {Utils}
         */
        const utils = app.get('utils');

        const otpConfig = app.get('otp');

        let otp = 123456;
        if (!otpConfig.viewLog) otp = utils.newOtp;

        const { email } = userData;

        utils.setNewOTPtoRedis(email, otp, utils.newOTPExpireOn);

        if (otpConfig.viewLog) context.data.otp = otp;

        const subject = 'OTP Verification';

        const studentName = userData.name ? userData.name : email.toString().substring(0, email.indexOf('@'));

        const message =
            `Hi ${studentName},` +
            '\n\n' +
            `Your OTP for login is ${otp}.` +
            `Please use it in VM - EMS app (https://play.google.com/store/apps/details?id=com.vernacularmedium.ems&hl=en) to verify your credentials and to proceed for the Examination.` +
            '\n\n' +
            'Regards,' +
            '\n' +
            `VM - EMS Team`;

        if (email) {
            await utils.sendMail(email, subject, message);
        }

        return context;
    };
};

export default SendLogInOTP;
