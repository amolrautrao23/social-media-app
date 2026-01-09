export const sendResponse = (res, status, message, data = {}, success = true) => {
  return res.status(status || 200).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res, status = 500, message = 'Something went wrong') => {
  return res.status(status).json({
    success: false,
    message,
  });
};
