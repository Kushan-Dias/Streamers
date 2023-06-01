"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_roles_RolesPermissions_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/CreateRole.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/CreateRole.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vuelidate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vuelidate/core */ "./node_modules/@vuelidate/core/dist/index.esm.js");
/* harmony import */ var _vuelidate_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vuelidate/validators */ "./node_modules/@vuelidate/validators/dist/index.esm.js");
/* harmony import */ var _utils_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/enums */ "./resources/js/utils/enums.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/constants */ "./resources/js/utils/constants.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CreateRole",
  components: {},
  props: {
    showCreateUpdateModal: {
      required: true,
      type: Boolean,
      "default": false
    },
    isUpdating: {
      type: Boolean,
      "default": false
    },
    currentRole: {
      type: Object,
      "default": {}
    }
  },
  setup: function setup() {
    return {
      v$: (0,_vuelidate_core__WEBPACK_IMPORTED_MODULE_1__["default"])()
    };
  },
  validations: function validations() {
    return {
      role: {
        name: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_4__.required
        },
        title: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_4__.required
        }
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
      role: {},
      roleCreateSuccessToast: {
        message: this.$t('messages.roleCreated'),
        type: 'success'
      },
      roleUpdateSuccessToast: {
        message: this.$t('messages.roleUpdated'),
        type: 'success'
      }
    };
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    createRole: function createRole() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var isFormCorrect;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.v$.$validate();

              case 2:
                isFormCorrect = _context.sent;

                if (isFormCorrect) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                _this.isLoading = true;
                _context.next = 8;
                return _this.fetcher("/api/roles", _utils_enums__WEBPACK_IMPORTED_MODULE_2__.REQUEST_METHOD.POST, _this.role).then(function (response) {
                  _this.isLoading = false;

                  _this.showToast(_this.roleCreateSuccessToast);

                  _this.emitter.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_3__.EMITTERS.GET_DATA);

                  _this.closeModal();
                })["catch"](function (error) {
                  _this.isLoading = false;

                  _this.catcher(error);
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    updateRole: function updateRole() {
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
                return _this2.fetcher("/api/roles/".concat(_this2.role.id), _utils_enums__WEBPACK_IMPORTED_MODULE_2__.REQUEST_METHOD.PUT, _this2.role).then(function (response) {
                  _this2.isLoading = false;

                  _this2.emitter.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_3__.EMITTERS.GET_DATA);

                  _this2.closeModal();

                  _this2.showToast(_this2.roleUpdateSuccessToast);
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
    setRoleName: function setRoleName(e) {
      if (!this.isUpdating) {
        this.role.name = e.target.value.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '');
      } // Trim - from end of text

    },
    resetForm: function resetForm() {
      this.role = {};
      this.v$.$reset();
    },
    closeModal: function closeModal() {
      this.resetForm();
      this.emitter.emit(_utils_constants__WEBPACK_IMPORTED_MODULE_3__.EMITTERS.CLOSE_MODAL, false);
    }
  },
  watch: {
    currentRole: function currentRole(value) {
      if (value) {
        this.role = value;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/RolesPermissions.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/RolesPermissions.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/enums */ "./resources/js/utils/enums.js");
/* harmony import */ var _CreateRole__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateRole */ "./resources/js/views/roles/CreateRole.vue");
/* harmony import */ var _utils_app_permissions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/app.permissions */ "./resources/js/utils/app.permissions.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/constants */ "./resources/js/utils/constants.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "RolesPermissions",
  components: {
    CreateRole: _CreateRole__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  computed: {
    canCreateRole: function canCreateRole() {
      return this.hasValidAccess(_utils_app_permissions__WEBPACK_IMPORTED_MODULE_3__.PERMISSIONS.CREATE_ROLE);
    }
  },
  data: function data() {
    return {
      isLoading: false,
      errorMessage: "",
      currentRole: {
        name: '',
        title: '',
        permissions: []
      },
      roles: [],
      permissions: [],
      roles_permissions: {},
      roleCreateSuccessToast: {
        message: this.$t('messages.roleCreated'),
        type: 'success'
      },
      permissionAssignSuccessToast: {
        message: this.$t('messages.permissionsAssigned'),
        type: 'success'
      },
      showCreateRoleModal: false
    };
  },
  created: function created() {
    var _this = this;

    this.getRolePermissionData();
    this.emitter.on(_utils_constants__WEBPACK_IMPORTED_MODULE_4__.EMITTERS.GET_DATA, function () {
      _this.getRolePermissionData();
    });
    this.emitter.on(_utils_constants__WEBPACK_IMPORTED_MODULE_4__.EMITTERS.CLOSE_MODAL, function () {
      _this.onClose();
    });
  },
  inject: ['fetcher', 'catcher', 'showToast', 'hasValidAccess'],
  methods: {
    getRolePermissionData: function getRolePermissionData() {
      this.getAllRoles();
      this.getAllPermissions();
    },
    getAllRoles: function getAllRoles() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.isLoading = true;
                _context.next = 3;
                return _this2.fetcher("/api/roles", _utils_enums__WEBPACK_IMPORTED_MODULE_1__.REQUEST_METHOD.GET).then(function (response) {
                  _this2.roles = response.data.data.roles;

                  _this2.roles.forEach(function (role) {
                    role.permissions.forEach(function (permission) {
                      _this2.setRolesPermissions(true, role.name, permission.name);
                    });
                  });

                  _this2.isLoading = false;
                })["catch"](function (error) {
                  _this2.isLoading = false;

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
    getAllPermissions: function getAllPermissions() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this3.isLoading = true;
                _context2.next = 3;
                return _this3.fetcher("/api/permissions", _utils_enums__WEBPACK_IMPORTED_MODULE_1__.REQUEST_METHOD.GET).then(function (response) {
                  _this3.permissions = response.data.data.permissions;
                  _this3.isLoading = false;
                })["catch"](function (error) {
                  _this3.isLoading = false;

                  _this3.catcher(error);
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    syncRolesPermissions: function syncRolesPermissions() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this4.isLoading = true;
                _context3.next = 3;
                return _this4.fetcher("/api/roles/sync", _utils_enums__WEBPACK_IMPORTED_MODULE_1__.REQUEST_METHOD.POST, {
                  "roles_permissions": _this4.roles_permissions
                }).then(function (response) {
                  _this4.isLoading = false;

                  _this4.showToast(_this4.permissionAssignSuccessToast);

                  _this4.getAllRoles();
                })["catch"](function (error) {
                  _this4.isLoading = false;

                  _this4.catcher(error);
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    setRolesPermissions: function setRolesPermissions(checked, roleName, permissionName) {
      if (checked) {
        if (this.roles_permissions[roleName]) {
          this.roles_permissions[roleName].push(permissionName);
        } else {
          this.roles_permissions[roleName] = [permissionName];
        }
      } else {
        if (this.roles_permissions[roleName]) {
          this.roles_permissions[roleName] = this.roles_permissions[roleName].filter(function (item) {
            return item !== permissionName;
          });

          if (this.roles_permissions[roleName].length === 0) {
            this.roles_permissions[roleName] = [];
          }
        }
      }
    },
    openModal: function openModal() {
      this.showCreateRoleModal = true;
    },
    onClose: function onClose() {
      this.showCreateRoleModal = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/CreateRole.vue?vue&type=template&id=9f8c757a":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/CreateRole.vue?vue&type=template&id=9f8c757a ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
  "class": "code w-100",
  rows: "10"
};
var _hoisted_5 = {
  "class": "code w-100",
  rows: "10"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Loading");

  var _component_CModalTitle = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalTitle");

  var _component_CModalHeader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalHeader");

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
    backdrop: "static",
    visible: $props.showCreateUpdateModal,
    onClose: $options.closeModal
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
        active: $data.isLoading,
        "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
          return $data.isLoading = $event;
        }),
        "is-full-page": false
      }, null, 8
      /* PROPS */
      , ["active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalHeader, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [$props.isUpdating ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CModalTitle, {
            key: 0
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.updateRole')), 1
              /* TEXT */
              )];
            }),
            _: 1
            /* STABLE */

          })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CModalTitle, {
            key: 1
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.createRole')), 1
              /* TEXT */
              )];
            }),
            _: 1
            /* STABLE */

          }))];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalBody, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
            active: $data.isLoading,
            "onUpdate:active": _cache[1] || (_cache[1] = function ($event) {
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
                        "for": "Role Name"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.roleTitle')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "roleName",
                        modelValue: $data.role.title,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
                          return $data.role.title = $event;
                        }),
                        placeholder: "Student",
                        onInput: $options.setRoleName
                      }, null, 8
                      /* PROPS */
                      , ["modelValue", "onInput"]), $setup.v$.role.title.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [$setup.v$.role.title.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.validations.required')), 1
                      /* TEXT */
                      )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
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
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.isUpdating) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.role), 1
                  /* TEXT */
                  )];
                }),
                _: 1
                /* STABLE */

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.v$), 1
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
          , ["onClick"]), $props.isUpdating ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CButton, {
            key: 0,
            color: "primary",
            onClick: $options.updateRole
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
          , ["onClick"])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CButton, {
            key: 1,
            color: "primary",
            onClick: $options.createRole
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.create')), 1
              /* TEXT */
              )];
            }),
            _: 1
            /* STABLE */

          }, 8
          /* PROPS */
          , ["onClick"]))];
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/RolesPermissions.vue?vue&type=template&id=6ab539f8":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/RolesPermissions.vue?vue&type=template&id=6ab539f8 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "card-title mb-0"
};
var _hoisted_2 = ["id", "checked", "onChange"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CreateRole = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CreateRole");

  var _component_CCol = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCol");

  var _component_CIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CIcon");

  var _component_CButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CButton");

  var _component_CRow = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CRow");

  var _component_TablePlaceholder = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("TablePlaceholder");

  var _component_CTableHeaderCell = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CTableHeaderCell");

  var _component_CTableRow = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CTableRow");

  var _component_CTableHead = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CTableHead");

  var _component_CTableDataCell = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CTableDataCell");

  var _component_CTableBody = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CTableBody");

  var _component_CTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CTable");

  var _component_CAlert = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CAlert");

  var _component_CCardBody = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCardBody");

  var _component_CCardFooter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCardFooter");

  var _component_CCard = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCard");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [$options.canCreateRole ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CreateRole, {
    key: 0,
    showCreateUpdateModal: $data.showCreateRoleModal
  }, null, 8
  /* PROPS */
  , ["showCreateUpdateModal"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardBody, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, {
                    "class": "mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 7
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_1, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.system')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 5,
                        "class": "d-none d-md-block"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, {
                            size: "sm",
                            color: "primary",
                            "class": "ml-2 float-end",
                            onClick: $options.openModal
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                icon: "cilPlus"
                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.createRole')), 1
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

                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [$data.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_TablePlaceholder, {
                            key: 0,
                            showActions: false
                          })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.isLoading && $data.roles && $data.permissions ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CTable, {
                            key: 1,
                            align: "middle",
                            "class": "mb-0 border",
                            hover: "",
                            responsive: ""
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CTableHead, {
                                color: "light"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CTableRow, null, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CTableHeaderCell, {
                                        "class": "text-left"
                                      }, {
                                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$tc('labels.permission', 2)), 1
                                          /* TEXT */
                                          )];
                                        }),
                                        _: 1
                                        /* STABLE */

                                      }), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.roles, function (role) {
                                        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CTableHeaderCell, {
                                          "class": "text-center",
                                          key: role.id
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
                                      }), 128
                                      /* KEYED_FRAGMENT */
                                      ))];
                                    }),
                                    _: 1
                                    /* STABLE */

                                  })];
                                }),
                                _: 1
                                /* STABLE */

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CTableBody, null, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.permissions, function (permission) {
                                    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CTableRow, {
                                      key: permission.id
                                    }, {
                                      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CTableDataCell, {
                                          "class": "text-left",
                                          cols: "3"
                                        }, {
                                          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(permission.title), 1
                                            /* TEXT */
                                            )];
                                          }),
                                          _: 2
                                          /* DYNAMIC */

                                        }, 1024
                                        /* DYNAMIC_SLOTS */
                                        ), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.roles, function (role) {
                                          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CTableDataCell, {
                                            "class": "text-center",
                                            key: role.name
                                          }, {
                                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
                                                "class": "form-check-input",
                                                type: "checkbox",
                                                id: role.name,
                                                checked: role.permissions.some(function (p) {
                                                  return p.id === permission.id;
                                                }),
                                                onChange: function onChange(e) {
                                                  $options.setRolesPermissions(e.target.checked, role.name, permission.name);
                                                }
                                              }, null, 40
                                              /* PROPS, HYDRATE_EVENTS */
                                              , _hoisted_2)];
                                            }),
                                            _: 2
                                            /* DYNAMIC */

                                          }, 1024
                                          /* DYNAMIC_SLOTS */
                                          );
                                        }), 128
                                        /* KEYED_FRAGMENT */
                                        ))];
                                      }),
                                      _: 2
                                      /* DYNAMIC */

                                    }, 1024
                                    /* DYNAMIC_SLOTS */
                                    );
                                  }), 128
                                  /* KEYED_FRAGMENT */
                                  ))];
                                }),
                                _: 1
                                /* STABLE */

                              })];
                            }),
                            _: 1
                            /* STABLE */

                          })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.isLoading && $data.roles.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CAlert, {
                            key: 2,
                            color: "danger"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.noRolesFound')), 1
                              /* TEXT */
                              )];
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

                  })];
                }),
                _: 1
                /* STABLE */

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardFooter, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, {
                    size: "sm",
                    color: "primary",
                    "class": "ml-2 float-end",
                    onClick: $options.syncRolesPermissions
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.save')), 1
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

/***/ "./resources/js/views/roles/CreateRole.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/roles/CreateRole.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CreateRole_vue_vue_type_template_id_9f8c757a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateRole.vue?vue&type=template&id=9f8c757a */ "./resources/js/views/roles/CreateRole.vue?vue&type=template&id=9f8c757a");
/* harmony import */ var _CreateRole_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateRole.vue?vue&type=script&lang=js */ "./resources/js/views/roles/CreateRole.vue?vue&type=script&lang=js");
/* harmony import */ var D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_CreateRole_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CreateRole_vue_vue_type_template_id_9f8c757a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/views/roles/CreateRole.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/roles/RolesPermissions.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/roles/RolesPermissions.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RolesPermissions_vue_vue_type_template_id_6ab539f8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RolesPermissions.vue?vue&type=template&id=6ab539f8 */ "./resources/js/views/roles/RolesPermissions.vue?vue&type=template&id=6ab539f8");
/* harmony import */ var _RolesPermissions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RolesPermissions.vue?vue&type=script&lang=js */ "./resources/js/views/roles/RolesPermissions.vue?vue&type=script&lang=js");
/* harmony import */ var D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_RolesPermissions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_RolesPermissions_vue_vue_type_template_id_6ab539f8__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/views/roles/RolesPermissions.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/roles/CreateRole.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/views/roles/CreateRole.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateRole_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateRole_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateRole.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/CreateRole.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/roles/RolesPermissions.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/roles/RolesPermissions.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RolesPermissions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RolesPermissions_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RolesPermissions.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/RolesPermissions.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/roles/CreateRole.vue?vue&type=template&id=9f8c757a":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/roles/CreateRole.vue?vue&type=template&id=9f8c757a ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateRole_vue_vue_type_template_id_9f8c757a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateRole_vue_vue_type_template_id_9f8c757a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateRole.vue?vue&type=template&id=9f8c757a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/CreateRole.vue?vue&type=template&id=9f8c757a");


/***/ }),

/***/ "./resources/js/views/roles/RolesPermissions.vue?vue&type=template&id=6ab539f8":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/roles/RolesPermissions.vue?vue&type=template&id=6ab539f8 ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RolesPermissions_vue_vue_type_template_id_6ab539f8__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RolesPermissions_vue_vue_type_template_id_6ab539f8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RolesPermissions.vue?vue&type=template&id=6ab539f8 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/roles/RolesPermissions.vue?vue&type=template&id=6ab539f8");


/***/ })

}]);