exports.success = (
    res,
    data = null,
    message = "Success",
    status = 200,
    extra = {}
) => {
    return res.status(status).json({
        success: true,
        message,
        ...extra,
        data,
    });
};

exports.error = (res, message, status = 400) => {
    return res.status(status).json({
        success: false,
        message,
    });
};