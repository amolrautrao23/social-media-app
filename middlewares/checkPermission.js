import Permission from '../models/permission/Permission.model.js';

export const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      // Super Admin bypass
      if (user.role === 1) {
        return next();
      }

      const permissions = await user.getPermissions({
        attributes: ['permission_name'],
        through: { attributes: [] },
      });

      const userPerms = permissions.map((p) => p.permission_name);

      if (!userPerms.includes(permissionName)) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
};
