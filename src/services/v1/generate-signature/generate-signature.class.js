/* eslint-disable no-unused-vars */
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const GenerateSignature = class GenerateSignature {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async create(data, params) {
        const { liveClassData } = data;

        const { teacher, meetingId: liveClassMeeting } = liveClassData;

        const meetingId = parseInt(liveClassMeeting);

        const { zoomApiKey, zoomApiSecret, zoomAppKey, zoomAppSecret } = await this.app.service('v1/user')._get(teacher);

        const {
            user: { role },
        } = params;

        let userRole;

        // console.log(role);

        if (role === 8) userRole = 1;
        else userRole = 0;

        // const zoomConfig = this.app.get('zoom');
        // const apiKey = zoomConfig.api_key;
        // console.log(apiKey);
        // const apiSecret = zoomConfig.api_secret;
        // console.log(apiSecret);

        const apiKey = zoomApiKey;
        const apiSecret = zoomApiSecret;
        const timestamp = new Date().getTime() - 30000;

        let payload = {
            appKey: zoomAppKey,
            iat: moment().valueOf(),
            exp: moment().add(24, 'hours').valueOf(),
            tokenExp: moment().add(24, 'hours').valueOf(),
        };

        let jwtToken = jwt.sign(payload, apiSecret);
        // console.log(timestamp);

        const msg = Buffer.from(`${apiKey}${meetingId}${timestamp}${userRole}`).toString('base64');
        const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');
        const signature = Buffer.from(`${apiKey}.${meetingId}.${timestamp}.${userRole}.${hash}`).toString('base64');

        // console.log(signature);
        // console.log(apiKey);
        // console.log(apiSecret);

        return {
            signature,
            apiKey,
            apiSecret,
            jwtToken,
            appKey: zoomAppKey,
            appSecret: zoomAppSecret,
        };
    }
};
