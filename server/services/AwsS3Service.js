const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const MyError = require('../utils/MyError');

const BucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

const FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE);
class AwsS3Service {

    async uploadFile(multerFile,collectionID,folder = '') {
        if(!multerFile){
            throw Error("File không hợp lệ")
        }
        const fileBuffer = Buffer.from(multerFile.buffer, 'base64');

        if (fileBuffer.length > FILE_SIZE)
            throw new MyError('Size file < 20 MB');

        const uploadParams = {
            Bucket: BucketName,
            Body: fileBuffer,
            Key: `files${folder}/${collectionID}_${multerFile.originalname}`,
        };
        uploadParams.ContentType = multerFile.mimetype;

        try {
            const { Location } = await s3.upload(uploadParams).promise();

            return Location;
        } catch (error) {
            throw new MyError('Upload file Aws S3 failed ' + error.message);
        }
    }

    async deleteFile(url, bucketName = BucketName) {
        const urlSplit = url.split('/');
        const key = urlSplit[urlSplit.length - 1];

        const params = {
            Bucket: bucketName,
            Key: key,
        };

        try {
            await s3.deleteObject(params).promise();
        } catch (err) {
            throw new MyError('Delete file Aws S3 failed');
        }
    }
}

module.exports = new AwsS3Service();
