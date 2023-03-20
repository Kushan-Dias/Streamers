import jwt_decode from 'jwt-decode';

export const getTenantModuleNames = () => {
  let tenantModules = [];
  const jwtDecoded = decodeJwt();

  if (jwtDecoded) {
    const tenantId = jwtDecoded.tenant_id;

    if (tenantId) {
      const modules = require('../../../modules_statuses_tenant.json');
      Object.keys(modules).forEach(key => {
        if (key === tenantId) {
          modules[key].forEach(module => {
            if (module.status === 'ACTIVE') {
              tenantModules.push(module.name);
            }
          });
        }
      });

    }
  }

  return tenantModules;
};

export const decodeJwt = (token = null) => {
  if (token) {
    return jwt_decode(token);
  } else {
    const token = localStorage.getItem('token');
    if (token) {
      return jwt_decode(token);
    }
  }

  return null;
};

export const hasValidAccess = (requiredRolesAndPermissions = []) => {
  let jwtPayload = decodeJwt();
  let userRolesAndPermissions = jwtPayload.roles.concat(jwtPayload.permissions);

  return userRolesAndPermissions.some(r => requiredRolesAndPermissions.indexOf(r) >= 0) || requiredRolesAndPermissions.length === 0;
};

export const validateNavItems = (navItems = []) => {
  let validateMain = navItems.filter(item => hasValidAccess(item.rolesAndPermissions));
  let validateSub = validateMain.map(item => {
    if (item.items) {
      item.items = item.items.filter(i => hasValidAccess(i.rolesAndPermissions));
    }
    return item;
  });

  return validateSub.filter(item => {
    if (item.items) {
      return item.items.length > 0;
    }
    return true;
  });
};
