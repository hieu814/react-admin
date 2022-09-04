const articleModel = require('../models/articles.model')
var mongoose = require('mongoose');
const MyError = require('../utils/MyError')
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
                            category:  mongoose.Types.ObjectId(category),
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
            collections = await articleModel.find(querys)
                .skip(offset)
                .limit(limit);
            collectionCount = await articleModel.countDocuments({
                ticket: { $regex: search },
            });
        } else {
            collections = await articleModel.find({}).skip(offset).limit(limit);
            collectionCount = await articleModel.countDocuments();
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
    articleModel.findById(id)
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
    updateObject.updatedBy = req.user,
        articleModel.updateOne({ _id: id }, { $set: updateObject })
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

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        await articleModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'OK'
        })
    } catch (err) {
        next(err)
    }
}
exports.insert = async (req, res, next) => {

    const { category, name, thumbail, content } = req.body

    if (name && thumbail && content) {
        try {
            const checkData = await articleModel.findOne({ name });

            if (checkData) {
                return res.status(400).json({
                    success: false,
                    message: 'Article exists'
                });

            } else {
                const data = new articleModel({
                    category: category,
                    name: name,
                    thumbail: thumbail,
                    content: content,
                    createdBy: req.user,
                    updatedBy: req.user,
                })
                await data.save();

            }
            return res.status(200).json({
                success: false,
                message: "OK"
            })

        } catch (error) {
            next(error)
        }
    } else {
        next(new MyError('Xin hãy điển thêm thông tin'))
    }
}
