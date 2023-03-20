import { h, resolveComponent } from "vue";
import { hasValidAccess } from "../../../utils/app.utils";
import { PERMISSIONS } from "../utils/app.permissions";

const routes = [
  {
    path: '/maintenances/assets',
    name: 'Assets',
    component: {
      render() {
        return h(resolveComponent('router-view'));
      },
    },
    redirect: '/maintenances/assets',
    children: [
      {
        path: '/maintenances/assets',
        name: 'Maintenance Assets',
        component: () => import('../views/maintenances/assets/Assets.vue'),
        beforeEnter: (to, from, next) => {
          hasValidAccess(PERMISSIONS.LIST_ASSETS)
            ? next()
            : next({ name: 'Dashboard' });
        },
      },
      {
        path: '/maintenances/assets/:id',
        component: () => import('../views/maintenances/assets/ViewAsset.vue'),
        beforeEnter: (to, from, next) => {
          hasValidAccess(PERMISSIONS.VIEW_ASSET)
            ? next()
            : next({ name: 'Dashboard' });
        },
      },
    ],
  },
  {
    path: '/maintenances',
    name: 'Maintenance',
    component: {
      render() {
        return h(resolveComponent('router-view'));
      },
    },
    redirect: '/maintenances',
    children: [
      {
        path: '/maintenances',
        name: 'Tickets',
        component: () => import('../views/maintenances/Maintenances.vue'),
        beforeEnter: (to, from, next) => {
          hasValidAccess(PERMISSIONS.LIST_MAINTENANCES)
            ? next()
            : next({ name: 'Dashboard' });
        },
      },
      {
        path: '/maintenances/:id',
        component: () => import('../views/maintenances/ViewMaintenance.vue'),
        beforeEnter: (to, from, next) => {
          hasValidAccess(PERMISSIONS.VIEW_MAINTENANCE)
            ? next()
            : next({ name: 'Dashboard' });
        },
      },
      {
        path: '/maintenances/calendar',
        name: 'Calendar',
        component: () => import('../views/maintenances/events/MaintenanceEvents.vue'),
        beforeEnter: (to, from, next) => {
          hasValidAccess(PERMISSIONS.LIST_MAINTENANCE_EVENTS)
            ? next()
            : next({ name: 'Dashboard' });
        },
      },
    ],
  },
];

export default routes;
