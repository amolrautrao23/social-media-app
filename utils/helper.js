import path from "path";

export const getRelativePath = (absolutePath) => {
    return absolutePath?.replace(`${process.cwd()}${path.sep}`, '').replace(/\\/g, '/');
};