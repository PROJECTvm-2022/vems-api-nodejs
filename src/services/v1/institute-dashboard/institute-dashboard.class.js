
/* eslint-disable no-unused-vars */
export const InstituteDashboard = class InstituteDashboard {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async find(params) {
        return [];
        // const {
        //     query: { institute },
        // } = params;
        // const instituteBatchService = this.app.service('v1/institute-batch');
        // const instituteCourseService = this.app.service('v1/institute-course');
        // const liveClassService = this.app.service('v1/live-class');
        //
        // const instituteBatches = await instituteBatchService._find({
        //     query: {
        //         institute,
        //         status: { $ne: 0 },
        //     },
        //     paginate: false,
        // });
        //
        // const batches = instituteBatches.map((each) => each._id);
        // const totalBatches = batches.length;
        // let totalStudents = 0;
        // instituteBatches.forEach((each) => {
        //     totalStudents += each.acquiredSeatCount;
        // });
        // // console.log(totalStudents);
        // // const totalStudents = instituteBatches.reduce((a, each) => a + each.acquiredSeatCount);
        //
        // const totalCourses = await instituteCourseService
        //     ._find({
        //         query: {
        //             institute,
        //             status: { $ne: 0 },
        //             $limit: 0,
        //         },
        //     })
        //     .then((res) => res.total);
        //
        // const teacherSlots = await this.app
        //     .service('v1/timetable')
        //     ._find({
        //         query: {
        //             instituteBatch: {
        //                 $in: batches,
        //             },
        //             status: 2,
        //         },
        //     })
        //     .then((res) => res.map((each) => each.teacherSlot));
        //
        // const aggregateQuery = [];
        //
        // aggregateQuery.push(
        //     {
        //         $sort: {
        //             scheduledAt: -1,
        //         },
        //     },
        //     {
        //         $match: {
        //             status: 4,
        //             teacherSlot: {
        //                 $in: teacherSlots,
        //             },
        //         },
        //     },
        //     {
        //         $lookup: {
        //             from: 'users',
        //             localField: 'teacher',
        //             foreignField: '_id',
        //             as: 'teacher',
        //         },
        //     },
        //     {
        //         $unwind: '$teacher',
        //     },
        //     {
        //         $lookup: {
        //             from: 'courses',
        //             localField: 'course',
        //             foreignField: '_id',
        //             as: 'course',
        //         },
        //     },
        //     {
        //         $unwind: '$course',
        //     },
        //     {
        //         $lookup: {
        //             from: 'subjects',
        //             localField: 'subject',
        //             foreignField: '_id',
        //             as: 'subject',
        //         },
        //     },
        //     {
        //         $unwind: '$subject',
        //     },
        //     {
        //         $lookup: {
        //             from: 'attendances',
        //             let: { liveClassId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: { $eq: ['$liveClass', '$$liveClassId'] },
        //                         instituteBatch: {
        //                             $in: batches,
        //                         },
        //                     },
        //                 },
        //             ],
        //             as: 'totalAttendances',
        //         },
        //     },
        // );
        //
        // let classes = await liveClassService.Model.aggregate(aggregateQuery);
        // // console.log(classes.length);
        //
        // classes = classes.map((each) => {
        //     const { totalAttendances } = each;
        //     return {
        //         ...each,
        //         totalAttendances: totalAttendances ? totalAttendances.filter((each) => each.status === 1).length : 0,
        //     };
        // });
        //
        // return {
        //     totalStudents,
        //     totalBatches,
        //     totalCourses,
        //     totalClasses: classes.length,
        //     recentClasses: classes,
        //     batchStats: instituteBatches.map((each) => {
        //         return {
        //             name: each.name,
        //             totalSeats: each.totalSeatCount,
        //             acquiredSeats: each.acquiredSeatCount,
        //         };
        //     }),
        // };
    }
};

