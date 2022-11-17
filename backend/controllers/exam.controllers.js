const ExamService = require('../services/Exam.service')
exports.getAll = async (req, res, next) => {
    try {
        const data = await ExamService.getAll(req.query)
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
}

exports.getOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await ExamService.getOne(id)
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }

}
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const updateObject = req.body;
    try {
        const data = await ExamService.update(id, updateObject)
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
}
exports.importCSV = async (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    try {
        await ExamService.importCSV(file)
        res.status(200).send("Thành công");
    } catch (err) {
        next(err)
    }
}
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await ExamService.delete(id)
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
}
exports.insert = async (req, res, next) => {
    try {
        const data = await ExamService.insert(req.body)
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
}
exports.test = async (req, res, next) => {
    try {

        const data = await ExamService.parseWord()
        console.log("----------------send ")
        res.send(data)
    } catch (err) {
        next(err)
    }
}