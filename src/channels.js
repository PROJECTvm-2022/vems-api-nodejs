import CheckForStudentExam from './utils/CheckForStudentExam';

export default function (app) {
    if (typeof app.channel !== 'function') {
        // If no real-time functionality has been configured just return
        return;
    }

    app.on('connection', (connection) => {
        // On a new real-time connection, add it to the anonymous channel
        app.channel('anonymous').join(connection);
    });

    app.on('login', async (authResult, { connection }) => {
        if (connection) {
            // console.log('Socket Connected....');
            app.channel('anonymous').leave(connection);

            app.channel('authenticated').join(connection);
            // return await CheckForStudentExam(connection, app, 'login');
        }
    });

    app.on('disconnect', async (connection) => {
        // console.log('Socket Disconnected....');
        await CheckForStudentExam(connection, app);
        app.channel('authenticated').leave(connection);
        app.channel('anonymous').join(connection);
        // console.log(connection);
    });

    /**
     * Student Exam Patched
     */

    app.service('v1/student-exam').publish('patched', async (result, context) => {
        const { student } = result;
        const { data } = context;
        // console.log(result);
        try {
            const channel = app.channel('authenticated').filter((connection) => {
                const {
                    user: { _id: userId },
                } = connection;

                if (student.toString() === userId.toString()) {
                    if (result.status === 3) {
                        app.service('v1/student-exam')._patch(result._id, {
                            attendanceStatus: 2,
                        });
                        // if (result.attendanceStatus === 2) {
                        //     app.service('v1/student-exam')._patch(result._id, {
                        //         attendanceStatus: 2,
                        //     });
                        // } else if (result.attendanceStatus === 3) {
                        //     app.service('v1/student-exam')._patch(result._id, {
                        //         attendanceStatus: 2,
                        //     });
                        // }
                        // console.log('socket', result.attendanceStatus);
                        // console.log('Connected time', new Date());
                        result.attendanceStatus = 2;
                    } else if (result.status === 4) {
                        // console.log('attendance status', result.attendanceStatus);
                        app.service('v1/student-exam')._patch(result._id, {
                            attendanceStatus: 3,
                        });
                        // console.log(result.status);
                        result.attendanceStatus = 3;
                    }
                }

                return student.toString() === connection.user._id.toString();
            });
            // console.log(channel);
            // console.log(`Student exam create event published to ${channel.length} users`);
            return channel;
        } catch (e) {
            // console.log('error');
            console.log(e);
        }
        console.log('Null found');
        return null;
    });

    // eslint-disable-next-line no-unused-vars

    // app.publish((data, hook) => {
    //     // Here you can add event publishers to channels set up in `channels.js`
    //     // To publish only for a specific event use `app.publish(eventname, () => {})`
    //
    //     console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line
    //
    //     // e.g. to publish all service events to all authenticated users use
    //     return app.channel('authenticated');
    // });

    // Here you can also add service specific event publishers
    // e.g. the publish the `users` service `created` event to the `admins` channel
    // app.service('users').publish('created', () => app.channel('admins'));

    // With the userid and email organization from above you can easily select involved users
    // app.service('messages').publish(() => {
    //   return [
    //     app.channel(`userIds/${data.createdBy}`),
    //     app.channel(`emails/${data.recipientEmail}`)
    //   ];
    // });
}
