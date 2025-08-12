export const sendResponse = (res, status, message, data = {}, success = true) => {
    return res.status(status || 200).json({
        success,
        message,
        data
    });
};

export const sendError = (res, err, status, message) => {
    return res.status(status || 500).json({
        success: false,
        message: message || err?.message || "Something went wrong",
        error: err
    });
};
