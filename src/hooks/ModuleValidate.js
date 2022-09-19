import { BadRequest } from '@feathersjs/errors';

const ModuleValidateData = (serviceName, key, query = { status: { $ne: 0 } }) => async (context) => {
    const { data, app, path } = context;

    const service = app.service(`v1/${serviceName}`);

    if (path === 'v1/timetable' && (key === 'syllabus' || key === 'instituteBatch')) {
        query = {};
    }

    if (Array.isArray(data)) {
        for (const each of data) {
            const id = each[key];

            if (!id) continue;

            const result = await service._get(id, { query }).catch(() => null);

            if (!result) throw new BadRequest(`Invalid value of ${key}`);

            /**
             * @description to store the details of the field
             * @type {*}
             */
            each[`${key}Data`] = result;
        }
    } else {
        const id = data[key];

        if (!id) return context;

        const result = await service._get(id, { query }).catch(() => null);

        if (!result) throw new BadRequest(`Invalid value of ${key}`);

        /**
         * @description to store the details of the field
         * @type {*}
         */
        data[`${key}Data`] = result;
    }

    return context;
};

ModuleValidateData.isUser = (key = 'user', query) => ModuleValidateData('user', key, query);
ModuleValidateData.isCourse = (key = 'course', query) => ModuleValidateData('courses', key, query);
ModuleValidateData.isInstitute = (key = 'institute', query) => ModuleValidateData('institutes', key, query);
ModuleValidateData.isSemester = (key = 'semester', query) => ModuleValidateData('semesters', key, query);
ModuleValidateData.isSpecialization = (key = 'specialization', query) =>
    ModuleValidateData('specialization', key, query);
ModuleValidateData.isSubject = (key = 'subject', query) => ModuleValidateData('subjects', key, query);
ModuleValidateData.isSyllabus = (key = 'syllabus', query) => ModuleValidateData('syllabuses', key, query);
ModuleValidateData.isUnit = (key = 'unit', query) => ModuleValidateData('units', key, query);
ModuleValidateData.isTopic = (key = 'topic', query) => ModuleValidateData('topics', key, query);
ModuleValidateData.isChapter = (key = 'chapter', query) => ModuleValidateData('chapters', key, query);
ModuleValidateData.isState = (key = 'state', query) => ModuleValidateData('state', key, query);
ModuleValidateData.isVideoLecture = (key = 'entityId', query) => ModuleValidateData('video-lecture', key, query);
ModuleValidateData.isComment = (key = 'entityId', query) => ModuleValidateData('comment', key, query);
ModuleValidateData.isLiveClass = (key = 'liveClass', query) => ModuleValidateData('live-class', key, query);
ModuleValidateData.isQuestion = (key = 'question', query) => ModuleValidateData('questions', key, query);
ModuleValidateData.isBatch = (key = 'batch', query) => ModuleValidateData('batch', key, query);
ModuleValidateData.isTimetable = (key = 'timetable', query) => ModuleValidateData('timetable', key, query);
ModuleValidateData.isClassAttendance = (key = 'classAttendance', query) =>
    ModuleValidateData('class-attendance', key, query);

export default ModuleValidateData;
