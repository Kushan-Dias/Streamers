import i18n from "../../../lang/i18n";
import { PERMISSIONS } from "../utils/app.permissions";

export default function (locale) {
  return [
    {
      component: 'CNavGroup',
      name: i18n.global.t('labels.maintenanceManagement', locale),
      to: '/maintenances',
      icon: 'cil-paint',
      items: [
        {
          component: 'CNavItem',
          name: i18n.global.tc('labels.maintenanceAsset', 2, locale),
          to: '/maintenances/assets',
          rolesAndPermissions: PERMISSIONS.LIST_ASSETS,
        },
        {
          component: 'CNavItem',
          name: i18n.global.tc('labels.maintenanceRequest', 2, locale),
          to: '/maintenances',
          rolesAndPermissions: PERMISSIONS.LIST_MAINTENANCES,
        },
        {
          component: 'CNavItem',
          name: i18n.global.t('labels.maintenanceCalendar', locale),
          to: '/maintenances/calendar',
          rolesAndPermissions: PERMISSIONS.LIST_MAINTENANCE_EVENTS,
        },
      ],
    },
  ];
};
