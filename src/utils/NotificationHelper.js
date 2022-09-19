/**
 * Created By Soumya (soumyaranjansahoo338@gmail.com) on 9/13/2020 at 8:57 PM
 */
import moment from 'moment';

export default {
    async sendLiveClassNotification(app, result, params, reminderType) {
        let { subject, scheduledAt, _id: liveClass } = result;

        const { user } = params;

        const RedisClient = app.get('RedisClient');

        const storedData = await RedisClient.getAsync(`liveClass:${liveClass.toString()}`);

        // console.log(storedData);
        let response = storedData ? JSON.parse(storedData) : null;

        let students = [];

        if (!response) {
            students = await app
                .service('v1/students-live-class')
                .find({
                    query: {
                        liveClass,
                    },
                })
                .then((res) => res.map((each) => each._id))
                // eslint-disable-next-line no-unused-vars
                .catch((e) => {
                    // console.log(e);
                });
            // console.log(students);
            RedisClient.set(`liveClass:${liveClass.toString()}`, JSON.stringify({ students }));
        } else {
            students = response.students;
        }

        // console.log(students);
        const subjectName = await app
            .service('v1/subject')
            ._get(subject)
            .then((res) => res.name);
        let text = '';
        let action = '';

        scheduledAt = moment(scheduledAt).format('dddd, MMMM Do YYYY, [at] h:mm a');

        switch (reminderType) {
            case 1:
                text = `Your class is scheduled on ${scheduledAt} for ${subjectName}`;
                action = 'liveClassSchedule';
                break;
            case 2:
                text = `Your class for ${subjectName} is going to start in 1 hour.`;
                action = 'liveClassSchedule';
                break;
            case 3:
                text = `Your class for ${subjectName} is going to start in 5 minutes.`;
                action = 'liveClassSchedule';
                break;
            case 4:
                text = `Your class for ${subjectName} scheduled on ${scheduledAt} is cancelled.`;
                action = 'liveClassTerminate';
                break;
            case 5:
                text = `Your class for ${subjectName} is ended.`;
                action = 'liveClassEnded';
                break;
        }

        const notificationData = students.map((each) => {
            return {
                notifiedUser: each,
                entityType: 'liveClass',
                entityId: liveClass,
                text,
                action,
            };
        });

        // console.log(notificationData);

        await app.service('v1/notification').create(notificationData, {
            user,
        });
    },

    async sendNewVideoNotification(app, videoData, studentVideos) {
        const {
            title,
            subject: { name: subjectName },
            unit: { name: unitName },
            chapter: { name: chapterName },
        } = videoData;

        const action = 'videoAdded';

        const text = `A New video for chapter ${chapterName} in Unit ${unitName} of ${subjectName} is added - ${title}`;

        const notificationData = studentVideos.map((each) => {
            return {
                notifiedUser: each.student,
                entityType: 'studentVideo',
                entityId: each._id,
                text,
                action,
            };
        });

        // console.log(notificationData);

        await app.service('v1/notification').create(notificationData);
    },

    async sendStudentExamNotification(app, result, reminderType) {
        const { title, scheduledOn, _id: exam } = result;

        // console.log(scheduledOn);
        const studentsOfExam = await app.service('v1/student-exam')._find({
            query: {
                exam,
                $select: ['student'],
            },
            paginate: false,
        });

        const examTime = moment(scheduledOn).format('dddd, MMMM Do YYYY');

        // console.log(moment(scheduledOn).local(false).format('dddd, MMMM Do YYYY, [at] h:mm a'));
        // console.log(moment(scheduledOn).utc(true).format('dddd, MMMM Do YYYY, [at] h:mm a'));

        let text = '',
            action = '';

        switch (reminderType) {
            case 1:
                text = `Your ${title} exam is scheduled on ${examTime}.`;
                action = 'examSchedule';
                break;
            case 2:
                text = `Your ${title} exam is going to start in 1 hour.`;
                action = 'examSchedule';
                break;
            case 3:
                text = `Your ${title} exam is going to start in 5 minutes.`;
                action = 'examSchedule';
                break;
            case 4:
                text = `Your ${title} exam on ${examTime} is cancelled.`;
                action = 'examTerminate';
                break;
        }

        const notificationData = studentsOfExam.map((each) => {
            return {
                text,
                action,
                notifiedUser: each.student,
                entityType: 'studentExam',
                entityId: each._id,
            };
        });

        await app.service('v1/notification').create(notificationData);
    },

    async sendStudentAssignmentCreatedNotification(app, result, reminderType) {
        const { title, scheduledOn, _id: assignment } = result;

        let status = 2;

        if (reminderType === 4) status = 0;
        // console.log(scheduledOn);
        const assignments = await app.service('v1/student-assignment')._find({
            query: {
                assignment,
                $select: ['student'],
                status,
            },
            paginate: false,
        });

        const time = moment(scheduledOn).format('dddd, MMMM Do YYYY');

        // console.log(moment(scheduledOn).local(false).format('dddd, MMMM Do YYYY, [at] h:mm a'));
        // console.log(moment(scheduledOn).utc(true).format('dddd, MMMM Do YYYY, [at] h:mm a'));

        let text = '',
            action = '';

        switch (reminderType) {
            case 1:
                text = `New Assignment "${title}" is scheduled on ${time}.`;
                action = 'assignmentSchedule';
                break;
            case 2:
                text = `Assignment "${title}" is going to end in 1 hour.Make sure to submit your Answers.`;
                action = 'assignmentSchedule';
                break;
            case 3:
                text = `Assignment "${title}" is going to end in 5 minutes.Make sure to submit your Answers.`;
                action = 'assignmentSchedule';
                break;
            case 4:
                text = `Assignment "${title}" on ${time} is cancelled.`;
                action = 'assignmentTerminate';
                break;
        }

        const notificationData = assignments.map((each) => {
            return {
                text,
                action,
                notifiedUser: each.student,
                entityType: 'studentAssignment',
                entityId: each._id,
            };
        });

        await app.service('v1/notification').create(notificationData);
    },
};
