(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_tenants_users_ViewUser_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/EditUser.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/EditUser.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vuelidate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vuelidate/core */ "./node_modules/@vuelidate/core/dist/index.esm.js");
/* harmony import */ var _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vuelidate/validators */ "./node_modules/@vuelidate/validators/dist/index.esm.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/vue-loading.min.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/enums */ "./resources/js/utils/enums.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/constants */ "./resources/js/utils/constants.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "EditUser",
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2___default())
  },
  props: {
    showUpdateModal: {
      required: true,
      type: Boolean,
      "default": false
    }
  },
  setup: function setup() {
    return {
      v$: (0,_vuelidate_core__WEBPACK_IMPORTED_MODULE_1__["default"])()
    };
  },
  validations: function validations() {
    return {
      user: {
        first_name: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
        },
        last_name: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
        },
        email: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required,
          email: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.email
        },
        gender: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
        },
        address_one: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
        },
        address_two: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
        } // country: { required },
        // state: { required },
        // city: { required },
        // zip: { required },

      }
    };
  },
  computed: {
    isDev: function isDev() {
      return "development" === 'development';
    }
  },
  data: function data() {
    return {
      isLoading: false,
      errorMessage: "",
      countries: [],
      state: [],
      user: {},
      userDefaults: {},
      updateSuccessToast: {
        message: this.$t('messages.userUpdated'),
        type: "success",
        duration: 10000,
        dismissible: true,
        queue: false,
        position: "top-right"
      }
    };
  },
  created: function created() {
    this.getUser();
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    getUser: function getUser() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.isLoading = true;
                _context.next = 3;
                return _this.fetcher("/api/users/".concat(_this.$route.params.id), _utils_enums__WEBPACK_IMPORTED_MODULE_3__.REQUEST_METHOD.GET).then(function (response) {
                  _this.user = response.data.data.user;
                  _this.userDefaults = Object.assign({}, _this.user);
                  _this.isLoading = false;
                })["catch"](function (error) {
                  _this.isLoading = false;

                  _this.catcher(error);
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    updateUser: function updateUser() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var isFormCorrect;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.v$.$validate();

              case 2:
                isFormCorrect = _context2.sent;

                if (isFormCorrect) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return");

              case 5:
                _this2.isLoading = true;
                _context2.next = 8;
                return _this2.fetcher("/api/users/".concat(_this2.$route.params.id), _utils_enums__WEBPACK_IMPORTED_MODULE_3__.REQUEST_METHOD.PUT, _this2.user).then(function (response) {
                  _this2.isLoading = false;
                  _this2.showCreateCard = false;

                  _this2.showToast(_this2.updateSuccessToast);

                  _this2.closeModal(true);
                })["catch"](function (error) {
                  _this2.isLoading = false;

                  _this2.catcher(error);
                });

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    onFileChange: function onFileChange(e) {
      var file = e.target.files[0];
      this.user.avatar = file;
      console.log(file);
    },
    resetForm: function resetForm() {
      this.user = this.userDefaults;
      this.v$.$reset();
    },
    closeModal: function closeModal(e) {
      var reload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.resetForm();
      this.emitter.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_4__.EMITTERS.CLOSE_MODAL, reload);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-loading-overlay */ "./node_modules/vue-loading-overlay/dist/vue-loading.min.js");
/* harmony import */ var vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var qrcode_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qrcode.vue */ "./node_modules/qrcode.vue/dist/qrcode.vue.browser.js");
/* harmony import */ var qrcode_vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qrcode_vue__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/enums */ "./resources/js/utils/enums.js");
/* harmony import */ var _utils_app_permissions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/app.permissions */ "./resources/js/utils/app.permissions.js");
/* harmony import */ var _assets_images_avatar_default_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../assets/images/avatar-default.png */ "./resources/js/assets/images/avatar-default.png");
/* harmony import */ var _EditUser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EditUser */ "./resources/js/views/tenants/users/EditUser.vue");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/constants */ "./resources/js/utils/constants.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ViewUser",
  components: {
    EditUser: _EditUser__WEBPACK_IMPORTED_MODULE_7__["default"],
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2___default()),
    QrcodeVue: (qrcode_vue__WEBPACK_IMPORTED_MODULE_3___default())
  },
  data: function data() {
    return {
      isLoadingUser: false,
      defaultAvatarURL: _assets_images_avatar_default_png__WEBPACK_IMPORTED_MODULE_6__["default"],
      user: {},
      noPermissionsToast: {
        message: this.$t('messages.noPermission'),
        type: 'error'
      },
      notFoundToast: {
        message: this.$t('messages.noUserFound'),
        type: 'error'
      },
      showUpdateModal: false
    };
  },
  created: function created() {
    var _this = this;

    if (this.canViewUser) {
      this.getUser();
    } else {
      this.showToast(this.noPermissionsToast);
      this.$router.push('/users');
    }

    this.emitter.on(_utils_constants__WEBPACK_IMPORTED_MODULE_8__.EMITTERS.CLOSE_MODAL, function (reload) {
      _this.onClose();

      if (reload) {
        _this.getUser();
      }
    });
  },
  computed: {
    canViewUser: function canViewUser() {
      return this.hasValidAccess(_utils_app_permissions__WEBPACK_IMPORTED_MODULE_5__.PERMISSIONS.VIEW_USER);
    },
    canEditUser: function canEditUser() {
      return this.hasValidAccess(_utils_app_permissions__WEBPACK_IMPORTED_MODULE_5__.PERMISSIONS.EDIT_USER);
    },
    userCreatedAt: function userCreatedAt() {
      return moment__WEBPACK_IMPORTED_MODULE_1___default()(this.user.created_at).format("MMMM Do YYYY");
    },
    jwtPayload: function jwtPayload() {
      return this.$store.state.auth.jwtPayload;
    }
  },
  inject: ['fetcher', 'catcher', 'showToast', 'hasValidAccess'],
  methods: {
    getUser: function getUser() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.isLoadingUser = true;
                _context.next = 3;
                return _this2.fetcher("/api/users/".concat(_this2.$route.params.id), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.GET).then(function (response) {
                  _this2.user = response.data.data.user;
                  _this2.isLoadingUser = false;
                })["catch"](function (error) {
                  _this2.isLoadingUser = false;

                  if (error.response.status === 404) {
                    _this2.showToast(_this2.notFoundToast);

                    _this2.$router.push('/users');

                    return;
                  }

                  _this2.catcher(error);
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    openModal: function openModal() {
      this.showUpdateModal = true;
    },
    onClose: function onClose() {
      this.showUpdateModal = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/EditUser.vue?vue&type=template&id=9259cc7e":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/EditUser.vue?vue&type=template&id=9259cc7e ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "mb-3"
};
var _hoisted_2 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_3 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_4 = {
  "class": "mb-3"
};
var _hoisted_5 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_6 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_7 = {
  "class": "mb-3"
};
var _hoisted_8 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_9 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_10 = {
  key: 1,
  "class": "text-danger"
};
var _hoisted_11 = {
  "class": "mb-3 ml-3 d-flex flex-row"
};

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "genderMale"
}, "Male", -1
/* HOISTED */
);

var _hoisted_13 = {
  "class": "ml-5"
};

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "genderFemale"
}, "Female", -1
/* HOISTED */
);

var _hoisted_15 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_16 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_17 = {
  "class": "mb-3"
};
var _hoisted_18 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_19 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_20 = {
  "class": "mb-3"
};
var _hoisted_21 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_22 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_23 = {
  "class": "mb-3"
};
var _hoisted_24 = {
  "class": "code w-100",
  rows: "10"
};
var _hoisted_25 = {
  "class": "code w-100",
  rows: "10"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CModalTitle = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalTitle");

  var _component_CModalHeader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalHeader");

  var _component_Loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Loading");

  var _component_CFormLabel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CFormLabel");

  var _component_CFormInput = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CFormInput");

  var _component_CCol = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCol");

  var _component_CRow = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CRow");

  var _component_CForm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CForm");

  var _component_CModalBody = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalBody");

  var _component_CButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CButton");

  var _component_CModalFooter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalFooter");

  var _component_CModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModal");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CModal, {
    size: "lg",
    backdrop: "static",
    visible: $props.showUpdateModal,
    onClose: $options.closeModal
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalHeader, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalTitle, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.editUser')), 1
              /* TEXT */
              )];
            }),
            _: 1
            /* STABLE */

          })];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalBody, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
            active: $data.isLoading,
            "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
              return $data.isLoading = $event;
            }),
            "is-full-page": false
          }, null, 8
          /* PROPS */
          , ["active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CForm, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                    xs: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "firstName"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.firstName')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "firstName",
                        modelValue: $data.user.first_name,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
                          return $data.user.first_name = $event;
                        }),
                        placeholder: "John"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"]), $setup.v$.user.first_name.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [$setup.v$.user.first_name.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_3, " First name field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                    }),
                    _: 1
                    /* STABLE */

                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                    xs: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "lastName"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.lastName')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "lastName",
                        modelValue: $data.user.last_name,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
                          return $data.user.last_name = $event;
                        }),
                        placeholder: "Doe"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"]), $setup.v$.user.last_name.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [$setup.v$.user.last_name.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_6, " Last name field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                    }),
                    _: 1
                    /* STABLE */

                  })];
                }),
                _: 1
                /* STABLE */

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "email"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.email')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "email",
                        type: "email",
                        modelValue: $data.user.email,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
                          return $data.user.email = $event;
                        }),
                        placeholder: "johndoe@mail.com",
                        disabled: ""
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"]), $setup.v$.user.email.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [$setup.v$.user.email.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_9, " Email field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.v$.user.email.email.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_10, " Must be a valid email ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                    }),
                    _: 1
                    /* STABLE */

                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "status"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.selectGender')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                        "class": "form-check-input",
                        type: "radio",
                        id: "genderMale",
                        value: "Male",
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
                          return $data.user.gender = $event;
                        })
                      }, null, 512
                      /* NEED_PATCH */
                      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.user.gender]]), _hoisted_12]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                        "class": "form-check-input",
                        type: "radio",
                        id: "genderFemale",
                        value: "Female",
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
                          return $data.user.gender = $event;
                        })
                      }, null, 512
                      /* NEED_PATCH */
                      ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.user.gender]]), _hoisted_14]), $setup.v$.user.gender.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [$setup.v$.user.gender.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_16, " Gender field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                    }),
                    _: 1
                    /* STABLE */

                  })];
                }),
                _: 1
                /* STABLE */

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                    md: 6
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "addressOne"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.addressOne')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "addressOne",
                        modelValue: $data.user.address_one,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
                          return $data.user.address_one = $event;
                        }),
                        placeholder: "Line 1"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"]), $setup.v$.user.address_one.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [$setup.v$.user.address_one.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_19, " Address Line 1 field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "addressTwo"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.addressTwo')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "addressTwo",
                        modelValue: $data.user.address_two,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
                          return $data.user.address_two = $event;
                        }),
                        placeholder: "Line 2"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"]), $setup.v$.user.address_two.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [$setup.v$.user.address_two.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_22, " Address Line 2 field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                    }),
                    _: 1
                    /* STABLE */

                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                    md: 6
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "avatar"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.avatar')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "avatar",
                        type: "file",
                        onChange: $options.onFileChange,
                        accept: "image/*",
                        placeholder: "Choose a file"
                      }, null, 8
                      /* PROPS */
                      , ["onChange"])])];
                    }),
                    _: 1
                    /* STABLE */

                  })];
                }),
                _: 1
                /* STABLE */

              })];
            }),
            _: 1
            /* STABLE */

          }), $options.isDev ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CRow, {
            key: 0
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user), 1
                  /* TEXT */
                  )];
                }),
                _: 1
                /* STABLE */

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.v$), 1
                  /* TEXT */
                  )];
                }),
                _: 1
                /* STABLE */

              })];
            }),
            _: 1
            /* STABLE */

          })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalFooter, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, {
            size: "sm",
            color: "light",
            onClick: $options.closeModal
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.cancel')), 1
              /* TEXT */
              )];
            }),
            _: 1
            /* STABLE */

          }, 8
          /* PROPS */
          , ["onClick"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, {
            size: "sm",
            "class": "float-right",
            type: "submit",
            color: "primary",
            onClick: $options.updateUser
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.update')), 1
              /* TEXT */
              )];
            }),
            _: 1
            /* STABLE */

          }, 8
          /* PROPS */
          , ["onClick"])];
        }),
        _: 1
        /* STABLE */

      })];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["visible", "onClose"]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=template&id=0dbe1b5c&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=template&id=0dbe1b5c&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var _withScopeId = function _withScopeId(n) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId)("data-v-0dbe1b5c"), n = n(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId)(), n;
};

var _hoisted_1 = {
  "class": "profile-img mb-4 mx-auto"
};
var _hoisted_2 = ["src", "alt"];
var _hoisted_3 = {
  "class": "text-center"
};
var _hoisted_4 = {
  "class": "text-center text-medium-emphasis mb-2"
};
var _hoisted_5 = {
  "class": "text-center"
};
var _hoisted_6 = {
  key: 1
};
var _hoisted_7 = {
  "class": "card-title mb-0"
};

var _hoisted_8 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "small text-medium-emphasis"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_9 = {
  "class": "card"
};
var _hoisted_10 = {
  "class": "card-body"
};
var _hoisted_11 = {
  "class": "mb-0"
};

var _hoisted_12 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_13 = {
  "class": "mb-0"
};

var _hoisted_14 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_15 = {
  "class": "mb-0"
};
var _hoisted_16 = {
  key: 0
};
var _hoisted_17 = {
  key: 1,
  "class": "text-secondary"
};

var _hoisted_18 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_19 = {
  "class": "mb-0"
};
var _hoisted_20 = {
  key: 0
};
var _hoisted_21 = {
  key: 1,
  "class": "text-secondary"
};

var _hoisted_22 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_23 = {
  "class": "mb-0"
};
var _hoisted_24 = {
  key: 0
};
var _hoisted_25 = {
  key: 1,
  "class": "text-secondary"
};

var _hoisted_26 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_27 = {
  "class": "mb-0"
};
var _hoisted_28 = {
  key: 0
};
var _hoisted_29 = {
  key: 1,
  "class": "text-secondary"
};

var _hoisted_30 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_31 = {
  "class": "mb-0"
};
var _hoisted_32 = {
  key: 0
};
var _hoisted_33 = {
  key: 1,
  "class": "text-secondary"
};

var _hoisted_34 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_35 = {
  "class": "mb-0"
};
var _hoisted_36 = {
  key: 0
};
var _hoisted_37 = {
  key: 1,
  "class": "text-secondary"
};

var _hoisted_38 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
  /* HOISTED */
  );
});

var _hoisted_39 = {
  "class": "mb-0"
};
var _hoisted_40 = {
  key: 0
};
var _hoisted_41 = {
  key: 1,
  "class": "text-secondary"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_EditUser = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("EditUser");

  var _component_Loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Loading");

  var _component_CBadge = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CBadge");

  var _component_CCardBody = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCardBody");

  var _component_CCard = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCard");

  var _component_CCol = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCol");

  var _component_CRow = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CRow");

  var _component_qrcode_vue = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("qrcode-vue");

  var _component_CIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CIcon");

  var _component_CButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CButton");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [$options.canEditUser ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_EditUser, {
    key: 0,
    showUpdateModal: $data.showUpdateModal
  }, null, 8
  /* PROPS */
  , ["showUpdateModal"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
        md: 3
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, {
                    "class": "mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardBody, null, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
                            active: $data.isLoadingUser,
                            "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
                              return $data.isLoadingUser = $event;
                            }),
                            "is-full-page": false
                          }, null, 8
                          /* PROPS */
                          , ["active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
                            "class": "profile-img rounded-circle",
                            src: $data.user.avatar_url ? $data.user.avatar_url : $data.defaultAvatarURL,
                            alt: $data.user.first_name
                          }, null, 8
                          /* PROPS */
                          , _hoisted_2)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.first_name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.last_name), 1
                          /* TEXT */
                          ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.email), 1
                          /* TEXT */
                          ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.user.roles, function (role) {
                            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CBadge, {
                              color: "primary"
                            }, {
                              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(role.title), 1
                                /* TEXT */
                                )];
                              }),
                              _: 2
                              /* DYNAMIC */

                            }, 1024
                            /* DYNAMIC_SLOTS */
                            );
                          }), 256
                          /* UNKEYED_FRAGMENT */
                          ))])];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  })];
                }),
                _: 1
                /* STABLE */

              })];
            }),
            _: 1
            /* STABLE */

          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [$data.user.login_code ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CCol, {
                key: 0
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardBody, null, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
                            active: $data.isLoadingUser,
                            "onUpdate:active": _cache[1] || (_cache[1] = function ($event) {
                              return $data.isLoadingUser = $event;
                            }),
                            "is-full-page": false
                          }, null, 8
                          /* PROPS */
                          , ["active"]), !$data.isLoadingUser && $data.user.login_code ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_qrcode_vue, {
                            key: 0,
                            value: 'http://unilivin.fclcloud.com/mobileapps/' + $data.user.tenant_id + '-' + $data.user.login_code,
                            "class": "w-100",
                            size: "300",
                            level: "H"
                          }, null, 8
                          /* PROPS */
                          , ["value"])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.loginCOdeExpired')), 1
                          /* TEXT */
                          ))];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  })];
                }),
                _: 1
                /* STABLE */

              })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
            }),
            _: 1
            /* STABLE */

          })];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
        md: 9
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, {
            "class": "mb-4"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardBody, {
                "class": "tenant-card-body"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
                    active: $data.isLoadingUser,
                    "onUpdate:active": _cache[2] || (_cache[2] = function ($event) {
                      return $data.isLoadingUser = $event;
                    }),
                    "is-full-page": false
                  }, null, 8
                  /* PROPS */
                  , ["active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, {
                    "class": "mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.personalDetails')), 1
                          /* TEXT */
                          ), _hoisted_8];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [$options.canEditUser ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CButton, {
                            key: 0,
                            color: "primary",
                            "class": "float-end",
                            size: "sm",
                            onClick: $options.openModal
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                icon: "cilPencil"
                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.edit')), 1
                              /* TEXT */
                              )];
                            }),
                            _: 1
                            /* STABLE */

                          }, 8
                          /* PROPS */
                          , ["onClick"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 3
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.fullName')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.first_name) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.last_name), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 3
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.email')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.email), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 3
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.gender')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [$data.user.gender ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.gender), 1
                          /* TEXT */
                          )) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.notSpecified')), 1
                          /* TEXT */
                          ))];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 3
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.mobile')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [$data.user.mobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.mobile), 1
                          /* TEXT */
                          )) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.notSpecified')), 1
                          /* TEXT */
                          ))];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 3
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.address')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [$data.user.address_one || $data.user.address_two ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.address_one) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.address_two), 1
                          /* TEXT */
                          )) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.notSpecified')), 1
                          /* TEXT */
                          ))];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 3
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.country')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [$data.user.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.country), 1
                          /* TEXT */
                          )) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.notSpecified')), 1
                          /* TEXT */
                          ))];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 3
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.state')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [$data.user.state ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.state), 1
                          /* TEXT */
                          )) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.notSpecified')), 1
                          /* TEXT */
                          ))];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 3
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.city')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [$data.user.city ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.city), 1
                          /* TEXT */
                          )) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.notSpecified')), 1
                          /* TEXT */
                          ))];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 3
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.zip')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [$data.user.zip ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.user.zip), 1
                          /* TEXT */
                          )) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.notSpecified')), 1
                          /* TEXT */
                          ))];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  })])])];
                }),
                _: 1
                /* STABLE */

              })];
            }),
            _: 1
            /* STABLE */

          })];
        }),
        _: 1
        /* STABLE */

      })];
    }),
    _: 1
    /* STABLE */

  })], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".profile-img[data-v-0dbe1b5c] {\n  width: 150px;\n  height: 150px;\n}\n.profile-img img[data-v-0dbe1b5c] {\n  -o-object-fit: cover;\n     object-fit: cover;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/qrcode.vue/dist/qrcode.vue.browser.js":
/*!************************************************************!*\
  !*** ./node_modules/qrcode.vue/dist/qrcode.vue.browser.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * qrcode.vue v3.3.3
 * A Vue.js component to generate QRCode.
 * © 2017-2021 @scopewu(https://github.com/scopewu)
 * MIT License.
 */
(function (global, factory) {
     true ? module.exports = factory(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js")) :
    0;
})(this, (function (vue) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var mode$1 = {
    	MODE_NUMBER :		1 << 0,
    	MODE_ALPHA_NUM : 	1 << 1,
    	MODE_8BIT_BYTE : 	1 << 2,
    	MODE_KANJI :		1 << 3
    };

    var mode = mode$1;

    function QR8bitByte(data) {
    	this.mode = mode.MODE_8BIT_BYTE;
    	this.data = data;
    }

    QR8bitByte.prototype = {

    	getLength : function(buffer) {
    		return this.data.length;
    	},
    	
    	write : function(buffer) {
    		for (var i = 0; i < this.data.length; i++) {
    			// not JIS ...
    			buffer.put(this.data.charCodeAt(i), 8);
    		}
    	}
    };

    var _8BitByte = QR8bitByte;

    var ErrorCorrectLevel = {
    	L : 1,
    	M : 0,
    	Q : 3,
    	H : 2
    };

    // ErrorCorrectLevel
    var ECL = ErrorCorrectLevel;

    function QRRSBlock(totalCount, dataCount) {
    	this.totalCount = totalCount;
    	this.dataCount  = dataCount;
    }

    QRRSBlock.RS_BLOCK_TABLE = [

    	// L
    	// M
    	// Q
    	// H

    	// 1
    	[1, 26, 19],
    	[1, 26, 16],
    	[1, 26, 13],
    	[1, 26, 9],
    	
    	// 2
    	[1, 44, 34],
    	[1, 44, 28],
    	[1, 44, 22],
    	[1, 44, 16],

    	// 3
    	[1, 70, 55],
    	[1, 70, 44],
    	[2, 35, 17],
    	[2, 35, 13],

    	// 4		
    	[1, 100, 80],
    	[2, 50, 32],
    	[2, 50, 24],
    	[4, 25, 9],
    	
    	// 5
    	[1, 134, 108],
    	[2, 67, 43],
    	[2, 33, 15, 2, 34, 16],
    	[2, 33, 11, 2, 34, 12],
    	
    	// 6
    	[2, 86, 68],
    	[4, 43, 27],
    	[4, 43, 19],
    	[4, 43, 15],
    	
    	// 7		
    	[2, 98, 78],
    	[4, 49, 31],
    	[2, 32, 14, 4, 33, 15],
    	[4, 39, 13, 1, 40, 14],
    	
    	// 8
    	[2, 121, 97],
    	[2, 60, 38, 2, 61, 39],
    	[4, 40, 18, 2, 41, 19],
    	[4, 40, 14, 2, 41, 15],
    	
    	// 9
    	[2, 146, 116],
    	[3, 58, 36, 2, 59, 37],
    	[4, 36, 16, 4, 37, 17],
    	[4, 36, 12, 4, 37, 13],
    	
    	// 10		
    	[2, 86, 68, 2, 87, 69],
    	[4, 69, 43, 1, 70, 44],
    	[6, 43, 19, 2, 44, 20],
    	[6, 43, 15, 2, 44, 16],

    	// 11
    	[4, 101, 81],
    	[1, 80, 50, 4, 81, 51],
    	[4, 50, 22, 4, 51, 23],
    	[3, 36, 12, 8, 37, 13],

    	// 12
    	[2, 116, 92, 2, 117, 93],
    	[6, 58, 36, 2, 59, 37],
    	[4, 46, 20, 6, 47, 21],
    	[7, 42, 14, 4, 43, 15],

    	// 13
    	[4, 133, 107],
    	[8, 59, 37, 1, 60, 38],
    	[8, 44, 20, 4, 45, 21],
    	[12, 33, 11, 4, 34, 12],

    	// 14
    	[3, 145, 115, 1, 146, 116],
    	[4, 64, 40, 5, 65, 41],
    	[11, 36, 16, 5, 37, 17],
    	[11, 36, 12, 5, 37, 13],

    	// 15
    	[5, 109, 87, 1, 110, 88],
    	[5, 65, 41, 5, 66, 42],
    	[5, 54, 24, 7, 55, 25],
    	[11, 36, 12],

    	// 16
    	[5, 122, 98, 1, 123, 99],
    	[7, 73, 45, 3, 74, 46],
    	[15, 43, 19, 2, 44, 20],
    	[3, 45, 15, 13, 46, 16],

    	// 17
    	[1, 135, 107, 5, 136, 108],
    	[10, 74, 46, 1, 75, 47],
    	[1, 50, 22, 15, 51, 23],
    	[2, 42, 14, 17, 43, 15],

    	// 18
    	[5, 150, 120, 1, 151, 121],
    	[9, 69, 43, 4, 70, 44],
    	[17, 50, 22, 1, 51, 23],
    	[2, 42, 14, 19, 43, 15],

    	// 19
    	[3, 141, 113, 4, 142, 114],
    	[3, 70, 44, 11, 71, 45],
    	[17, 47, 21, 4, 48, 22],
    	[9, 39, 13, 16, 40, 14],

    	// 20
    	[3, 135, 107, 5, 136, 108],
    	[3, 67, 41, 13, 68, 42],
    	[15, 54, 24, 5, 55, 25],
    	[15, 43, 15, 10, 44, 16],

    	// 21
    	[4, 144, 116, 4, 145, 117],
    	[17, 68, 42],
    	[17, 50, 22, 6, 51, 23],
    	[19, 46, 16, 6, 47, 17],

    	// 22
    	[2, 139, 111, 7, 140, 112],
    	[17, 74, 46],
    	[7, 54, 24, 16, 55, 25],
    	[34, 37, 13],

    	// 23
    	[4, 151, 121, 5, 152, 122],
    	[4, 75, 47, 14, 76, 48],
    	[11, 54, 24, 14, 55, 25],
    	[16, 45, 15, 14, 46, 16],

    	// 24
    	[6, 147, 117, 4, 148, 118],
    	[6, 73, 45, 14, 74, 46],
    	[11, 54, 24, 16, 55, 25],
    	[30, 46, 16, 2, 47, 17],

    	// 25
    	[8, 132, 106, 4, 133, 107],
    	[8, 75, 47, 13, 76, 48],
    	[7, 54, 24, 22, 55, 25],
    	[22, 45, 15, 13, 46, 16],

    	// 26
    	[10, 142, 114, 2, 143, 115],
    	[19, 74, 46, 4, 75, 47],
    	[28, 50, 22, 6, 51, 23],
    	[33, 46, 16, 4, 47, 17],

    	// 27
    	[8, 152, 122, 4, 153, 123],
    	[22, 73, 45, 3, 74, 46],
    	[8, 53, 23, 26, 54, 24],
    	[12, 45, 15, 28, 46, 16],

    	// 28
    	[3, 147, 117, 10, 148, 118],
    	[3, 73, 45, 23, 74, 46],
    	[4, 54, 24, 31, 55, 25],
    	[11, 45, 15, 31, 46, 16],

    	// 29
    	[7, 146, 116, 7, 147, 117],
    	[21, 73, 45, 7, 74, 46],
    	[1, 53, 23, 37, 54, 24],
    	[19, 45, 15, 26, 46, 16],

    	// 30
    	[5, 145, 115, 10, 146, 116],
    	[19, 75, 47, 10, 76, 48],
    	[15, 54, 24, 25, 55, 25],
    	[23, 45, 15, 25, 46, 16],

    	// 31
    	[13, 145, 115, 3, 146, 116],
    	[2, 74, 46, 29, 75, 47],
    	[42, 54, 24, 1, 55, 25],
    	[23, 45, 15, 28, 46, 16],

    	// 32
    	[17, 145, 115],
    	[10, 74, 46, 23, 75, 47],
    	[10, 54, 24, 35, 55, 25],
    	[19, 45, 15, 35, 46, 16],

    	// 33
    	[17, 145, 115, 1, 146, 116],
    	[14, 74, 46, 21, 75, 47],
    	[29, 54, 24, 19, 55, 25],
    	[11, 45, 15, 46, 46, 16],

    	// 34
    	[13, 145, 115, 6, 146, 116],
    	[14, 74, 46, 23, 75, 47],
    	[44, 54, 24, 7, 55, 25],
    	[59, 46, 16, 1, 47, 17],

    	// 35
    	[12, 151, 121, 7, 152, 122],
    	[12, 75, 47, 26, 76, 48],
    	[39, 54, 24, 14, 55, 25],
    	[22, 45, 15, 41, 46, 16],

    	// 36
    	[6, 151, 121, 14, 152, 122],
    	[6, 75, 47, 34, 76, 48],
    	[46, 54, 24, 10, 55, 25],
    	[2, 45, 15, 64, 46, 16],

    	// 37
    	[17, 152, 122, 4, 153, 123],
    	[29, 74, 46, 14, 75, 47],
    	[49, 54, 24, 10, 55, 25],
    	[24, 45, 15, 46, 46, 16],

    	// 38
    	[4, 152, 122, 18, 153, 123],
    	[13, 74, 46, 32, 75, 47],
    	[48, 54, 24, 14, 55, 25],
    	[42, 45, 15, 32, 46, 16],

    	// 39
    	[20, 147, 117, 4, 148, 118],
    	[40, 75, 47, 7, 76, 48],
    	[43, 54, 24, 22, 55, 25],
    	[10, 45, 15, 67, 46, 16],

    	// 40
    	[19, 148, 118, 6, 149, 119],
    	[18, 75, 47, 31, 76, 48],
    	[34, 54, 24, 34, 55, 25],
    	[20, 45, 15, 61, 46, 16]
    ];

    QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
    	
    	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
    	
    	if (rsBlock == undefined) {
    		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    	}

    	var length = rsBlock.length / 3;
    	
    	var list = new Array();
    	
    	for (var i = 0; i < length; i++) {

    		var count = rsBlock[i * 3 + 0];
    		var totalCount = rsBlock[i * 3 + 1];
    		var dataCount  = rsBlock[i * 3 + 2];

    		for (var j = 0; j < count; j++) {
    			list.push(new QRRSBlock(totalCount, dataCount) );	
    		}
    	}
    	
    	return list;
    };

    QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

    	switch(errorCorrectLevel) {
    	case ECL.L :
    		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
    	case ECL.M :
    		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
    	case ECL.Q :
    		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
    	case ECL.H :
    		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
    	default :
    		return undefined;
    	}
    };

    var RSBlock$1 = QRRSBlock;

    function QRBitBuffer() {
    	this.buffer = new Array();
    	this.length = 0;
    }

    QRBitBuffer.prototype = {

    	get : function(index) {
    		var bufIndex = Math.floor(index / 8);
    		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    	},
    	
    	put : function(num, length) {
    		for (var i = 0; i < length; i++) {
    			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
    		}
    	},
    	
    	getLengthInBits : function() {
    		return this.length;
    	},
    	
    	putBit : function(bit) {
    	
    		var bufIndex = Math.floor(this.length / 8);
    		if (this.buffer.length <= bufIndex) {
    			this.buffer.push(0);
    		}
    	
    		if (bit) {
    			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
    		}
    	
    		this.length++;
    	}
    };

    var BitBuffer$1 = QRBitBuffer;

    var QRMath = {

    	glog : function(n) {
    	
    		if (n < 1) {
    			throw new Error("glog(" + n + ")");
    		}
    		
    		return QRMath.LOG_TABLE[n];
    	},
    	
    	gexp : function(n) {
    	
    		while (n < 0) {
    			n += 255;
    		}
    	
    		while (n >= 256) {
    			n -= 255;
    		}
    	
    		return QRMath.EXP_TABLE[n];
    	},
    	
    	EXP_TABLE : new Array(256),
    	
    	LOG_TABLE : new Array(256)

    };
    	
    for (var i = 0; i < 8; i++) {
    	QRMath.EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i++) {
    	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
    		^ QRMath.EXP_TABLE[i - 5]
    		^ QRMath.EXP_TABLE[i - 6]
    		^ QRMath.EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i++) {
    	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
    }

    var math$2 = QRMath;

    var math$1 = math$2;

    function QRPolynomial(num, shift) {

    	if (num.length == undefined) {
    		throw new Error(num.length + "/" + shift);
    	}

    	var offset = 0;

    	while (offset < num.length && num[offset] == 0) {
    		offset++;
    	}

    	this.num = new Array(num.length - offset + shift);
    	for (var i = 0; i < num.length - offset; i++) {
    		this.num[i] = num[i + offset];
    	}
    }

    QRPolynomial.prototype = {

    	get : function(index) {
    		return this.num[index];
    	},
    	
    	getLength : function() {
    		return this.num.length;
    	},
    	
    	multiply : function(e) {
    	
    		var num = new Array(this.getLength() + e.getLength() - 1);
    	
    		for (var i = 0; i < this.getLength(); i++) {
    			for (var j = 0; j < e.getLength(); j++) {
    				num[i + j] ^= math$1.gexp(math$1.glog(this.get(i) ) + math$1.glog(e.get(j) ) );
    			}
    		}
    	
    		return new QRPolynomial(num, 0);
    	},
    	
    	mod : function(e) {
    	
    		if (this.getLength() - e.getLength() < 0) {
    			return this;
    		}
    	
    		var ratio = math$1.glog(this.get(0) ) - math$1.glog(e.get(0) );
    	
    		var num = new Array(this.getLength() );
    		
    		for (var i = 0; i < this.getLength(); i++) {
    			num[i] = this.get(i);
    		}
    		
    		for (var i = 0; i < e.getLength(); i++) {
    			num[i] ^= math$1.gexp(math$1.glog(e.get(i) ) + ratio);
    		}
    	
    		// recursive call
    		return new QRPolynomial(num, 0).mod(e);
    	}
    };

    var Polynomial$2 = QRPolynomial;

    var Mode = mode$1;
    var Polynomial$1 = Polynomial$2;
    var math = math$2;

    var QRMaskPattern = {
    	PATTERN000 : 0,
    	PATTERN001 : 1,
    	PATTERN010 : 2,
    	PATTERN011 : 3,
    	PATTERN100 : 4,
    	PATTERN101 : 5,
    	PATTERN110 : 6,
    	PATTERN111 : 7
    };

    var QRUtil = {

        PATTERN_POSITION_TABLE : [
    	    [],
    	    [6, 18],
    	    [6, 22],
    	    [6, 26],
    	    [6, 30],
    	    [6, 34],
    	    [6, 22, 38],
    	    [6, 24, 42],
    	    [6, 26, 46],
    	    [6, 28, 50],
    	    [6, 30, 54],		
    	    [6, 32, 58],
    	    [6, 34, 62],
    	    [6, 26, 46, 66],
    	    [6, 26, 48, 70],
    	    [6, 26, 50, 74],
    	    [6, 30, 54, 78],
    	    [6, 30, 56, 82],
    	    [6, 30, 58, 86],
    	    [6, 34, 62, 90],
    	    [6, 28, 50, 72, 94],
    	    [6, 26, 50, 74, 98],
    	    [6, 30, 54, 78, 102],
    	    [6, 28, 54, 80, 106],
    	    [6, 32, 58, 84, 110],
    	    [6, 30, 58, 86, 114],
    	    [6, 34, 62, 90, 118],
    	    [6, 26, 50, 74, 98, 122],
    	    [6, 30, 54, 78, 102, 126],
    	    [6, 26, 52, 78, 104, 130],
    	    [6, 30, 56, 82, 108, 134],
    	    [6, 34, 60, 86, 112, 138],
    	    [6, 30, 58, 86, 114, 142],
    	    [6, 34, 62, 90, 118, 146],
    	    [6, 30, 54, 78, 102, 126, 150],
    	    [6, 24, 50, 76, 102, 128, 154],
    	    [6, 28, 54, 80, 106, 132, 158],
    	    [6, 32, 58, 84, 110, 136, 162],
    	    [6, 26, 54, 82, 110, 138, 166],
    	    [6, 30, 58, 86, 114, 142, 170]
        ],

        G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
        G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
        G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)	| (1 << 4) | (1 << 1),

        getBCHTypeInfo : function(data) {
    	    var d = data << 10;
    	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
    		    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) ); 	
    	    }
    	    return ( (data << 10) | d) ^ QRUtil.G15_MASK;
        },

        getBCHTypeNumber : function(data) {
    	    var d = data << 12;
    	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
    		    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) ); 	
    	    }
    	    return (data << 12) | d;
        },

        getBCHDigit : function(data) {

    	    var digit = 0;

    	    while (data != 0) {
    		    digit++;
    		    data >>>= 1;
    	    }

    	    return digit;
        },

        getPatternPosition : function(typeNumber) {
    	    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
        },

        getMask : function(maskPattern, i, j) {
    	    
    	    switch (maskPattern) {
    		    
    	    case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
    	    case QRMaskPattern.PATTERN001 : return i % 2 == 0;
    	    case QRMaskPattern.PATTERN010 : return j % 3 == 0;
    	    case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
    	    case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
    	    case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
    	    case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
    	    case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;

    	    default :
    		    throw new Error("bad maskPattern:" + maskPattern);
    	    }
        },

        getErrorCorrectPolynomial : function(errorCorrectLength) {

    	    var a = new Polynomial$1([1], 0);

    	    for (var i = 0; i < errorCorrectLength; i++) {
    		    a = a.multiply(new Polynomial$1([1, math.gexp(i)], 0) );
    	    }

    	    return a;
        },

        getLengthInBits : function(mode, type) {

    	    if (1 <= type && type < 10) {

    		    // 1 - 9

    		    switch(mode) {
    		    case Mode.MODE_NUMBER 	: return 10;
    		    case Mode.MODE_ALPHA_NUM 	: return 9;
    		    case Mode.MODE_8BIT_BYTE	: return 8;
    		    case Mode.MODE_KANJI  	: return 8;
    		    default :
    			    throw new Error("mode:" + mode);
    		    }

    	    } else if (type < 27) {

    		    // 10 - 26

    		    switch(mode) {
    		    case Mode.MODE_NUMBER 	: return 12;
    		    case Mode.MODE_ALPHA_NUM 	: return 11;
    		    case Mode.MODE_8BIT_BYTE	: return 16;
    		    case Mode.MODE_KANJI  	: return 10;
    		    default :
    			    throw new Error("mode:" + mode);
    		    }

    	    } else if (type < 41) {

    		    // 27 - 40

    		    switch(mode) {
    		    case Mode.MODE_NUMBER 	: return 14;
    		    case Mode.MODE_ALPHA_NUM	: return 13;
    		    case Mode.MODE_8BIT_BYTE	: return 16;
    		    case Mode.MODE_KANJI  	: return 12;
    		    default :
    			    throw new Error("mode:" + mode);
    		    }

    	    } else {
    		    throw new Error("type:" + type);
    	    }
        },

        getLostPoint : function(qrCode) {
    	    
    	    var moduleCount = qrCode.getModuleCount();
    	    
    	    var lostPoint = 0;
    	    
    	    // LEVEL1
    	    
    	    for (var row = 0; row < moduleCount; row++) {

    		    for (var col = 0; col < moduleCount; col++) {

    			    var sameCount = 0;
    			    var dark = qrCode.isDark(row, col);

    				for (var r = -1; r <= 1; r++) {

    				    if (row + r < 0 || moduleCount <= row + r) {
    					    continue;
    				    }

    				    for (var c = -1; c <= 1; c++) {

    					    if (col + c < 0 || moduleCount <= col + c) {
    						    continue;
    					    }

    					    if (r == 0 && c == 0) {
    						    continue;
    					    }

    					    if (dark == qrCode.isDark(row + r, col + c) ) {
    						    sameCount++;
    					    }
    				    }
    			    }

    			    if (sameCount > 5) {
    				    lostPoint += (3 + sameCount - 5);
    			    }
    		    }
    	    }

    	    // LEVEL2

    	    for (var row = 0; row < moduleCount - 1; row++) {
    		    for (var col = 0; col < moduleCount - 1; col++) {
    			    var count = 0;
    			    if (qrCode.isDark(row,     col    ) ) count++;
    			    if (qrCode.isDark(row + 1, col    ) ) count++;
    			    if (qrCode.isDark(row,     col + 1) ) count++;
    			    if (qrCode.isDark(row + 1, col + 1) ) count++;
    			    if (count == 0 || count == 4) {
    				    lostPoint += 3;
    			    }
    		    }
    	    }

    	    // LEVEL3

    	    for (var row = 0; row < moduleCount; row++) {
    		    for (var col = 0; col < moduleCount - 6; col++) {
    			    if (qrCode.isDark(row, col)
    					    && !qrCode.isDark(row, col + 1)
    					    &&  qrCode.isDark(row, col + 2)
    					    &&  qrCode.isDark(row, col + 3)
    					    &&  qrCode.isDark(row, col + 4)
    					    && !qrCode.isDark(row, col + 5)
    					    &&  qrCode.isDark(row, col + 6) ) {
    				    lostPoint += 40;
    			    }
    		    }
    	    }

    	    for (var col = 0; col < moduleCount; col++) {
    		    for (var row = 0; row < moduleCount - 6; row++) {
    			    if (qrCode.isDark(row, col)
    					    && !qrCode.isDark(row + 1, col)
    					    &&  qrCode.isDark(row + 2, col)
    					    &&  qrCode.isDark(row + 3, col)
    					    &&  qrCode.isDark(row + 4, col)
    					    && !qrCode.isDark(row + 5, col)
    					    &&  qrCode.isDark(row + 6, col) ) {
    				    lostPoint += 40;
    			    }
    		    }
    	    }

    	    // LEVEL4
    	    
    	    var darkCount = 0;

    	    for (var col = 0; col < moduleCount; col++) {
    		    for (var row = 0; row < moduleCount; row++) {
    			    if (qrCode.isDark(row, col) ) {
    				    darkCount++;
    			    }
    		    }
    	    }
    	    
    	    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    	    lostPoint += ratio * 10;

    	    return lostPoint;		
        }
    };

    var util$1 = QRUtil;

    var BitByte = _8BitByte;
    var RSBlock = RSBlock$1;
    var BitBuffer = BitBuffer$1;
    var util = util$1;
    var Polynomial = Polynomial$2;

    function QRCode$1(typeNumber, errorCorrectLevel) {
    	this.typeNumber = typeNumber;
    	this.errorCorrectLevel = errorCorrectLevel;
    	this.modules = null;
    	this.moduleCount = 0;
    	this.dataCache = null;
    	this.dataList = [];
    }

    // for client side minification
    var proto = QRCode$1.prototype;

    proto.addData = function(data) {
    	var newData = new BitByte(data);
    	this.dataList.push(newData);
    	this.dataCache = null;
    };

    proto.isDark = function(row, col) {
    	if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
    		throw new Error(row + "," + col);
    	}
    	return this.modules[row][col];
    };

    proto.getModuleCount = function() {
    	return this.moduleCount;
    };

    proto.make = function() {
    	// Calculate automatically typeNumber if provided is < 1
    	if (this.typeNumber < 1 ){
    		var typeNumber = 1;
    		for (typeNumber = 1; typeNumber < 40; typeNumber++) {
    			var rsBlocks = RSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

    			var buffer = new BitBuffer();
    			var totalDataCount = 0;
    			for (var i = 0; i < rsBlocks.length; i++) {
    				totalDataCount += rsBlocks[i].dataCount;
    			}

    			for (var i = 0; i < this.dataList.length; i++) {
    				var data = this.dataList[i];
    				buffer.put(data.mode, 4);
    				buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
    				data.write(buffer);
    			}
    			if (buffer.getLengthInBits() <= totalDataCount * 8)
    				break;
    		}
    		this.typeNumber = typeNumber;
    	}
    	this.makeImpl(false, this.getBestMaskPattern() );
    };

    proto.makeImpl = function(test, maskPattern) {
    	
    	this.moduleCount = this.typeNumber * 4 + 17;
    	this.modules = new Array(this.moduleCount);
    	
    	for (var row = 0; row < this.moduleCount; row++) {
    		
    		this.modules[row] = new Array(this.moduleCount);
    		
    		for (var col = 0; col < this.moduleCount; col++) {
    			this.modules[row][col] = null;//(col + row) % 3;
    		}
    	}

    	this.setupPositionProbePattern(0, 0);
    	this.setupPositionProbePattern(this.moduleCount - 7, 0);
    	this.setupPositionProbePattern(0, this.moduleCount - 7);
    	this.setupPositionAdjustPattern();
    	this.setupTimingPattern();
    	this.setupTypeInfo(test, maskPattern);
    	
    	if (this.typeNumber >= 7) {
    		this.setupTypeNumber(test);
    	}

    	if (this.dataCache == null) {
    		this.dataCache = QRCode$1.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    	}

    	this.mapData(this.dataCache, maskPattern);
    };

    proto.setupPositionProbePattern = function(row, col)  {
    	
    	for (var r = -1; r <= 7; r++) {
    		
    		if (row + r <= -1 || this.moduleCount <= row + r) continue;
    		
    		for (var c = -1; c <= 7; c++) {
    			
    			if (col + c <= -1 || this.moduleCount <= col + c) continue;
    			
    			if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
    					|| (0 <= c && c <= 6 && (r == 0 || r == 6) )
    					|| (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
    				this.modules[row + r][col + c] = true;
    			} else {
    				this.modules[row + r][col + c] = false;
    			}
    		}		
    	}		
    };

    proto.getBestMaskPattern = function() {

    	var minLostPoint = 0;
    	var pattern = 0;

    	for (var i = 0; i < 8; i++) {
    		
    		this.makeImpl(true, i);

    		var lostPoint = util.getLostPoint(this);

    		if (i == 0 || minLostPoint >  lostPoint) {
    			minLostPoint = lostPoint;
    			pattern = i;
    		}
    	}

    	return pattern;
    };

    proto.createMovieClip = function(target_mc, instance_name, depth) {

    	var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
    	var cs = 1;

    	this.make();

    	for (var row = 0; row < this.modules.length; row++) {
    		
    		var y = row * cs;
    		
    		for (var col = 0; col < this.modules[row].length; col++) {

    			var x = col * cs;
    			var dark = this.modules[row][col];
    		
    			if (dark) {
    				qr_mc.beginFill(0, 100);
    				qr_mc.moveTo(x, y);
    				qr_mc.lineTo(x + cs, y);
    				qr_mc.lineTo(x + cs, y + cs);
    				qr_mc.lineTo(x, y + cs);
    				qr_mc.endFill();
    			}
    		}
    	}
    	
    	return qr_mc;
    };

    proto.setupTimingPattern = function() {
    	
    	for (var r = 8; r < this.moduleCount - 8; r++) {
    		if (this.modules[r][6] != null) {
    			continue;
    		}
    		this.modules[r][6] = (r % 2 == 0);
    	}

    	for (var c = 8; c < this.moduleCount - 8; c++) {
    		if (this.modules[6][c] != null) {
    			continue;
    		}
    		this.modules[6][c] = (c % 2 == 0);
    	}
    };

    proto.setupPositionAdjustPattern = function() {

    	var pos = util.getPatternPosition(this.typeNumber);
    	
    	for (var i = 0; i < pos.length; i++) {
    	
    		for (var j = 0; j < pos.length; j++) {
    		
    			var row = pos[i];
    			var col = pos[j];
    			
    			if (this.modules[row][col] != null) {
    				continue;
    			}
    			
    			for (var r = -2; r <= 2; r++) {
    			
    				for (var c = -2; c <= 2; c++) {
    				
    					if (r == -2 || r == 2 || c == -2 || c == 2
    							|| (r == 0 && c == 0) ) {
    						this.modules[row + r][col + c] = true;
    					} else {
    						this.modules[row + r][col + c] = false;
    					}
    				}
    			}
    		}
    	}
    };

    proto.setupTypeNumber = function(test) {

    	var bits = util.getBCHTypeNumber(this.typeNumber);

    	for (var i = 0; i < 18; i++) {
    		var mod = (!test && ( (bits >> i) & 1) == 1);
    		this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
    	}

    	for (var i = 0; i < 18; i++) {
    		var mod = (!test && ( (bits >> i) & 1) == 1);
    		this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    	}
    };

    proto.setupTypeInfo = function(test, maskPattern) {

    	var data = (this.errorCorrectLevel << 3) | maskPattern;
    	var bits = util.getBCHTypeInfo(data);

    	// vertical		
    	for (var i = 0; i < 15; i++) {

    		var mod = (!test && ( (bits >> i) & 1) == 1);

    		if (i < 6) {
    			this.modules[i][8] = mod;
    		} else if (i < 8) {
    			this.modules[i + 1][8] = mod;
    		} else {
    			this.modules[this.moduleCount - 15 + i][8] = mod;
    		}
    	}

    	// horizontal
    	for (var i = 0; i < 15; i++) {

    		var mod = (!test && ( (bits >> i) & 1) == 1);
    		
    		if (i < 8) {
    			this.modules[8][this.moduleCount - i - 1] = mod;
    		} else if (i < 9) {
    			this.modules[8][15 - i - 1 + 1] = mod;
    		} else {
    			this.modules[8][15 - i - 1] = mod;
    		}
    	}

    	// fixed module
    	this.modules[this.moduleCount - 8][8] = (!test);
    };

    proto.mapData = function(data, maskPattern) {
    	
    	var inc = -1;
    	var row = this.moduleCount - 1;
    	var bitIndex = 7;
    	var byteIndex = 0;
    	
    	for (var col = this.moduleCount - 1; col > 0; col -= 2) {

    		if (col == 6) col--;

    		while (true) {

    			for (var c = 0; c < 2; c++) {
    				
    				if (this.modules[row][col - c] == null) {
    					
    					var dark = false;

    					if (byteIndex < data.length) {
    						dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
    					}

    					var mask = util.getMask(maskPattern, row, col - c);

    					if (mask) {
    						dark = !dark;
    					}
    					
    					this.modules[row][col - c] = dark;
    					bitIndex--;

    					if (bitIndex == -1) {
    						byteIndex++;
    						bitIndex = 7;
    					}
    				}
    			}
    							
    			row += inc;

    			if (row < 0 || this.moduleCount <= row) {
    				row -= inc;
    				inc = -inc;
    				break;
    			}
    		}
    	}
    };

    QRCode$1.PAD0 = 0xEC;
    QRCode$1.PAD1 = 0x11;

    QRCode$1.createData = function(typeNumber, errorCorrectLevel, dataList) {
    	
    	var rsBlocks = RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
    	
    	var buffer = new BitBuffer();
    	
    	for (var i = 0; i < dataList.length; i++) {
    		var data = dataList[i];
    		buffer.put(data.mode, 4);
    		buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
    		data.write(buffer);
    	}

    	// calc num max data.
    	var totalDataCount = 0;
    	for (var i = 0; i < rsBlocks.length; i++) {
    		totalDataCount += rsBlocks[i].dataCount;
    	}

    	if (buffer.getLengthInBits() > totalDataCount * 8) {
    		throw new Error("code length overflow. ("
    			+ buffer.getLengthInBits()
    			+ ">"
    			+  totalDataCount * 8
    			+ ")");
    	}

    	// end code
    	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
    		buffer.put(0, 4);
    	}

    	// padding
    	while (buffer.getLengthInBits() % 8 != 0) {
    		buffer.putBit(false);
    	}

    	// padding
    	while (true) {
    		
    		if (buffer.getLengthInBits() >= totalDataCount * 8) {
    			break;
    		}
    		buffer.put(QRCode$1.PAD0, 8);
    		
    		if (buffer.getLengthInBits() >= totalDataCount * 8) {
    			break;
    		}
    		buffer.put(QRCode$1.PAD1, 8);
    	}

    	return QRCode$1.createBytes(buffer, rsBlocks);
    };

    QRCode$1.createBytes = function(buffer, rsBlocks) {

    	var offset = 0;
    	
    	var maxDcCount = 0;
    	var maxEcCount = 0;
    	
    	var dcdata = new Array(rsBlocks.length);
    	var ecdata = new Array(rsBlocks.length);
    	
    	for (var r = 0; r < rsBlocks.length; r++) {

    		var dcCount = rsBlocks[r].dataCount;
    		var ecCount = rsBlocks[r].totalCount - dcCount;

    		maxDcCount = Math.max(maxDcCount, dcCount);
    		maxEcCount = Math.max(maxEcCount, ecCount);
    		
    		dcdata[r] = new Array(dcCount);
    		
    		for (var i = 0; i < dcdata[r].length; i++) {
    			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
    		}
    		offset += dcCount;
    		
    		var rsPoly = util.getErrorCorrectPolynomial(ecCount);
    		var rawPoly = new Polynomial(dcdata[r], rsPoly.getLength() - 1);

    		var modPoly = rawPoly.mod(rsPoly);
    		ecdata[r] = new Array(rsPoly.getLength() - 1);
    		for (var i = 0; i < ecdata[r].length; i++) {
                var modIndex = i + modPoly.getLength() - ecdata[r].length;
    			ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
    		}

    	}
    	
    	var totalCodeCount = 0;
    	for (var i = 0; i < rsBlocks.length; i++) {
    		totalCodeCount += rsBlocks[i].totalCount;
    	}

    	var data = new Array(totalCodeCount);
    	var index = 0;

    	for (var i = 0; i < maxDcCount; i++) {
    		for (var r = 0; r < rsBlocks.length; r++) {
    			if (i < dcdata[r].length) {
    				data[index++] = dcdata[r][i];
    			}
    		}
    	}

    	for (var i = 0; i < maxEcCount; i++) {
    		for (var r = 0; r < rsBlocks.length; r++) {
    			if (i < ecdata[r].length) {
    				data[index++] = ecdata[r][i];
    			}
    		}
    	}

    	return data;
    };

    var QRCode_1 = QRCode$1;

    var defaultErrorCorrectLevel = 'H';
    // Thanks the `qrcode.react`
    var SUPPORTS_PATH2D = (function () {
        try {
            new Path2D().addPath(new Path2D());
        }
        catch (e) {
            return false;
        }
        return true;
    })();
    function QRCode(data, level) {
        var errorCorrectLevel = ErrorCorrectLevel[level];
        // We'll use type===-1 to force QRCode to automatically pick the best type
        var qrcode = new QRCode_1(-1, errorCorrectLevel);
        qrcode.addData(toUTF8String(data));
        qrcode.make();
        return qrcode;
    }
    function validErrorCorrectLevel(level) {
        return level in ErrorCorrectLevel;
    }
    /**
     * Encode UTF16 to UTF8.
     * See: http://jonisalonen.com/2012/from-utf-16-to-utf-8-in-javascript/
     * @param str {string}
     * @returns {string}
     */
    function toUTF8String(str) {
        var utf8Str = '';
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode < 0x0080) {
                utf8Str += String.fromCharCode(charCode);
            }
            else if (charCode < 0x0800) {
                utf8Str += String.fromCharCode(0xc0 | (charCode >> 6));
                utf8Str += String.fromCharCode(0x80 | (charCode & 0x3f));
            }
            else if (charCode < 0xd800 || charCode >= 0xe000) {
                utf8Str += String.fromCharCode(0xe0 | (charCode >> 12));
                utf8Str += String.fromCharCode(0x80 | ((charCode >> 6) & 0x3f));
                utf8Str += String.fromCharCode(0x80 | (charCode & 0x3f));
            }
            else {
                // surrogate pair
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charCode =
                    0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
                utf8Str += String.fromCharCode(0xf0 | (charCode >> 18));
                utf8Str += String.fromCharCode(0x80 | ((charCode >> 12) & 0x3f));
                utf8Str += String.fromCharCode(0x80 | ((charCode >> 6) & 0x3f));
                utf8Str += String.fromCharCode(0x80 | (charCode & 0x3f));
            }
        }
        return utf8Str;
    }
    function generatePath(modules, margin) {
        if (margin === void 0) { margin = 0; }
        var ops = [];
        modules.forEach(function (row, y) {
            var start = null;
            row.forEach(function (cell, x) {
                if (!cell && start !== null) {
                    // M0 0h7v1H0z injects the space with the move and drops the comma,
                    // saving a char per operation
                    ops.push("M" + (start + margin) + " " + (y + margin) + "h" + (x - start) + "v1H" + (start + margin) + "z");
                    start = null;
                    return;
                }
                // end of row, clean up or skip
                if (x === row.length - 1) {
                    if (!cell) {
                        // We would have closed the op above already so this can only mean
                        // 2+ light modules in a row.
                        return;
                    }
                    if (start === null) {
                        // Just a single dark module.
                        ops.push("M" + (x + margin) + "," + (y + margin) + " h1v1H" + (x + margin) + "z");
                    }
                    else {
                        // Otherwise finish the current line.
                        ops.push("M" + (start + margin) + "," + (y + margin) + " h" + (x + 1 - start) + "v1H" + (start + margin) + "z");
                    }
                    return;
                }
                if (cell && start === null) {
                    start = x;
                }
            });
        });
        return ops.join('');
    }
    var QRCodeProps = {
        value: {
            type: String,
            required: true,
            "default": '',
        },
        size: {
            type: Number,
            "default": 100,
        },
        level: {
            type: String,
            "default": defaultErrorCorrectLevel,
            validator: function (l) { return validErrorCorrectLevel(l); },
        },
        background: {
            type: String,
            "default": '#fff',
        },
        foreground: {
            type: String,
            "default": '#000',
        },
        margin: {
            type: Number,
            required: false,
            "default": 0,
        },
    };
    var QRCodeVueProps = __assign(__assign({}, QRCodeProps), { renderAs: {
            type: String,
            required: false,
            "default": 'canvas',
            validator: function (as) { return ['canvas', 'svg'].indexOf(as) > -1; },
        } });
    var QRCodeSvg = vue.defineComponent({
        name: 'QRCodeSvg',
        props: QRCodeProps,
        setup: function (props) {
            var numCells = vue.ref(0);
            var fgPath = vue.ref('');
            var generate = function () {
                var value = props.value, level = props.level, margin = props.margin;
                var cells = QRCode(value, level).modules;
                numCells.value = cells.length + margin * 2;
                // Drawing strategy: instead of a rect per module, we're going to create a
                // single path for the dark modules and layer that on top of a light rect,
                // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
                // way faster than DOM ops.
                // For level 1, 441 nodes -> 2
                // For level 40, 31329 -> 2
                fgPath.value = generatePath(cells, margin);
            };
            generate();
            vue.onUpdated(generate);
            return function () { return vue.h('svg', {
                width: props.size,
                height: props.size,
                'shape-rendering': "crispEdges",
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: "0 0 " + numCells.value + " " + numCells.value,
            }, [
                vue.h('path', {
                    fill: props.background,
                    d: "M0,0 h" + numCells.value + "v" + numCells.value + "H0z",
                }),
                vue.h('path', { fill: props.foreground, d: fgPath.value }),
            ]); };
        },
    });
    var QRCodeCanvas = vue.defineComponent({
        name: 'QRCodeCanvas',
        props: QRCodeProps,
        setup: function (props) {
            var canvasEl = vue.ref(null);
            var generate = function () {
                var value = props.value, level = props.level, size = props.size, margin = props.margin, background = props.background, foreground = props.foreground;
                var cells = QRCode(value, level).modules;
                var numCells = cells.length + margin * 2;
                var canvas = canvasEl.value;
                if (!canvas) {
                    return;
                }
                var ctx = canvas.getContext('2d');
                if (!ctx) {
                    return;
                }
                var devicePixelRatio = window.devicePixelRatio || 1;
                var scale = (size / numCells) * devicePixelRatio;
                canvas.height = canvas.width = size * devicePixelRatio;
                ctx.scale(scale, scale);
                ctx.fillStyle = background;
                ctx.fillRect(0, 0, numCells, numCells);
                ctx.fillStyle = foreground;
                if (SUPPORTS_PATH2D) {
                    ctx.fill(new Path2D(generatePath(cells, margin)));
                }
                else {
                    cells.forEach(function (row, rdx) {
                        row.forEach(function (cell, cdx) {
                            if (cell) {
                                ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
                            }
                        });
                    });
                }
            };
            vue.onMounted(generate);
            vue.onUpdated(generate);
            return function () { return vue.h('canvas', {
                ref: canvasEl,
                style: { width: props.size + "px", height: props.size + "px" },
            }); };
        },
    });
    var QrcodeVue = vue.defineComponent({
        name: 'Qrcode',
        render: function () {
            var _a = this.$props, renderAs = _a.renderAs, value = _a.value, _size = _a.size, _margin = _a.margin, _level = _a.level, background = _a.background, foreground = _a.foreground;
            var size = _size >>> 0;
            var margin = _margin >>> 0;
            var level = validErrorCorrectLevel(_level) ? _level : defaultErrorCorrectLevel;
            return vue.h(renderAs === 'svg' ? QRCodeSvg : QRCodeCanvas, { value: value, size: size, margin: margin, level: level, background: background, foreground: foreground });
        },
        props: QRCodeVueProps,
    });

    return QrcodeVue;

}));


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewUser_vue_vue_type_style_index_0_id_0dbe1b5c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewUser_vue_vue_type_style_index_0_id_0dbe1b5c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewUser_vue_vue_type_style_index_0_id_0dbe1b5c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/tenants/users/EditUser.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/tenants/users/EditUser.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EditUser_vue_vue_type_template_id_9259cc7e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditUser.vue?vue&type=template&id=9259cc7e */ "./resources/js/views/tenants/users/EditUser.vue?vue&type=template&id=9259cc7e");
/* harmony import */ var _EditUser_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditUser.vue?vue&type=script&lang=js */ "./resources/js/views/tenants/users/EditUser.vue?vue&type=script&lang=js");
/* harmony import */ var D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_EditUser_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_EditUser_vue_vue_type_template_id_9259cc7e__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/views/tenants/users/EditUser.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/tenants/users/ViewUser.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/tenants/users/ViewUser.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewUser_vue_vue_type_template_id_0dbe1b5c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewUser.vue?vue&type=template&id=0dbe1b5c&scoped=true */ "./resources/js/views/tenants/users/ViewUser.vue?vue&type=template&id=0dbe1b5c&scoped=true");
/* harmony import */ var _ViewUser_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewUser.vue?vue&type=script&lang=js */ "./resources/js/views/tenants/users/ViewUser.vue?vue&type=script&lang=js");
/* harmony import */ var _ViewUser_vue_vue_type_style_index_0_id_0dbe1b5c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true */ "./resources/js/views/tenants/users/ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true");
/* harmony import */ var D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ViewUser_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ViewUser_vue_vue_type_template_id_0dbe1b5c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-0dbe1b5c"],['__file',"resources/js/views/tenants/users/ViewUser.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/tenants/users/EditUser.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/tenants/users/EditUser.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_EditUser_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_EditUser_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./EditUser.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/EditUser.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/tenants/users/ViewUser.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/tenants/users/ViewUser.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewUser_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewUser_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewUser.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/tenants/users/EditUser.vue?vue&type=template&id=9259cc7e":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/tenants/users/EditUser.vue?vue&type=template&id=9259cc7e ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_EditUser_vue_vue_type_template_id_9259cc7e__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_EditUser_vue_vue_type_template_id_9259cc7e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./EditUser.vue?vue&type=template&id=9259cc7e */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/EditUser.vue?vue&type=template&id=9259cc7e");


/***/ }),

/***/ "./resources/js/views/tenants/users/ViewUser.vue?vue&type=template&id=0dbe1b5c&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/tenants/users/ViewUser.vue?vue&type=template&id=0dbe1b5c&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewUser_vue_vue_type_template_id_0dbe1b5c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewUser_vue_vue_type_template_id_0dbe1b5c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewUser.vue?vue&type=template&id=0dbe1b5c&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=template&id=0dbe1b5c&scoped=true");


/***/ }),

/***/ "./resources/js/views/tenants/users/ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/views/tenants/users/ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewUser_vue_vue_type_style_index_0_id_0dbe1b5c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/users/ViewUser.vue?vue&type=style&index=0&id=0dbe1b5c&lang=scss&scoped=true");


/***/ })

}]);