<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="locale-dropdown">
      <CIcon :icon='selectedFlag' size="xl"/>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownItem v-for="locale in locales" :key="locale.name" @click="setLocale(locale.value)">
        <CIcon :icon="locale.flag"/>
        {{ locale.name }}
        <span v-if="selectedFlag === locale.flag">
          <CIcon icon="cil-check-alt"/>
        </span>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import { computed } from "vue";
import { mapGetters, useStore } from "vuex";
import $ from 'jquery';
import moment from "moment";
import { EMITTERS } from "../utils/constants";

export default {
  name: 'AppHeaderLocaleDropdown',
  setup() {
    const store = useStore();
    return {
      lang: computed(() => store.state.localization.lang)
    };
  },
  data() {
    return {
      name: this.title,
      selectedFlag: 'cif-us',
      locales: [
        {
          flag: 'cif-cn',
          name: '中文',
          value: 'zh-CN',
        },
        {
          flag: 'cif-us',
          name: 'English',
          value: 'en-US',
        },
        {
          flag: 'cif-ru',
          name: 'Русский',
          value: 'ru-RU',
        },
      ],
      changeSuccessToast: {
        message: this.$t('messages.localeChanged'),
        type: 'success',
        position: 'bottom-left',
      },
    };
  },
  computed: {
    ...mapGetters([
      'localization/lang'
    ]),
  },
  mounted() {
    this.initLocale();
  },
  inject: ['showToast'],
  methods: {
    initLocale() {
      this.$i18n.locale = this.lang;
      this.changeFlag();
      $('html').attr('lang', this.lang);
      moment.locale(this.lang);
    },
    setLocale(locale) {
      console.log(locale);
      this.$i18n.locale = locale;
      this.$store.dispatch("localization/setLang", locale);
      $('html').attr('lang', locale);
      moment.locale(this.lang);
      this.changeFlag();
      this.emitter.emit(EMITTERS.SET_CALENDAR_LOCALE);
      this.showToast(this.changeSuccessToast);
    },
    changeFlag() {
      let locale = this.locales.find(e => e.value === this.lang);
      this.selectedFlag = locale ? locale.flag : 'cif-us';
      console.log('FLAG', this.selectedFlag);
    },
  },
};
</script>

<style lang="scss" scoped>
.locale-dropdown {
  &:after {
    margin-left: 0.5rem !important;
    padding-bottom: 0.2rem;
  }
}

.dropdown-item {
  cursor: pointer;
}
</style>
