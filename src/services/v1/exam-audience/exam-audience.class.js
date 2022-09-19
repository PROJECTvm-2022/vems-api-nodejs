/* eslint-disable no-unused-vars */
export const ExamAudience = class ExamAudience {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async find(params) {
        const { query } = params;
        const { scheduledExam } = query;

        const scheduleExamService = this.app.service('v1/exam');
        const studentExamService = this.app.service('v1/student-exam');
        const examData = await scheduleExamService
            ._get(scheduledExam, {
                query: {
                    entityType: 'exam',
                    status: 4,
                },
            })
            .catch(() => null);

        if (!examData)
            return {
                totalAttendee: 0,
                averageScore: 0,
                averagePercentage: 0,
            };

        const {
            _id: exam,
            mark: { total },
        } = examData;

        return await studentExamService.Model.aggregate([
            {
                $match: {
                    attendanceStatus: 3,
                    exam,
                    status: 4,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'student',
                    foreignField: '_id',
                    as: 'student',
                },
            },
            {
                $unwind: '$student',
            },
            {
                $project: {
                    _id: 1,
                    mark: 1,
                    student: 1,
                    percent: { $multiply: [{ $divide: ['$mark', total] }, 100] },
                },
            },
            {
                $group: {
                    _id: '$institute',
                    students: {
                        $push: '$$ROOT',
                    },
                    totalAttendee: { $sum: 1 },
                    averageMark: { $avg: { $sum: '$mark' } },
                    averagePercent: { $avg: { $sum: '$percent' } },
                },
            },
        ]);
    }
};
