const vocabularyModel = require('../models/vocabulary.model')
var mongoose = require('mongoose');
const MyError = require('../utils/MyError')
const wordService = require("../services/Word.service");
const awsS3Service = require('../services/AwsS3Service');
const slug = require("slug");
exports.getAll = async (req, res, next) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 20;
        let offset = req.query.skip ? parseInt(req.query.skip) : 0;
        let search = req.query.search;
        let category = req.query.category;
        console.log("limit: ", limit, " offset: ", offset, "search: ", search, " body: ", req.body)
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
            collections = await vocabularyModel.find(querys)
                .skip(offset)
                .limit(limit);
            collectionCount = await vocabularyModel.countDocuments({
                ticket: { $regex: search },
            });
        } else {
            collections = await vocabularyModel.find({}).skip(offset).limit(limit);
            collectionCount = await vocabularyModel.countDocuments();
        }

        const totalPages = Math.ceil(collectionCount / limit);
        const currentPage = Math.ceil(collectionCount % offset);

        res.status(200).send({
            success: true,
            data: collections,
            paging: {
                total: collectionCount,
                page: currentPage,
                pages: totalPages,
            },
        });
    } catch (err) {
        next(err)
    }
}

exports.getOne = async (req, res, next) => {
    const id = req.params.id;
    vocabularyModel.findById(id)
        .then((value) => {
            res.status(200).json({
                success: true,
                data: value,
            });
        })
        .catch((err) => {
            next(err)
        });

}
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const updateObject = req.body;
    vocabularyModel.updateOne({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'updated',
                data: updateObject,
            });
        })
        .catch((err) => next(err));
}
exports.updateImage = async (req, res, next) => {
    const id = req.params.id;
    console.log("-------------obj id ", id)
    const updateObject = req.body;
    try {
        const file = req.file
        if (updateObject.image) {
            await awsS3Service.deleteFile(updateObject.image);
        }
        const url = await awsS3Service.uploadFile(file);

        updateObject.image = url
        vocabularyModel.updateOne({ _id: id }, { $set: updateObject })
            .exec()
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: 'updated',
                    data: updateObject,
                });
            })
            .catch((err) => next(err));
    } catch (error) {
        next(error)
    }

}
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        await vocabularyModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'OK'
        })
    } catch (err) {
        next(err)
    }
}
exports.insert = async (req, res, next) => {

    const _vocabulary = req.body
    _vocabulary.image = ""
    _vocabulary.audio = ""
    if (_vocabulary) {
        try {
            const checkData = await vocabularyModel.findOne({ word: _vocabulary.word });
            if (checkData) {
                return res.status(400).json({
                    success: false,
                    message: 'Từ đã tồn tại'
                });

            } else {
                const data = new vocabularyModel(_vocabulary)
                await data.save();
                return res.status(200).json({
                    success: true,
                    message: "OK",
                    data: data
                })
            }


        } catch (error) {
            next(error)
        }
    } else {
        next(new MyError('Xin hãy điển thêm thông tin'))
    }
}
exports.getWord = async (req, res, next) => {
    const { name } = req.params;
    try {
        const word = await wordService.getByName(slug(name, "_"));

        if (!word) {
            next(new MyError("Không tìm thấy"))
        }

        res.status(200).json(word);
    } catch (error) {
        next(new MyError("Không tìm thấy"))
    }

}