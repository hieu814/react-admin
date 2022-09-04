var https = require('https');
var concat = require('concat-stream');
var eyes = require('eyes');
const examModel = require('../models/exams.model')
var mongoose = require('mongoose');
const MyError = require('../utils/MyError')
const wordService = require("../services/Word.service");
const awsS3Service = require('../services/AwsS3Service');
const slug = require("slug");
const QuestionService = require('../services/Question.service')
var fs = require('fs'),
    xml2js = require('xml2js');
var path = require("path");
class ExamService {
    async getAll(query) {
        try {
            let limit = query.limit ? parseInt(query.limit) : 20;
            let offset = query.skip ? parseInt(query.skip) : 0;
            let search = query.search;
            let category = query.category;
            console.log("limit: ", limit, " offset: ", offset, "search: ", search)
            let collections;
            let collectionCount;
            if (search || category) {
                let querys = {}
                if (category) {
                    if (!search)
                        search = ""
                    querys = {
                        $and: [
                            {
                                category: mongoose.Types.ObjectId(category),
                            },
                            {
                                $or: [
                                    {
                                        name: { '$regex': search, '$options': 'i' },
                                    }
                                ],
                            }
                        ]

                    }
                } else {
                    querys = {
                        $or: [
                            {
                                name: { '$regex': search, '$options': 'i' },
                            }
                        ],
                    }
                }
                collections = await examModel.find(querys)
                    .skip(offset)
                    .limit(limit);
                collectionCount = await examModel.countDocuments({
                    ticket: { $regex: search },
                });
            } else {
                collections = await examModel.find({}).skip(offset).limit(limit);
                collectionCount = await examModel.countDocuments();
            }

            const totalPages = Math.ceil(collectionCount / limit);
            const currentPage = Math.ceil(collectionCount % offset);

            return {
                success: true,
                data: collections,
                paging: {
                    total: collectionCount,
                    page: currentPage,
                    pages: totalPages,
                },
            }
        } catch (err) {
            throw Error(err.message)
        }
    }
    async getOne(id) {
        examModel.findById(id)
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
        examModel.updateOne({ _id: id }, { $set: updateObject })
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
    async insert(obj) {
        const _exam = obj
        delete _exam['_id'];
        if (_exam) {
            try {
                const checkData = await examModel.findOne({ name: _exam.name });
                if (checkData) {
                    throw Error('Đề thi đã tồn tại')

                } else {
                    const data = new examModel(_exam)
                    await data.save();
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
            await examModel.findByIdAndDelete(id);
            return ({
                success: true,
                message: 'OK'
            })
        } catch (err) {
            throw Error(err.message)
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
    async parseWord() {
        try {
            var _data = "eror"
            var _xmlUrl = ""

            const absolutePath = path.resolve("assets", "test.docx");
            var convertapi = require('convertapi')('SfEzEhmmAbSE3fNi');
            await convertapi.convert('xml', {
                File: absolutePath
            }, 'docx').then(async function (r) {
                _xmlUrl = r.response.Files[0].Url
                console.log("convertapi", _xmlUrl);
            });

            _data = await this.parseXML(_xmlUrl)
            return _data
        } catch (error) {
            console.log(error)
        }


    }
    async parseXML(url) {
        var data = '';
        var parser = new xml2js.Parser();
        return new Promise((resolve, reject) => {
            parser.on('error', function (err) { console.log('Parser error', err); });
            https.get(url, function (res) {
                if (res.statusCode >= 200 && res.statusCode < 400) {
                    res.on('data', function (data_) { data += data_.toString(); });
                    res.on('end', function () {
                        console.log('data -- ok ',);
                        parser.parseString(data, function (err, result) {
                            console.log('FINISHED', err, result);
                            resolve(result["w:wordDocument"]["w:body"]);
                        });
                    });
                }
            });
        });
    }

}
module.exports = new ExamService();