/**
 * Created by Soumya (soumyaranjansahoo338@gmail.com) on 1/5/2021 at 3:59 PM
 */
const UploadToS3 = async (key, fileBuffer, fileType, s3, bucket) => {
    /**
     * Specify parameters to upload file to the bucket
     * @type {{ContentType: *, Bucket: string, Body: *, Key: string}}
     */

    const uploadParams = {
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: fileType,
        ACL: 'public-read',
    };

    /**
     * Upload the file to s3 bucket
     * @type {ManagedUpload.SendData}
     */
    return await s3
        .upload(uploadParams)
        .promise()
        .catch((e) => {
            console.log(e);
            return null;
        });
};

export default UploadToS3;
