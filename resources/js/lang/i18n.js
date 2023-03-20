import { createI18n } from 'vue-i18n';
import enUS from "./en-US.json";
import zhCN from "./zh-CN.json";

export default createI18n({
  legacy: true,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN,
  },
});
