import { sendError, sendResponse } from '../../utils/handleResponse.js';
import asyncHandler from '../../utils/asyncHandler.js';
import Permission from '../../models/permission/Permission.model.js';
import { Op } from 'sequelize';

export const addPermission = asyncHandler(async (req, res) => {
  const { permission_name, is_default } = req.body;

  if (!permission_name) {
    return sendError(res, 400, 'Permission name is required!');
  }

  // validate is_default if provided
  if (is_default !== undefined && ![0, 1].includes(Number(is_default))) {
    return sendError(res, 400, 'is_default must be 0 or 1');
  }

  const isExist = await Permission.findOne({
    where: { permission_name },
  });

  if (isExist) {
    return sendError(res, 400, 'Permission with this name already exists!');
  }

  const permission = await Permission.create({
    permission_name,
    ...(is_default !== undefined && {
      is_default: Number(is_default),
    }),
  });

  sendResponse(res, 201, 'Permission created successfully', permission);
});
export const getPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permission.findAll();
  sendResponse(res, 200, 'Permissions fetched successfullly', permissions);
});

export const updatePermission = asyncHandler(async (req, res) => {
  const { id, permission_name, is_default } = req.body;

  if (!id) {
    return sendError(res, 400, 'Permission ID is required!');
  }

  if (!permission_name) {
    return sendError(res, 400, 'Permission name is required!');
  }

  // validate is_default
  if (is_default !== undefined && ![0, 1].includes(Number(is_default))) {
    return sendError(res, 400, 'is_default must be 0 or 1');
  }

  // check permission exists
  const permission = await Permission.findByPk(id);
  if (!permission) {
    return sendError(res, 404, 'Permission not found');
  }

  const isExist = await Permission.findOne({
    where: {
      permission_name,
      id: { [Op.ne]: id }, // exclude current permission
    },
  });

  if (isExist) {
    return sendError(res, 400, 'Permission with this name already exists');
  }

  // update values
  permission.permission_name = permission_name;

  if (is_default !== undefined) {
    permission.is_default = is_default;
  }
  if (!permission.changed()) {
    return sendResponse(res, 200, 'No changes detected', permission);
  }
  await permission.save();

  return sendResponse(res, 200, 'Permission updated successfully', permission);
});

export const deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return sendError(res, 400, 'Permission ID is required!');
  }
  const permission = await Permission.findByPk(id);
  if (!permission) {
    return sendError(res, 404, 'Permission not found!');
  }
  await permission.destroy();
  return sendResponse(res, 200, 'Permission deleted successfully..');
});
