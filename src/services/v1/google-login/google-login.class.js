/* eslint-disable no-unused-vars */
import axios from 'axios';
import LoginHelper from '../../../utils/LoginHelper';

export const GoogleLogin = class GoogleLogin {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async create(data, params) {
        const { accessToken, role = 1 } = data;

        // data.type = 2;

        const profileUrl = this.app.get('google_oauth_url');

        let result = {};

        try {
            const {
                data: { id: googleId, given_name: firstName, family_name: surName, email, picture: avatar },
            } = await axios.get(profileUrl, {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });

            if (!googleId)
                return {
                    result: false,
                    code: 401,
                };

            let user = await LoginHelper.checkUserAccount(email, this.app, role);
            // console.log(user);

            if (!user) {
                return {
                    result: false,
                    code: 400,
                    message: "You can't login as you're not registered yet.",
                };
            } else {
                if (user.status === 2) {
                    return {
                        result: false,
                        code: 400,
                        message: "You can't login as you're blocked by admin.",
                    };
                }

                result = await LoginHelper.generateToken(user, this.app);
            }
            return result;
        } catch (e) {
            return {
                result: false,
                code: 400,
                message: e.toString(),
            };
        }
    }
};
