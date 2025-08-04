export const sendResponse = (res, message, data, status, success = 1) => {
    return res.status(status || 200).json({ success, message, ...data });
};


export const sendError = (res, err, message, status) => {
    console.log(err, err?.message)
    return new Error(res.status(status || 500).json({ success: 0, message: err?.message || message || "Something went wrong", error: err || message, }))
};