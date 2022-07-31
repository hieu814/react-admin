const Users = require('../models/users.model')
const passport = require('passport');
const createError = require('../utils/ErrorRes')
exports.login = async (req, res, next) => {
	passport.authenticate(
		'login',
		async (err, user, info) => {
			// console.log("asdasd ",user);
			try {
				if (err || !user) {
					const error = new Error('An error occurred.');

					return next(info);
				}

				req.login(
					user,
					{ session: false },
					async (error) => {
						if (error) return next(error);
						const token = user.getSignedToken();

						return res.json({ token });
					}
				);
			} catch (error) {
				return next(error);
			}
		}
	)(req, res, next);
}
exports.register = async (req, res, next) => {
	const { name, password, email, phone, gender, date, grades } = req.body

	try {
		const user = await Users.findOne({ email });

		if (user) {
			const err = createError(400, "Email exists");
			

			return next (JSON.stringify(err, Object.getOwnPropertyNames(err)));
		} else {
			user = await Users.create({
				name,
				password,
				email,
				phone,
				gender,
				date,
				grades,
			})
		}
		//return createError(400, "Server Error")


		res.status(200).json(user)
	} catch (error) {
		next(error)
	}
}
exports.profile = async (req, res, next) => {
	return res.status(200).json("adasdasd")
}