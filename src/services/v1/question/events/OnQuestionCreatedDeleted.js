const OnQuestionCreatedDeleted = async (result, context) => {
    const { app } = context;
    const { entityId, entityType } = result;

    // console.log(entityId);
    const questionData = await app.service('v1/question')._find({
        query: {
            status: { $ne: 0 },
            entityId,
        },
    });

    const questionCount = questionData.length;
    let totalMarks = 0;
    if (entityType === 'exam') totalMarks = questionData.reduce((total, each) => total + each.mark, 0);

    // console.log(questionCount);
    if (entityType === 'video')
        await app.service('v1/video')._patch(entityId, {
            questionCount,
        });

    if (entityType === 'exam')
        await app.service('v1/exam')._patch(entityId, {
            questionCount,
            'mark.total': totalMarks,
        });
};

export default OnQuestionCreatedDeleted;
