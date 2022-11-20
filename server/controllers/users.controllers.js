const User = require('../models/users.model')
exports.fetchUsers = async (req, res, next) => {
    console.log("fetchUsers")
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const offset = req.query.skip ? parseInt(req.query.skip) : 0;
        const search = req.query.search;
        const role = req.query.role;
        console.log("limit: ", limit, " offset: ", offset, "search: ", search, " role: ", role, " body: ", req.body)
        let collections;
        let collectionCount;
        if (search || role) {
            console.log("search role [",role,"]")
            let querys = {}
            if (role ) {
                querys = {
                    $and: [
                        {
                            role: role,
                        },
                        {
                            $or: [
                                {
                                    name: { '$regex': search, '$options': 'i' },
                                },
                                {
                                    email: { '$regex': search, '$options': 'i' }
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
                        },
                        {
                            email: { '$regex': search, '$options': 'i' }
                        }
                    ],
                }
            }
            collections = await User.find(querys)
                .skip(offset)
                .limit(limit);
            collectionCount = await User.countDocuments({
                ticket: { $regex: search },
            });
        } else {
            collections = await User.find({}).skip(offset).limit(limit);
            collectionCount = await User.countDocuments();
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
    } catch (e) {
        next(e)
    }
}

exports.getOne = async (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
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
    User.updateOne({ _id: id }, { $set: updateObject })
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
    User.findByIdAndRemove(id)
        .exec()
        .then(() => res.status(200).json({
            success: true,
            message: 'OK'
        }))
        .catch((err) => next(err));
}
exports.insert = async (req, res, next) => {
    const { name, password, email } = req.body

    console.log(req.body)
    if (name && password && email) {
        try {
            const user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Email đã tồn tại'
                });

            } else {

                try {
                    let user = new User(req.body)
                   await user.save().then((resp) =>{
                    console.log("adsads" ,resp.errors)
                   })
                    return res.status(200).json({
                        success: true,
                        message: "Thành công"
                    })
                } catch (error) {
                    console.log("adsads" ,error.message)
                    console.log("------------------------")
                    next(error)
                }

            }


        } catch (error) {
            next(error)
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Please add infomation"
        });
    }
}
