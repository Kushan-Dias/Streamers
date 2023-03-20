import i18n from "../lang/i18n";
import { PERMISSIONS } from "../utils/app.permissions";

export default function (locale) {
  return [
    {
      component: 'CNavItem',
      name: i18n.global.t('labels.dashboard', locale),
      to: '/dashboard',
      icon: 'cil-speedometer',
    },
    {
      component: 'CNavTitle',
      name: i18n.global.t('labels.manage', locale),
    },
    {
      component: 'CNavGroup',
      name: i18n.global.t('labels.tenantManagement', locale),
      to: '',
      icon: 'cil-building',
      rolesAndPermissions: PERMISSIONS.LIST_TENANTS,
      items: [
        {
          component: 'CNavItem',
          name: i18n.global.tc('labels.tenant', 2, locale),
          to: '/tenants',
          rolesAndPermissions: PERMISSIONS.LIST_TENANTS,
        },
        {
          component: 'CNavItem',
          name: i18n.global.tc('labels.oneflowAccount', 2, locale),
          to: '/tenants/oneflow-accounts',
          rolesAndPermissions: PERMISSIONS.LIST_ONEFLOWS,
        },
      ],
    },
    {
      component: 'CNavItem',
      name: i18n.global.tc('labels.user', 2, locale),
      to: '/users',
      icon: 'cil-user',
      rolesAndPermissions: PERMISSIONS.LIST_USERS,
    },
    {
      component: 'CNavGroup',
      name: i18n.global.t('labels.roleManagement', locale),
      to: '',
      icon: 'cil-people',
      items: [
        {
          component: 'CNavItem',
          name: i18n.global.tc('labels.role', 2, locale),
          to: '/roles',
          rolesAndPermissions: PERMISSIONS.LIST_ROLES,
        },
        {
          component: 'CNavItem',
          name: i18n.global.tc('labels.permission', 2, locale),
          to: '/roles/permissions',
          rolesAndPermissions: PERMISSIONS.ASSIGN_PERMISSIONS,
        },
      ],
    },
    {
      component: 'CNavGroup',
      name: i18n.global.t('labels.contractManagement', locale),
      to: '',
      icon: 'cil-institution',
      items: [
        {
          component: 'CNavItem',
          name: i18n.global.tc('labels.contract', 2, locale),
          to: '/contracts',
          rolesAndPermissions: PERMISSIONS.LIST_CONTRACTS,
        },
      ],
    },
    {
      component: 'CNavGroup',
      name: i18n.global.t('labels.eventManagement', locale),
      to: '/events',
      icon: 'cil-calendar',
      items: [
        {
          component: 'CNavItem',
          name: i18n.global.tc('labels.eventsCalendar', 2, locale),
          to: '/events',
          rolesAndPermissions: PERMISSIONS.LIST_EVENTS,
        },
      ],
    },
  ];
};
