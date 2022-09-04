const questionModel = require('../models/questions.model')
const { questionSchema } = require('../models/questions.model')
var mongoose = require('mongoose');
const MyError = require('../utils/MyError')
const awsS3Service = require('./AwsS3Service');
const ExamService = require('../services/Exam.service')
class QuestionService {
    async getQuestion(examID, part) {
        try {
            if (examID && part > 0 && part < 8) {
                let _exam = await ExamService.getOne(examID).data
                let _questionIDs = _exam.questions
                console.log("_questionIDs: ", _questionIDs)
                const _questions = await questionModel.find({
                    '_id': {
                        $and: [
                            { $in: _questionIDs },
                            { type: part },

                        ]
                    }
                });
                return _questions
            } else {
                throw Error("Part không hợp lệ")
            }

        } catch (err) {
            throw Error(err.message)
        }
    }
    async getOne(id) {
        questionModel.findById(id)
            .then((value) => {
                return ({
                    success: true,
                    data: value,
                });
            })
            .catch((err) => {
                throw Error(err.message)
            });
    }

    async update(id, obj) {
        const updateObject = obj;
        questionModel.updateOne({ _id: id }, { $set: updateObject })
            .exec()
            .then(() => {
                return ({
                    success: true,
                    message: 'updated',
                    data: updateObject,
                });
            })
            .catch((err) => { throw Error(err.message) });
    }
    async insert(obj, examID) {
        const _question = obj
        delete _question['_id'];
        if (_question) {
            try {
                const checkData = await questionModel.findOne({ name: _question.name });
                if (checkData) {
                    throw Error('Đề thi đã tồn tại')

                } else {
                    const data = new questionModel(_question)
                    await data.save();
                    if (examID) {
                        await ExamService.addQuestionID(data._id);
                    }
                    return ({
                        success: true,
                        message: "OK",
                        data: data
                    })
                }


            } catch (error) {
                throw Error(error.message)
            }
        } else {
            throw Error("Thiếu thông tin")
        }
    }

    async delete(id) {
        try {
            await questionModel.findByIdAndDelete(id);
            await ExamService.deleteQuestionID(id);
            return ({
                success: true,
                message: 'OK'
            })
        } catch (err) {
            throw Error(err.message)
        }
    }
    async updateImage(id, file) {
        try {
            let options = { returnDocument: 'after' }
            const url = await awsS3Service.uploadFile(file);
            let data = await questionModel.updateOne({ _id: id }, { $set: { image: url } }, options).exec()
            return data;
        } catch (error) {
            next(error)
        }

    }
    async updateAudio(id, file) {
        try {
            // if (updateObject.image) {
            //     await awsS3Service.deleteFile(updateObject.image);
            // }
            let options = { returnDocument: 'after' }
            const url = await awsS3Service.uploadFile(file);
            let data = await questionModel.updateOne({ _id: id }, { $set: { autio: url } }, options)
                .exec()
            return data;
        } catch (error) {
            next(error)
        }

    }
}
module.exports = new QuestionService();