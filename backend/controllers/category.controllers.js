const Models = require('../models/article_categories.model')
var mongoose = require('mongoose');
exports.getAll = async (req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const offset = req.query.skip ? parseInt(req.query.skip) : 0;
        const search = req.query.search;
        console.log("limit: ", limit, " offset: ", offset, "search: ", search, " body: ", req.body)
        let collections;
        let collectionCount;
        if (search) {
            collections = await Models.find({
                $or: [
                    {
                        name: { '$regex' : search, '$options' : 'i' },
                    }
                ],
            })
                .skip(offset)
                .limit(limit);
            collectionCount = await Models.countDocuments({
                ticket: { $regex: search },
            });
        } else {
            collections = await Models.find({}).skip(offset).limit(limit);
            collectionCount = await Models.countDocuments();
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
    Models.findById(id)
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
    Models.updateOne({ _id: id }, { $set: updateObject })
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
    Models.findByIdAndRemove(id)
        .exec()
        .then(() => res.status(200).json({
            success: true,
            message: 'OK'
        }))
        .catch((err) => next(err));
}
exports.insert = async (req, res, next) => {
    const { name, type } = req.body


    if (name && type  ) {
        try {
            const checkData = await Models.findOne({ name });

            if (checkData) {
                return res.status(400).json({
                    success: false,
                    message: 'Category exists'
                });

            } else {
                let data = {
                    name: name,
                    type: type,
                    createdBy: mongoose.Types.ObjectId(req.user),
                    updatedBy: mongoose.Types.ObjectId(req.user),
                }

                Models.create(data, function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message:err
                        })
                    }else{
                        return res.status(200).json({
                            success: true,
                            message: "OK"
                        })
                    }

                })
            }


        } catch (error) {
            next(err)
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Please add infomation2"
        });
    }
}
