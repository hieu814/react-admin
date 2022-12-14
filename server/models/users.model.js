const mongoose = require('mongoose')
const brypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const validator = require('validator')
const MyError = require('../utils/MyError')

const usersSchema = new mongoose.Schema({
	name: { type: String, trim: true },
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new MyError( 'Email không hợp lệ!')
			}
		},
	},
	password: {
		type: String,
		required: true,
		select: false,
		trim: true,
		validate(value) {
			if (!validator.matches(value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
				throw new MyError('Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 là số, hoặc 1 ký tự đặc biệt'
				)
			}
		},
	},
	phone: { type: String, trim: true },
	gender: { type: Number, default: 1 },
	date: { type: String, trim: true },
	role: {
		type: String,
		enum: ['USER', 'EDITOR','ADMIN'],
		default: 'USER'
	},
	googleID: { type: String, trim: true },
	facebookID: { type: String, trim: true },
	resetPasswordToken: String,
	refreshToken: String,
})

usersSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const salt = await brypt.genSalt(10)
		this.password = await brypt.hash(this.password, salt)
	}
	next()
})

usersSchema.methods.matchPassword = async function (password) {
	return await brypt.compare(password, this.password)
}

usersSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '48h' })
}

usersSchema.methods.getResetPasswordToken = async function () {
	const resetToken = crypto.randomBytes(20).toString('hex')

	this.resetPasswordToken = await crypto.createHash('sha256').update(resetToken).digest('hex')

	return resetToken
}

module.exports = mongoose.model('users', usersSchema)
