import { sendError } from "./handleResponse.js";

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            console.error(error);
            return sendError(res, error, 500, "Something went wrong!");
        });
    };
};
export default asyncHandler