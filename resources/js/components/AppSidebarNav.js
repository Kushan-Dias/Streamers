import { defineComponent, h, onMounted, ref, resolveComponent, toRef } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { CBadge, CNavGroup, CNavItem, CNavTitle, CSidebarNav } from '@coreui/vue';
import coreNav from '../navigation/_nav';
import { getTenantModuleNames, validateNavItems } from "../utils/app.utils";
import i18n from "../lang/i18n";

const normalizePath = (path) =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(html)$/, '');

const isActiveLink = (route, link) => {
  if (link === undefined) {
    return false;
  }

  if (route.hash === link) {
    return true;
  }

  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);

  return currentPath === targetPath;
};

const isActiveItem = (route, item) => {
  if (isActiveLink(route, item.to)) {
    return true;
  }

  if (item.items) {
    return item.items.some((child) => isActiveItem(route, child));
  }

  return false;
};

const AppSidebarNav = defineComponent({
  name: 'AppSidebarNav',
  props: {
    locale: {
      type: String,
    }
  },
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle,
  },
  setup(props) {
    const route = useRoute();
    const firstRender = ref(true);

    onMounted(() => {
      firstRender.value = false;
    });

    const renderItem = (item) => {
      if (item.items) {
        return h(
          CNavGroup,
          {
            ...(firstRender.value && {
              visible: item.items.some((child) => isActiveItem(route, child)),
            }),
          },
          {
            togglerContent: () => [
              h(resolveComponent('CIcon'), {
                customClassName: 'nav-icon',
                name: item.icon,
              }),
              item.name,
            ],
            default: () => item.items.map((child) => renderItem(child)),
          },
        );
      }

      return item.to
        ? h(
          RouterLink,
          {
            to: item.to,
            custom: true,
          },
          {
            default: (props) =>
              h(
                resolveComponent(item.component),
                {
                  active: props.isActive,
                  href: props.href,
                  onClick: () => props.navigate(),
                },
                {
                  default: () => [
                    item.icon &&
                    h(resolveComponent('CIcon'), {
                      customClassName: 'nav-icon',
                      name: item.icon,
                    }),
                    item.name,
                    item.badge &&
                    h(
                      CBadge,
                      {
                        class: 'ms-auto',
                        color: item.badge.color,
                      },
                      {
                        default: () => item.badge.text,
                      },
                    ),
                  ],
                },
              ),
          },
        )
        : h(
          resolveComponent(item.component),
          {},
          {
            default: () => item.name,
          },
        );
    };

    /**
     * Concat all module navigation items with default items
     */
    const nav = (locale) => {
      const items = coreNav(locale);
      const tenantModuleNames = getTenantModuleNames();

      const moduleNavTitle = {
        component: 'CNavTitle',
        name: i18n.global.tc('labels.module', 2, locale),
      };

      if (tenantModuleNames.length > 0) {
        items.push(moduleNavTitle);
      }

      const requireModule = require.context('../modules', true, /\.js$/);
      let moduleNavItems = [];

      requireModule.keys().forEach(fileName => {
        let moduleName = fileName.split('/');
        moduleName = moduleName[1];

        if (tenantModuleNames.includes(moduleName)) {
          if (fileName === `./${moduleName}/navigation/_nav.js`) {
            moduleNavItems.push(...requireModule(fileName).default(locale));
          }
        }
      });

      return [...items, ...moduleNavItems];
    };

    return () =>
      h(
        CSidebarNav,
        {},
        {
          default: () => validateNavItems(nav(toRef(props, 'locale'))).map((item) => renderItem(item)),
        },
      );
  },
});

export { AppSidebarNav };
