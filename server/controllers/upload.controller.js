const awsS3Service = require('../services/AwsS3Service');
exports.updateImage = async (req, res, next) => {

    if (!req.file) next(Error("Please upload file"))
    awsS3Service.uploadFile(req.file, "/images").then(url => {
        res.status(200).json({
            url: url
        })
    }).catch((err) => {
        next(err)
    })


}
exports.updateAudio = async (req, res, next) => {
    if (!req.file) next(Error("Please upload file"))
    awsS3Service.uploadFile(req.file, "/audios").then(url => {
        res.status(200).json({
            url: url
        });
    }).catch((err) => {
        next(err)
    })
}