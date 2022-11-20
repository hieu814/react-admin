const article_categoriesModel = require('../models/article_categories.model')
var mongoose = require('mongoose');
const MyError = require('../utils/MyError');
exports.getAll = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const offset = req.query.skip ? parseInt(req.query.skip) : 0;
        const search = req.query.search;
        console.log("limit: ", limit, " offset: ", offset, "search: ", search, " body: ", req.body)
        let collections;
        let collectionCount;
        if (search) {
            collections = await article_categoriesModel.find({
                $or: [
                    {
                        name: { '$regex' : search, '$options' : 'i' },
                    }
                ],
            })
                .skip(offset)
                .limit(limit);
            collectionCount = await article_categoriesModel.countDocuments({
                ticket: { $regex: search },
            });
        } else {
            collections = await article_categoriesModel.find({}).skip(offset).limit(limit);
            collectionCount = await article_categoriesModel.countDocuments();
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
    article_categoriesModel.findById(id)
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
    updateObject.updatedBy = mongoose.Types.ObjectId(req.user),
    article_categoriesModel.updateOne({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'updated',
                data: updateObject,
            });
        })
        .catch((err) => {
            next(err)
        });
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    article_categoriesModel.findByIdAndRemove(id)
        .exec()
        .then(() => res.status(200).json({
            success: true,
            message: 'OK'
        }))
        .catch((err) => next(err));
}
exports.insert = async (req, res, next) => {

    const { name, description } = req.body
    console.log("req.body: ", req.body)
    if (name) {
        try {
            const checkData = await article_categoriesModel.findOne({ name });

            if (checkData) {
                return res.status(400).json({
                    success: false,
                    message: 'Tên đã tồn tại'
                });

            } else {

                const data = new article_categoriesModel({
                    name,
                    description,
                    createdBy: mongoose.Types.ObjectId(req.user),
                    updatedBy: mongoose.Types.ObjectId(req.user),
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
        return res.status(400).json({
            success: false,
            message: "Xin hãy nhập thông tin"
        });
    }
}
