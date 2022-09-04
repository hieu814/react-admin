const QuestionService = require('../services/Question.service')
exports.getAll = async (req, res, next) => {
    try {
        const data = await QuestionService.getAll(req.query)
        res.status(200).send({
            data: data
        });
    } catch (err) {
        next(err)
    }
}

exports.getOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await QuestionService.getOne(id)
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }

}
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const updateObject = req.body;
    try {
        const data = await QuestionService.update(id, updateObject)
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await QuestionService.delete(id)
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
}
exports.insert = async (req, res, next) => {
    try {
        const data = await QuestionService.insert(req.body)
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
}
exports.updateImage = async (req, res, next) => {
    const id = req.params.id;
    try {
        const file = req.file
        const updateObject = await QuestionService.updateImage(id,file)
        res.status(200).json({
            success: true,
            message: 'updated',
            data: updateObject,
        });
    } catch (error) {
        next(error)
    }

}
exports.updateAudio = async (req, res, next) => {
    const id = req.params.id;
    try {
        const file = req.file
        const updateObject = await QuestionService.updateAudio(id,file)
        res.status(200).json({
            success: true,
            message: 'updated',
            data: updateObject,
        });
    } catch (error) {
        next(error)
    }

}