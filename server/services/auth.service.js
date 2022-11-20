const { Error } = require('mongoose');
const User = require('../models/users.model')
const sendEmail = require("../utils/email/sendEmail");
const crypto = require('crypto')
const clientURL = process.env.CLIENT_URL;

const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw Error("Tài khoản không tồn tại")
    }
    const resetToken = await user.getResetPasswordToken()
    await user.save()

    const link = `${clientURL}/passwordReset?token=${resetToken}`;
    var promise = new Promise(function (resolve, reject) {
        sendEmail(
            user.email,
            "Password Reset Request",
            {
                name: user.name,
                link: link,
            },
            "./template/requestResetPassword.handlebars"
        ).then(() => {
            resolve(link);
        })
            .catch(() => {
                reject("Gửi email thất bại")
            });

    })

    return promise;
};

const resetPassword = async (token, password) => {
    try {
        if (!token) throw new Error("Yêu cầu không hợp lệ")
        token = crypto.createHash('sha256').update(token).digest('hex')
        const _user = await User.findOne({ resetPasswordToken: token })
        if (!_user) {
            throw new Error("Yêu cầu không hợp lệ")
        }
        _user.password = password
        await _user.save()
        console.log({password})
    } catch (error) {
        throw error
    }
};

module.exports = {
    requestPasswordReset,
    resetPassword,
};