const questionModel = require('../models/questions.model')
const questionSchema = require('../models/question.model')
const examModel = require('../models/exams.model')
const passageSchema = require('../models/passages.model')
var mongoose = require('mongoose');
const MyError = require('../utils/MyError')
const awsS3Service = require('./AwsS3Service');
class QuestionService {
    async getQuestion(examID, part) {
        try {
            console.log("examID: ", examID, "  part ", part)
            if (examID && part > 0 && part < 8) {
                let _exam = await examModel.findById(examID)
                console.log("_exam ", _exam)
                let _questionIDs = _exam.questions

                const _questions = await questionModel.find(
                    {
                        $and: [
                            {
                                '_id': { $in: _questionIDs }
                            },
                            { type: part },

                        ]
                    }
                );
                console.log("_questionIDs: ", _questions)
                return _questions
            } else {
                throw Error("Part không hợp lệ")
            }

        } catch (err) {
            throw Error(err.message)
        }
    }
    async getOne(id) {
        const qs = await questionModel.findById(id);
        return { data: qs }
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
    async insert(examID, obj) {
        const _question = obj
        delete _question['_id'];
        if (_question) {
            try {
                const data = new questionModel(_question)
                await data.save();
                if (examID) {
                    await this.addQuestionID(examID, data._id);
                }
                return ({
                    success: true,
                    message: "OK",
                    data: data
                })
            } catch (error) {
                throw Error(error.message)
            }
        } else {
            throw Error("Thiếu thông tin")
        }
    }
    async addGroup(obj, examID) {
        let _question = obj
        delete _question['_id'];
        if (_question) {
            try {
                let _from = _question.group.from
                let _to = _question.group.to
                if (_from > _to) {
                    throw Error("from lớn hơn to")
                }
                let _questions = Array(_to - _from + 1).fill().map((_, idx) => new questionSchema({ number: _from + idx }))
                _question.questions = _questions;
                const data = new questionModel(_question)
                await data.save();
                if (examID) {
                    await this.addQuestionID(examID, data._id);
                }
                return data;
            } catch (error) {
                throw Error(error.message)
            }
        } else {
            throw Error("Thiếu thông tin")
        }
    }
    async delete(examID, id) {
        try {
            await this.deleteQuestionID(examID, id)
            await questionModel.findByIdAndDelete(id);
            await this.deleteQuestionID(id);
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
    async deleteQuestionID(examID, questionID) {
        await examModel.updateOne({ _id: examID },
            { $pull: { 'questions': mongoose.Types.ObjectId(questionID) } });
    }
    async addQuestionID(examID, questionID) {
        await examModel.updateOne({ _id: examID },
            { $push: { 'questions': mongoose.Types.ObjectId(questionID) } });
    }
    async parseRawQuestion(id, file) {
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