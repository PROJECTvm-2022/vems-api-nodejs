/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 8/11/2020 at 2:43 AM
 */
import moment from 'moment';
import Axios from 'axios';
import nodeMailer from 'nodemailer';

export class Utils {
    /**
     *
     * @param app {feathersExpress.Application}
     */
    constructor(app) {
        this._config = {
            otp: app.get('otp'),
            sms: app.get('sms'),
        };

        this._app = app;

        this._transporter = nodeMailer.createTransport(this.app.get('mail'));
    }

    /**
     *
     * @returns {feathersExpress.Application}
     */
    get app() {
        return this._app;
    }

    /**
     *
     * @returns {{sms: any, otp: any}}
     */
    get config() {
        return this._config;
    }

    get otpMax() {
        return new Array(this.config.otp.length - 1).fill(10).reduce((a, b) => a * b);
    }

    /**
     *
     * @returns {number}
     */
    get newOtp() {
        const max = this.otpMax;
        return Math.floor(max + Math.random() * (9 * max));
    }

    /**
     *
     * @returns {number}
     */
    get newOTPExpireOn() {
        return Date.now() + 60 * this.config.otp.expireOn * 1000;
    }

    /**
     *
     * @param time {Date}
     * @returns {boolean}
     */
    isOTPExpired(time) {
        return moment().isSameOrBefore(moment(time));
    }

    /**
     *
     * @param phoneOrEmail
     * @param otp {Number}
     * @param expireOn {Number}
     * @returns {*}
     */
    setNewOTPtoRedis(phoneOrEmail, otp = this.newOtp, expireOn = this.newOTPExpireOn) {
        const RedisClient = this.app.get('RedisClient');
        return RedisClient.set(`otp:${phoneOrEmail}`, JSON.stringify({ otp, expireOn }));
    }
    /**
     *
     * @returns {void | boolean | request.Request | Objection.QueryBuilderYieldingCount<Objection.Model, any> | Knex.QueryBuilder<any, DeferredKeySelection<any, never>[]> | Knex.QueryBuilder<any, DeferredIndex.Augment<UnwrapArrayMember<any[]>, any, TKey>[]> | Knex.QueryBuilder<any, DeferredKeySelection.Augment<UnwrapArrayMember<any[]>, any, TKey>[][]> | Knex.QueryBuilder<any, SafePartial<any>[]> | Knex.QueryBuilder<any, number>}
     * @param phone
     */
    removeOTPFromRedis(phone) {
        const RedisClient = this.app.get('RedisClient');
        return RedisClient.del('otp:' + phone);
    }

    /**
     *
     * @param accessToken
     * @returns {void | boolean | request.Request | Objection.QueryBuilderYieldingCount<Objection.Model, any> | Knex.QueryBuilder<any, DeferredKeySelection<any, never>[]> | Knex.QueryBuilder<any, DeferredIndex.Augment<UnwrapArrayMember<any[]>, any, TKey>[]> | Knex.QueryBuilder<any, DeferredKeySelection.Augment<UnwrapArrayMember<any[]>, any, TKey>[][]> | Knex.QueryBuilder<any, SafePartial<any>[]> | Knex.QueryBuilder<any, number>}
     */
    removeAccessTokenFromRedis(accessToken) {
        const RedisClient = this.app.get('RedisClient');
        return RedisClient.del('token:' + accessToken);
    }

    /**
     *
     * @param phoneOrEmail
     * @param otp {Number}
     * @returns {Promise<T>}
     */
    async verifyOtp(phoneOrEmail, otp) {
        return new Promise((resolve) => {
            const RedisClient = this.app.get('RedisClient');

            return RedisClient.getAsync('otp:' + phoneOrEmail)
                .then((result) => {
                    const data = JSON.parse(result);

                    if (data) {
                        if (Number(otp) === data.otp) {
                            if (!moment().isSameOrBefore(moment(data.expireOn))) {
                                this.removeOTPFromRedis(phoneOrEmail);
                                resolve({ status: false, message: 'OTP has expired!' });
                            } else {
                                resolve({ status: true });
                            }
                        } else {
                            resolve({ status: false, message: 'OTP is invalid!' });
                        }
                    } else {
                        resolve({ status: false, message: 'OTP is invalid!' });
                    }
                })
                .catch(() => {
                    resolve({ status: false, message: 'OTP is invalid!' });
                });
        });
    }

    /**
     *
     * @param accessToken
     * @param userId
     * @returns {Promise<unknown>}
     */
    async verifyAccessToken(accessToken, userId) {
        return new Promise((resolve) => {
            const RedisClient = this.app.get('RedisClient');

            return RedisClient.getAsync('token:' + accessToken)
                .then((result) => {
                    const data = JSON.parse(result);

                    if (data) {
                        if (userId.toString() === data.user.toString()) {
                            resolve({ status: true });
                        } else {
                            resolve({ status: false, message: 'Invalid Access Token!' });
                        }
                    } else {
                        resolve({ status: false, message: 'Invalid Access Token!' });
                    }
                })
                .catch(() => {
                    resolve({ status: false, message: 'Invalid Access Token!' });
                });
        });
    }

    /**
     *
     * @param message {String}
     * @param toUsers {String[]|String}
     * @returns {Promise<AxiosResponse<T>>}
     */
    sendSMS(message, toUsers) {
        const sms = this.config.sms;
        let to = [];
        if (Array.isArray(toUsers)) {
            to = toUsers;
        } else {
            to.push(toUsers);
        }
        // console.log(sms);
        return Axios.post(
            sms.url,
            {
                sender: sms.sender,
                route: '4',
                country: '91',
                sms: [{ message, to }],
            },
            {
                headers: {
                    authkey: sms.authkey,
                    'content-type': 'application/json',
                },
            },
        ); //.catch(console.error);
    }

    /**
     *
     * @param emails {String[]|String}
     * @param subject {String}
     * @param message {String}
     * @param html
     * @param from {String}
     * @returns {Promise<unknown>|Promise<unknown>[]}
     */
    async sendMail(emails, subject, message, html = '', from = '"VM - EMS" <no-reply@ems.vernacularmedium.com>') {
        // console.log(emails);
        if (Array.isArray(emails)) {
            return emails.map((each) => this.sendMail(each, subject, message, from));
        } else {
            return new Promise((resolve, reject) => {
                // console.log(this._transporter);
                this._transporter.sendMail(
                    {
                        from, // sender address
                        to: emails, // list of receivers
                        subject: subject, // Subject line
                        text: message, //
                    },
                    (error, info) => {
                        // console.error(error);
                        if (error) return reject(error);
                        // console.log(info);
                        return resolve(info);
                    },
                );
            });
        }
    }
}

function utils(app) {
    app.set('utils', new Utils(app));
}

export default utils;
