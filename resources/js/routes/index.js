import { h, resolveComponent } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import { getTenantModuleNames, hasValidAccess } from "../utils/app.utils";

import Login from "../views/auth/Login";
import ChangePassword from "../views/auth/ChangePassword";
import EmailVerification from "../views/auth/EmailVerification";
import DefaultLayout from "../layouts/DefaultLayout";

import { PERMISSIONS } from "../utils/app.permissions";


let routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    beforeEnter: (to, from, next) => {
      store.state.auth.status.loggedIn
        ? next({ name: 'Dashboard' })
        : next({ name: 'Login' });
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
  },
  {
    path: '/user/verify-email',
    name: 'EmailVerificationResend',
    component: EmailVerification,
  },
  {
    path: '/user/verify-email/:id/:hash',
    name: 'EmailVerificationVerify',
    component: EmailVerification,
  },
  {
    path: '/tenants/status/disabled',
    component: () => import('../views/tenants/TenantDisabled.vue'),
  },
  {
    path: '/',
    id: 'DefaultLayout',
    component: DefaultLayout,
    redirect: '/dashboard',
    beforeEnter: (to, from, next) => {
      store.state.auth.status.loggedIn
        ? next()
        : next({ name: 'Login' });
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      },
      {
        path: '/tenants',
        name: 'Tenants',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/tenants',
        beforeEnter: (to, from, next) => {
          hasValidAccess(PERMISSIONS.LIST_TENANTS)
            ? next()
            : next({ name: 'Dashboard' });
        },
        children: [
          {
            path: '/tenants',
            name: 'Tenants List',
            component: () => import('../views/tenants/Tenants.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.LIST_TENANTS)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
          {
            path: '/tenants/create',
            name: 'Create Tenant',
            component: () => import('../views/tenants/CreateTenant.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.CREATE_TENANT)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
          {
            path: '/tenants/oneflow-accounts',
            name: 'OneFlow Account',
            component: () => import('../views/contracts/OneFlowAccounts.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.LIST_ONEFLOWS)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
          {
            path: '/tenants/:id',
            component: () => import('../views/tenants/ViewTenant.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.VIEW_TENANT)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
          {
            path: '/tenants/:id/edit',
            component: () => import('../views/tenants/EditTenant.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.EDIT_TENANT)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
         
        ],
      },

       /*streamer dashboard path created by Kushan*/ 
       {
        path: '/streamer',
        name: 'Streamer Dashboard',
        component: () => import('../views/StreamerDashboard.vue'),
        /*beforeEnter: (to, from, next) => {
          hasValidAccess(PERMISSIONS.LIST_TENANTS)
            ? next()
            : next({ name: 'Dashboard' });
        },*/
      },

      /*streamer Profile path created by Kushan*/
      {
        path: '/streamer/profile/:id',
        name: 'Streamer Profile',
        component: () => import('../views/tenants/users/Streamers/streamerProfile.vue'),
      },

      {
        path: '/users',
        name: 'Users',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/users',
        children: [
          {
            path: '/users',
            name: 'Users List',
            component: () => import('../views/tenants/users/Users.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.LIST_USERS)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
          {
            path: '/users/:id',
            component: () => import('../views/tenants/users/ViewUser.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.VIEW_USER)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
          {
            path: '/users/:id/edit',
            component: () => import('../views/tenants/users/EditUser.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.EDIT_USER)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
        ],
      },
      {
        path: '/roles',
        name: 'Roles',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        beforeEnter: (to, from, next) => {
          hasValidAccess(PERMISSIONS.LIST_ROLES)
            ? next()
            : next({ name: 'Dashboard' });
        },
        children: [
          {
            path: '/roles/permissions',
            name: 'Roles Permissions',
            component: () => import('../views/roles/RolesPermissions.vue'),
          },
          {
            path: '/roles',
            name: 'Roles List',
            component: () => import('../views/roles/Roles.vue'),
          },
          {
            path: '/roles/:id',
            component: () => import('../views/roles/ViewRole.vue'),
          },
        ],
      },
      {
        path: '/events',
        name: 'Events',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/events',
        children: [
          {
            path: '/events',
            name: 'Events List',
            component: () => import('../views/events/Events.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.LIST_EVENTS)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
        ],
      },
      {
        path: '/contracts',
        name: 'Contracts',
        component: {
          render() {
            return h(resolveComponent('router-view'));
          },
        },
        redirect: '/contracts',
        children: [
          {
            path: '/contracts',
            name: 'Contracts List',
            component: () => import('../views/tenants/contracts/Contracts.vue'),
            beforeEnter: (to, from, next) => {
              hasValidAccess(PERMISSIONS.LIST_CONTRACTS)
                ? next()
                : next({ name: 'Dashboard' });
            },
          },
        ],
      },
    ],
  },
];

/**
 * Dynamic Module Routes
 */
const requireModule = require.context('../modules', true, /\.js$/);
const tenantModuleNames = getTenantModuleNames();
let moduleRoutes = [];

requireModule.keys().forEach(fileName => {
  let moduleName = fileName.split('/');
  moduleName = moduleName[1];

  if (tenantModuleNames.includes(moduleName)) {
    if (fileName === `./${moduleName}/routes/index.js`) {
      moduleRoutes.push(...requireModule(fileName).default);
    }
  }
});

/**
 * Concat all imported routes with default routes
 */
routes = routes.map(route => {
  if (route.id === 'DefaultLayout') {
    route.children = route.children.concat(moduleRoutes);
  }
  return route;
});

const redirectRoute = { path: '/:pathMatch(.*)*', redirect: '/dashboard' };
routes.push(redirectRoute);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
