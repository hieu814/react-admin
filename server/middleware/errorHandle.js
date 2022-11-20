const errorHandle = (err, req, res, next) => {
    let { stack, status = 400, message } = err;
    if (message && message.includes(":")) message = message.split(":").slice(-1)[0]
    if (stack) {
        res.status(status).json({ status, message });
        console.log('stack: ', stack);
    }

    next();
};

module.exports = errorHandle;
