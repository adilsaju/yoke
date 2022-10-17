function errorHandler(Error, req, res, next) {
    console.log(Error)
    res.status(Error.status || 500)
    res.send({"error": true, "message": Error.message || "internal server error" })
}

module.exports = errorHandler;