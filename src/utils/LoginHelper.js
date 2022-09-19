/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 8/10/2020 at 10:59 PM
 */
import { makeCallingParams } from 'feathers-hooks-common';
import moment from 'moment';

export default {
    /**
     * Check if any user account is present with provided emailId
     * @param email
     * @param app
     * @param role
     * @returns {Promise<T>}
     */
    async checkUserAccount(email, app, role) {
        return await app
            .service('v1/user')
            ._find({
                query: {
                    email: email,
                    role,
                    status: { $ne: 0 },
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));
    },

    async checkUserAccountPhone(phone, app) {
        return await app
            .service('v1/user')
            ._find({
                query: {
                    phone: phone,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));
    },
    /**
     * Sign up a user
     * @param userObj
     * @param app
     * @returns {Promise<userObj>}
     */
    async createUserAccount(userObj, app) {
        return app.service('users').create(userObj);
    },

    /**
     * Generate AccessToken for the user
     * @param user
     * @param app
     * @returns {Promise<{accessToken: *, user: *}>}
     */
    async generateToken(user, app) {
        const accessToken = await app.service('authentication').createAccessToken({ sub: user._id });

        return { accessToken, user };
    },

    /**
     * Patch coordinates if the user exists
     * @param user
     * @param coordinates
     * @param app
     * @returns {Promise<{accessToken: *, user: *}>}
     */
    async patchUserCoordinates(user, coordinates, app) {
        user = await app.service('v1/user')._patch(
            user._id,
            {
                coordinates: coordinates,
            },
            {},
        );
        return await this.generateToken(user, app);
    },

    /**
     * Check if the social media type exists for corresponding user
     * @param user
     * @param app
     * @param data
     * @param token
     * @returns {Promise<void>}
     */
    async checkSocialMedia(user, app, data, token) {
        const { socialMediaType } = data;
        const socialMediaAccount = await app
            .service('v1/social-user')
            ._find({
                query: {
                    user: user._id,
                    type: socialMediaType,
                    active: true,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (!socialMediaAccount) {
            return await this.createSocialMedia(user, data, token, app);
        } else {
            return await app.service('v1/social-user')._patch(
                socialMediaAccount._id,
                {
                    token,
                },
                {},
            );
        }
    },

    /**
     * Check existance of social media token
     * @param appId
     * @param app
     * @param socialMediaType
     * @returns {Promise<null|any>}
     */
    async checkSocialMediaId(appId, app, socialMediaType) {
        const socialMedia = await app
            .service('v1/social-user')
            ._find({
                query: {
                    token: appId,
                    type: socialMediaType,
                    active: true,
                    $populate: 'user',
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (!socialMedia) {
            return null;
        } else {
            return socialMedia.user;
        }
    },

    /**
     * Create one social media type for corresponding user
     * @param user
     * @param data
     * @param token
     * @param app
     * @param socialUser
     * @returns {Promise<void>}
     */
    async createSocialMedia(user, data, token, app, socialUser = '') {
        const { socialMediaType } = data;
        return await app.service('v1/social-user').create(
            {
                type: socialMediaType,
                token,
                socialUser,
            },
            makeCallingParams(
                {},
                {},
                {},
                {
                    provider: undefined,
                    user: user,
                },
            ),
        );
    },

    /**
     * Check if the corresponding user-login exists
     * @param user
     * @param deviceId
     * @param app
     * @returns {Promise<void>}
     */
    async checkUserLogin(user, app) {
        const userLogin = await app
            .service('user-session')
            ._find({
                query: {
                    user: user._id,
                    sessionType: 1,
                },
            })
            .then((res) => (res.total === 1 ? res.data[0] : null));

        if (userLogin) {
            return await app.service('user-session').remove(userLogin._id);
        } else {
            return null;
        }
    },

    /**
     * Create an entry for corresponding user-login
     * @param result
     * @param data
     * @param app
     * @returns {Promise<void>}
     */
    async createUserLogin(result, app) {
        const { user, accessToken } = result;

        return await app.service('user-session').create(
            {
                sessionType: 1,
                user: user._id,
                accessToken,
            },
            makeCallingParams(
                {},
                {},
                {},
                {
                    provider: undefined,
                    user: user,
                },
            ),
        );
    },

    /**
     *
     * @param dateOfBirth
     * @returns {{verified: boolean}|{verified: boolean, message: string}}
     */

    checkDOB(dateOfBirth) {
        const years = moment().diff(moment(dateOfBirth, 'YYYY-MM-DD'), 'years');

        if (years > 13) {
            return {
                verified: true,
            };
        } else {
            return {
                verified: false,
                message: "You can't sign up as you are below 13 years",
            };
        }
    },
};
