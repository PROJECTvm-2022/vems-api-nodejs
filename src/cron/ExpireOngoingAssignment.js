/**
 * Created by Soumya (soumya@smarttersstudio.com) on 28/05/21 at 9:43 PM.
 * @description end all the ongoing exams as per scheduled time.
 */
import { CronJob } from 'cron';

const ExpireOngoingAssignment = async (app) => {
    const job = new CronJob('0 */1 * * * *', async function () {
        const assignmentService = app.service('v1/assignment');
        const studentAssignmentService = app.service('v1/student-assignment');

        const now = new Date();

        const assignments = await assignmentService._find({
            query: {
                entityType: 'assignment',
                status: 4,
            },
            paginate: false,
        });

        for (const each of assignments) {
            const { _id: assignment, deadline } = each;

            if (now >= deadline) {
                await app.service('v1/exam').patch(assignment, {
                    status: 4,
                });

                await studentAssignmentService._patch(
                    null,
                    {
                        status: 5,
                    },
                    {
                        query: {
                            assignment,
                            status: 2,
                        },
                    },
                );
            }
        }
    });
    job.start();
};

export default ExpireOngoingAssignment;
