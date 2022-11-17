const Users = require('../models/users.model')
const passport = require('passport');
const MyError = require('../utils/MyError')
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
	const { username, password, email, phone, gender, date } = req.body

	try {
		const user = await Users.findOne({ email });

		if (user) {
			const err = MyError( "Email exists");
			

			return next (JSON.stringify(err, Object.getOwnPropertyNames(err)));
		} else {
			user = await Users.create({
				username,
				password,
				email,
				phone,
				gender,
				date,
				grades,
			})
		}


		res.status(200).json(user)
	} catch (error) {
		next(error)
	}
}
exports.profile = async (req, res, next) => {
	console.log("profile")
	try {
		const user = await Users.findById(req.user)
		res.send(user).status(200)
	} catch (error) {
		next(error)
	}
}
exports.verifyUser = async (req, res, next) => {
	
	try {
		const { id } = req.user
		const user = await Users.findById(req.user)
		console.log("resUser: ",user)
		res.send(user).status(200)
	} catch (error) {
		next(error)
	}
}

exports.googleredirect = async (req, res, next) => {
	try {
		const _userInfor =  req.user._json
		const email = _userInfor.email
		console.log({user: req.user})

		var user = await Users.findOne({ email });

		if (!user) {
			user = new Users({
				email : email,
				password : "User_" +req.user.id,
				googleID:  req.user.id,
				username : _userInfor.name
			})
			await user.save()
		} 
		console.log({user})
		return res.json({ token : user._id });
	} catch (error) {
		return next(error);
	}
}