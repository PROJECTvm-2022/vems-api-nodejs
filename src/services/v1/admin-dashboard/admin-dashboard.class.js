/* eslint-disable no-unused-vars */
import { TEACHER } from '../../../constants/Roles';

export const AdminDashboard = class AdminDashboard {
    constructor(options, app) {
        this.options = options || {};
        this.app = app;
    }

    async find(params) {
        return [];
        // const instituteBatchService = this.app.service('v1/institute-batch');
        // const instituteService = this.app.service('v1/institute');
        // const transactionService = this.app.service('v1/transaction');
        // const userService = this.app.service('v1/user');
        // const liveClassService = this.app.service('v1/live-class');
        //
        // const instituteBatches = await instituteBatchService._find({
        //     query: {
        //         status: { $ne: 0 },
        //         $populate: 'institute',
        //     },
        //     paginate: false,
        // });
        //
        // /**
        //  * Calculate students, batches, institutes
        //  */
        // const batches = instituteBatches.map((each) => each._id);
        // const totalBatches = batches.length;
        // const totalInstitutes = await instituteService
        //     ._find({
        //         query: {
        //             status: 1,
        //             $limit: 0,
        //         },
        //     })
        //     .then((res) => res.total);
        // let totalStudents = 0;
        // instituteBatches.forEach((each) => {
        //     totalStudents += each.acquiredSeatCount;
        // });
        // // console.log(totalStudents);
        // // const totalStudents = instituteBatches.reduce((a, each) => a + each.acquiredSeatCount);
        //
        // /**
        //  * Calculate total teachers
        //  * @type {number}
        //  */
        // const totalTeachers = await userService
        //     ._find({
        //         query: {
        //             role: TEACHER,
        //             status: { $ne: 0 },
        //             $limit: 0,
        //         },
        //     })
        //     .then((res) => res.total);
        //
        // /**
        //  * Get transactions
        //  */
        // const transactions = await transactionService._find({
        //     query: {
        //         $populate: 'institute',
        //         $sort: {
        //             updatedAt: -1,
        //         },
        //     },
        //     paginate: false,
        // });
        //
        // /**
        //  * Get Live classes
        //  * @type {*[]}
        //  */
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
        //         totalStudentsOfClass: totalAttendances ? totalAttendances.length : 0,
        //         totalAttendances: totalAttendances ? totalAttendances.filter((each) => each.status === 1).length : 0,
        //     };
        // });
        //
        // return {
        //     totalFranchise: totalInstitutes,
        //     totalTeachers,
        //     totalStudents,
        //     totalBatches,
        //     totalClassesCompleted: classes.length,
        //     recentClasses: classes,
        //     batchStats: instituteBatches.map((each) => {
        //         return {
        //             name: each.name,
        //             totalSeats: each.totalSeatCount,
        //             acquiredSeats: each.acquiredSeatCount,
        //             institute: each.institute.name,
        //         };
        //     }),
        //     recentTransactions: transactions,
        // };
    }
};
