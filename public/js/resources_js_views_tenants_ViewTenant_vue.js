"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_tenants_ViewTenant_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _vuelidate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vuelidate/core */ "./node_modules/@vuelidate/core/dist/index.esm.js");
/* harmony import */ var _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vuelidate/validators */ "./node_modules/@vuelidate/validators/dist/index.esm.js");
/* harmony import */ var _utils_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/enums */ "./resources/js/utils/enums.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ContractTemplates",
  components: {
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2___default())
  },
  props: {
    tenantId: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      isLoading: false,
      isUpdating: false,
      errorMessage: "",
      tenants: [],
      contractTemplates: [],
      currentTemplate: {},
      templateId: null,
      templateCreateSuccessToast: {
        message: this.$t('messages.templateCreated'),
        type: 'success'
      },
      templateUpdateSuccessToast: {
        message: this.$t('messages.templateUpdated'),
        type: 'success'
      },
      deleteTemplateToast: {
        message: this.$t('messages.templateDeleted'),
        type: "success"
      },
      showCreateUpdateTemplateModal: false
    };
  },
  setup: function setup() {
    return {
      v$: (0,_vuelidate_core__WEBPACK_IMPORTED_MODULE_3__["default"])()
    };
  },
  validations: function validations() {
    return {
      currentTemplate: {
        id: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
        },
        workspace_id: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
        },
        name: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
        },
        version: {
          required: _vuelidate_validators__WEBPACK_IMPORTED_MODULE_5__.required
        } // role_id: { required }, // Todo:

      }
    };
  },
  created: function created() {
    this.getAllTenants();

    if (this.tenantId) {
      this.getAllContractTemplates();
    }
  },
  inject: ['fetcher', 'catcher', 'showToast', 'showAlert'],
  methods: {
    openAddModal: function openAddModal() {
      this.currentTemplate = {};
      this.showCreateUpdateTemplateModal = true;
    },
    getAllTenants: function getAllTenants() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.isLoading = true;
                _context.next = 3;
                return _this.fetcher("/api/tenants/".concat(_this.tenantId), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.GET).then(function (response) {
                  _this.tenants = response.data.data.tenants;
                  _this.isLoading = false;
                })["catch"](function (error) {
                  _this.isLoading = false;
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    createContractTemplate: function createContractTemplate() {
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
                _this2.currentTemplate.template_id = _this2.currentTemplate.id;
                _this2.currentTemplate.role_id = 2;
                _context2.next = 10;
                return _this2.fetcher("/api/contracts/templates/".concat(_this2.tenantId, "/"), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.POST, _this2.currentTemplate).then(function (response) {
                  _this2.showCreateUpdateTemplateModal = false;

                  _this2.showToast(_this2.templateCreateSuccessToast);

                  _this2.currentTemplate = {};
                  _this2.isLoading = false;

                  _this2.getAllContractTemplates();
                })["catch"](function (error) {
                  _this2.isLoading = false;

                  _this2.catcher(error);
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    updateContractTemplate: function updateContractTemplate() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var isFormCorrect;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.v$.$validate();

              case 2:
                isFormCorrect = _context3.sent;

                if (isFormCorrect) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return");

              case 5:
                _this3.isLoading = true;
                _this3.currentTemplate.template_id = _this3.currentTemplate.id;
                _context3.next = 9;
                return _this3.fetcher("/api/contracts/templates/".concat(_this3.tenantId, "/").concat(_this3.templateId), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.PUT, _this3.currentTemplate).then(function (response) {
                  _this3.currentTemplate = {};
                  _this3.showCreateUpdateTemplateModal = false;

                  _this3.showToast(_this3.templateUpdateSuccessToast);

                  _this3.isUpdating = false;
                  _this3.isLoading = false;

                  _this3.getAllContractTemplates();
                })["catch"](function (error) {
                  _this3.isLoading = false;

                  _this3.catcher(error);
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    getAllContractTemplates: function getAllContractTemplates() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.isLoading = true;
                _context4.next = 3;
                return _this4.fetcher("/api/contracts/templates/".concat(_this4.tenantId), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.GET).then(function (response) {
                  _this4.contractTemplates = response.data.data.templates;
                  _this4.isLoading = false;
                })["catch"](function (error) {
                  _this4.isLoading = false;

                  _this4.catcher(error);
                });

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    handleDeleteContractTemplate: function handleDeleteContractTemplate(template) {
      var vm = this;
      this.showAlert({
        title: vm.$t('messages.areYouSure'),
        text: vm.$tc('messages.deleteTenantConfirmation', {
          arg: template.name
        }),
        showCancelButton: true,
        confirmButtonText: vm.$t('actions.yes'),
        cancelButtonText: vm.$t('actions.no')
      }).then( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5(result) {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (!result.isConfirmed) {
                    _context5.next = 3;
                    break;
                  }

                  _context5.next = 3;
                  return vm.deleteContractTemplate(template);

                case 3:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    },
    deleteContractTemplate: function deleteContractTemplate(template) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this5.isLoading = true;
                _context6.next = 3;
                return _this5.fetcher("/api/contracts/templates/".concat(_this5.tenantId, "/").concat(template.id), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.DELETE).then(function (response) {
                  _this5.showToast(_this5.deleteTemplateToast);

                  _this5.isLoading = false;

                  _this5.getAllContractTemplates();
                })["catch"](function (error) {
                  _this5.isLoading = false;

                  _this5.catcher(error);
                });

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    createdAt: function createdAt(created_at) {
      return moment__WEBPACK_IMPORTED_MODULE_1___default()(created_at).format("MMMM Do YYYY");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _contracts_ContractTemplates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contracts/ContractTemplates */ "./resources/js/views/contracts/ContractTemplates.vue");
/* harmony import */ var _utils_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/enums */ "./resources/js/utils/enums.js");
/* harmony import */ var _assets_images_avatar_default_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/images/avatar-default.png */ "./resources/js/assets/images/avatar-default.png");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ViewTenant",
  components: {
    ContractTemplates: _contracts_ContractTemplates__WEBPACK_IMPORTED_MODULE_3__["default"],
    Loading: (vue_loading_overlay__WEBPACK_IMPORTED_MODULE_2___default())
  },
  data: function data() {
    return {
      isLoadingTenant: false,
      isLoadingModules: false,
      defaultAvatar: _assets_images_avatar_default_png__WEBPACK_IMPORTED_MODULE_5__["default"],
      fullPage: true,
      tenant: {},
      oneFlowAccount: null,
      modules: [],
      tenantModules: [],
      moduleUpdateData: {
        modules: []
      },
      newStatus: "",
      statusUpdateSuccessToast: {
        message: this.$t('messages.tenantStatusUpdated'),
        type: "success"
      },
      modulesUpdateSuccessToast: {
        message: this.$t('messages.tenantModulesUpdated'),
        type: "success"
      },
      showNotFoundToast: {
        message: 'Tenant not found',
        type: 'error',
        duration: 3000
      },
      showStatusUpdateModal: false
    };
  },
  created: function created() {
    this.getTenant();
    this.getAllModules();
    this.getTenantModules();
  },
  computed: {
    windowLocationProtocol: function windowLocationProtocol() {
      return window.location.protocol;
    },
    windowLocationHost: function windowLocationHost() {
      return window.location.host;
    },
    tenantCreatedAt: function tenantCreatedAt() {
      return moment__WEBPACK_IMPORTED_MODULE_1___default()(this.tenant.created_at).format("MMMM Do YYYY");
    }
  },
  inject: ['fetcher', 'catcher', 'showToast'],
  methods: {
    getTenant: function getTenant() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.isLoadingTenant = true;
                _context.next = 3;
                return _this.fetcher("/api/tenants/".concat(_this.$route.params.id), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.GET).then(function (response) {
                  _this.tenant = response.data.data.tenant;
                  _this.oneFlowAccount = _this.tenant.one_flow_account;
                  _this.isLoadingTenant = false;
                })["catch"](function (error) {
                  if (error.response.data.status === 404) {
                    _this.$router.push('/tenants');

                    _this.showToast(_this.showNotFoundToast);
                  } else {
                    _this.isLoadingMaintenance = false;

                    _this.catcher(error);
                  }
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    updateTenantStatus: function updateTenantStatus() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var updateData;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.isLoadingTenant = true;
                updateData = {
                  id: _this2.$route.params.id,
                  status: _this2.newStatus
                };
                _context2.next = 4;
                return _this2.fetcher("/api/tenants/".concat(_this2.$route.params.id), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.PUT, updateData).then(function (response) {
                  _this2.tenant = response.data.data.tenant;
                  _this2.isLoadingTenant = false;
                  _this2.showStatusUpdateModal = false;

                  _this2.showToast(_this2.statusUpdateSuccessToast);

                  _this2.$router.push("/tenants/".concat(_this2.$route.params.id));
                })["catch"](function (error) {
                  _this2.isLoadingTenant = false;

                  _this2.catcher(error);
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getAllModules: function getAllModules() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this3.isLoadingModules = true;
                _context3.next = 3;
                return _this3.fetcher("/api/modules", _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.GET).then(function (response) {
                  _this3.modules = response.data.data.modules;
                  _this3.isLoadingModules = false;
                })["catch"](function (error) {
                  _this3.isLoadingModules = false;

                  _this3.catcher(error);
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    getTenantModules: function getTenantModules() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this4.isLoadingModules = true;
                _context4.next = 3;
                return _this4.fetcher("/api/modules/tenant/".concat(_this4.$route.params.id), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.GET).then(function (response) {
                  _this4.tenantModules = response.data.data.modules;
                  _this4.moduleUpdateData.modules = [];
                  _this4.isLoadingModules = false;
                })["catch"](function (error) {
                  _this4.isLoadingModules = false;

                  _this4.catcher(error);
                });

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    addUpdateTenantModules: function addUpdateTenantModules() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this5.isLoadingModules = true;
                _context5.next = 3;
                return _this5.fetcher("/api/modules/tenant/".concat(_this5.$route.params.id), _utils_enums__WEBPACK_IMPORTED_MODULE_4__.REQUEST_METHOD.POST, _this5.moduleUpdateData).then(function (response) {
                  _this5.tenantModules = response.data.data.modules;
                  _this5.isLoadingModules = false;

                  _this5.showToast(_this5.modulesUpdateSuccessToast);

                  _this5.getTenantModules();
                })["catch"](function (error) {
                  _this5.isLoadingModules = false;

                  _this5.catcher(error);
                });

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    isModuleActive: function isModuleActive(name) {
      return this.tenantModules.some(function (m) {
        return m.name === name && m.status === 'ACTIVE';
      });
    },
    setModuleUpdateFields: function setModuleUpdateFields(e, name) {
      var data = {
        "name": name,
        "status": e.target.checked ? 'ACTIVE' : 'INACTIVE'
      };
      this.moduleUpdateData.modules = this.moduleUpdateData.modules.filter(function (updateData) {
        return updateData.name !== data.name;
      });
      this.moduleUpdateData.modules.push(data);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=template&id=7e88f2ec":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=template&id=7e88f2ec ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "mb-3"
};
var _hoisted_3 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_4 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_5 = {
  "class": "mb-3"
};
var _hoisted_6 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_7 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_8 = {
  "class": "mb-3"
};
var _hoisted_9 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_10 = {
  key: 0,
  "class": "text-danger"
};
var _hoisted_11 = {
  "class": "mb-3"
};
var _hoisted_12 = {
  key: 0,
  "class": "d-flex flex-column"
};
var _hoisted_13 = {
  key: 0,
  "class": "text-danger"
};

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Cancel ");

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Update ");

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Add ");

var _hoisted_17 = {
  "class": "card-title mb-0"
};
var _hoisted_18 = {
  "class": "mb-0"
};
var _hoisted_19 = {
  "class": "d-flex"
};
var _hoisted_20 = {
  "class": "small text-secondary me-3"
};
var _hoisted_21 = {
  "class": "small text-secondary me-3"
};
var _hoisted_22 = {
  "class": "small text-secondary me-3"
};
var _hoisted_23 = {
  "class": "mb-0"
};
var _hoisted_24 = {
  key: 0
};
var _hoisted_25 = {
  "class": "text-secondary text-center mb-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

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

  var _component_CCardHeader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCardHeader");

  var _component_CIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CIcon");

  var _component_CTooltip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CTooltip");

  var _component_CButtonGroup = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CButtonGroup");

  var _component_CBadge = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CBadge");

  var _component_CCardBody = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCardBody");

  var _component_CCard = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCard");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModal, {
    backdrop: "static",
    visible: $data.showCreateUpdateTemplateModal,
    onClose: _cache[9] || (_cache[9] = function () {
      _this.showCreateUpdateTemplateModal = false;
      _this.isUpdating = false;
    }),
    size: "lg"
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
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalTitle, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.addContractTemplate')), 1
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
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CForm, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                    xs: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "tenant"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.tenant', 1)), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "tenant",
                        modelValue: $props.tenantId,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
                          return $props.tenantId = $event;
                        }),
                        placeholder: "",
                        disabled: ""
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"])])];
                    }),
                    _: 1
                    /* STABLE */

                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                    xs: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "name"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.templateName')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "name",
                        modelValue: $data.currentTemplate.name,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
                          return $data.currentTemplate.name = $event;
                        }),
                        placeholder: "New Contract"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"]), $setup.v$.currentTemplate.name.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_3, [$setup.v$.currentTemplate.name.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_4, " Template name field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
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
                    xs: ""
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "template_id"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.templateId')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "template_id",
                        type: "number",
                        modelValue: $data.currentTemplate.id,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
                          return $data.currentTemplate.id = $event;
                        }),
                        placeholder: "274154"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"]), $setup.v$.currentTemplate.id.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, [$setup.v$.currentTemplate.id.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_7, " Template ID field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
                    }),
                    _: 1
                    /* STABLE */

                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "workspace_id"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.workspaceId')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "workspace_id",
                        type: "number",
                        modelValue: $data.currentTemplate.workspace_id,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
                          return $data.currentTemplate.workspace_id = $event;
                        }),
                        placeholder: "487521"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"]), $setup.v$.currentTemplate.workspace_id.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [$setup.v$.currentTemplate.workspace_id.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_10, " Account Email field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
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
                    md: "6"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
                        "for": "email"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.version')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormInput, {
                        id: "version",
                        type: "number",
                        modelValue: $data.currentTemplate.version,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
                          return $data.currentTemplate.version = $event;
                        }),
                        placeholder: "1"
                      }, null, 8
                      /* PROPS */
                      , ["modelValue"]), $setup.v$.currentTemplate.version.$dirty ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [$setup.v$.currentTemplate.version.required.$invalid ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("small", _hoisted_13, " Version field is required ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])];
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

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalFooter, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, {
            color: "light",
            onClick: _cache[6] || (_cache[6] = function () {
              _this.showCreateUpdateTemplateModal = false;
              _this.isUpdating = false;
            })
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [_hoisted_14];
            }),
            _: 1
            /* STABLE */

          }), $data.isUpdating ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CButton, {
            key: 0,
            color: "primary",
            onClick: _cache[7] || (_cache[7] = function ($event) {
              return $options.updateContractTemplate();
            })
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [_hoisted_15];
            }),
            _: 1
            /* STABLE */

          })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CButton, {
            key: 1,
            color: "primary",
            onClick: _cache[8] || (_cache[8] = function ($event) {
              return $options.createContractTemplate();
            })
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [_hoisted_16];
            }),
            _: 1
            /* STABLE */

          }))];
        }),
        _: 1
        /* STABLE */

      })];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
    md: 6
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, {
        "class": "template-card"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardHeader, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                    sm: 5
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$tc('labels.contractTemplate', 2)), 1
                      /* TEXT */
                      )];
                    }),
                    _: 1
                    /* STABLE */

                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                    sm: 7,
                    "class": "d-none d-md-block"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, {
                        color: "primary",
                        "class": "float-end",
                        size: "sm",
                        onClick: $options.openAddModal
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.add')), 1
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

          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
            active: $data.isLoading,
            "onUpdate:active": _cache[10] || (_cache[10] = function ($event) {
              return $data.isLoading = $event;
            }),
            "is-full-page": false
          }, null, 8
          /* PROPS */
          , ["active"]), $data.contractTemplates.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CCardBody, {
            key: 0,
            "class": "template-card h-100"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.contractTemplates, function (template, index) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CRow, null, {
                  "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                    return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                      md: 12
                    }, {
                      "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                              md: 10,
                              "class": "mb-1"
                            }, {
                              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(template.name), 1
                                /* TEXT */
                                ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.templateId')) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(template.id), 1
                                /* TEXT */
                                ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.workspaceId')) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(template.workspace_id), 1
                                /* TEXT */
                                ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.version')) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(template.version), 1
                                /* TEXT */
                                )])];
                              }),
                              _: 2
                              /* DYNAMIC */

                            }, 1024
                            /* DYNAMIC_SLOTS */
                            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                              md: 2
                            }, {
                              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButtonGroup, {
                                  "class": "float-end",
                                  role: "group"
                                }, {
                                  "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                    return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CTooltip, {
                                      content: _ctx.$t('actions.edit'),
                                      placement: "top"
                                    }, {
                                      toggler: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (_ref) {
                                        var on = _ref.on;
                                        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toHandlers)(on), {
                                          onClick: function onClick() {
                                            _this.showCreateUpdateTemplateModal = true;
                                            _this.isUpdating = true;
                                            _this.currentTemplate = template;
                                            _this.templateId = template.id;
                                          },
                                          color: "warning",
                                          size: "sm"
                                        }), {
                                          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                              icon: "cilPencil",
                                              size: "sm"
                                            })];
                                          }),
                                          _: 2
                                          /* DYNAMIC */

                                        }, 1040
                                        /* FULL_PROPS, DYNAMIC_SLOTS */
                                        , ["onClick"])];
                                      }),
                                      _: 2
                                      /* DYNAMIC */

                                    }, 1032
                                    /* PROPS, DYNAMIC_SLOTS */
                                    , ["content"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CTooltip, {
                                      content: _ctx.$t('actions.delete'),
                                      placement: "top"
                                    }, {
                                      toggler: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (_ref2) {
                                        var on = _ref2.on;
                                        return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toHandlers)(on), {
                                          onClick: function onClick($event) {
                                            return $options.handleDeleteContractTemplate(template);
                                          },
                                          color: "danger",
                                          size: "sm"
                                        }), {
                                          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                              icon: "cilTrash",
                                              size: "sm"
                                            })];
                                          }),
                                          _: 2
                                          /* DYNAMIC */

                                        }, 1040
                                        /* FULL_PROPS, DYNAMIC_SLOTS */
                                        , ["onClick"])];
                                      }),
                                      _: 2
                                      /* DYNAMIC */

                                    }, 1032
                                    /* PROPS, DYNAMIC_SLOTS */
                                    , ["content"])];
                                  }),
                                  _: 2
                                  /* DYNAMIC */

                                }, 1024
                                /* DYNAMIC_SLOTS */
                                )];
                              }),
                              _: 2
                              /* DYNAMIC */

                            }, 1024
                            /* DYNAMIC_SLOTS */
                            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                              md: 12
                            }, {
                              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CBadge, {
                                  color: "primary"
                                }, {
                                  "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                    return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(template.role.title), 1
                                    /* TEXT */
                                    )];
                                  }),
                                  _: 2
                                  /* DYNAMIC */

                                }, 1024
                                /* DYNAMIC_SLOTS */
                                )];
                              }),
                              _: 2
                              /* DYNAMIC */

                            }, 1024
                            /* DYNAMIC_SLOTS */
                            )];
                          }),
                          _: 2
                          /* DYNAMIC */

                        }, 1024
                        /* DYNAMIC_SLOTS */
                        ), index !== $data.contractTemplates.length - 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("hr", _hoisted_24)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
                      }),
                      _: 2
                      /* DYNAMIC */

                    }, 1024
                    /* DYNAMIC_SLOTS */
                    )];
                  }),
                  _: 2
                  /* DYNAMIC */

                }, 1024
                /* DYNAMIC_SLOTS */
                );
              }), 256
              /* UNKEYED_FRAGMENT */
              ))];
            }),
            _: 1
            /* STABLE */

          })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CCardBody, {
            key: 1,
            "class": "d-flex flex-column align-items-center justify-content-center p-5"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('messages.noContractTemplates')), 1
              /* TEXT */
              ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButtonGroup, {
                role: "group"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toHandlers)(_ctx.on), {
                    onClick: $options.openAddModal,
                    color: "primary",
                    size: "sm"
                  }), {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.addTemplate')), 1
                      /* TEXT */
                      )];
                    }),
                    _: 1
                    /* STABLE */

                  }, 16
                  /* FULL_PROPS */
                  , ["onClick"])];
                }),
                _: 1
                /* STABLE */

              })];
            }),
            _: 1
            /* STABLE */

          }))];
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=template&id=2234f954&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=template&id=2234f954&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var _withScopeId = function _withScopeId(n) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId)("data-v-2234f954"), n = n(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId)(), n;
};

var _hoisted_1 = {
  "class": "mb-3"
};
var _hoisted_2 = ["value"];
var _hoisted_3 = {
  "class": "card-title mb-0"
};
var _hoisted_4 = {
  "class": "d-flex align-items-stretch float-end"
};
var _hoisted_5 = {
  "class": "mb-0"
};
var _hoisted_6 = {
  "class": "mb-2"
};
var _hoisted_7 = {
  "class": "d-flex justify-content-start mb-2"
};
var _hoisted_8 = ["href"];
var _hoisted_9 = {
  "class": "me-2"
};

var _hoisted_10 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    "class": "cil-external-link"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_11 = {
  "class": "text-secondary"
};
var _hoisted_12 = {
  "class": "mt-3"
};

var _hoisted_13 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    "class": "text-secondary fw-bold"
  }, "ADMIN", -1
  /* HOISTED */
  );
});

var _hoisted_14 = {
  "class": "d-flex align-items-center mt-3"
};

var _hoisted_15 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "d-flex flex-column justify-content-start ms-2"
  }, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    "class": "mb-0"
  }, " Bruce Wayne "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    "class": "text-secondary"
  }, " bruce@gmail.com ")], -1
  /* HOISTED */
  );
});

var _hoisted_16 = {
  "class": "d-flex align-items-center mt-3"
};

var _hoisted_17 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "d-flex flex-column justify-content-start ms-2"
  }, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    "class": "mb-0"
  }, " John Doe "), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", {
    "class": "text-secondary"
  }, " johndoe@gmail.com ")], -1
  /* HOISTED */
  );
});

var _hoisted_18 = {
  "class": "d-flex justify-content-between"
};

var _hoisted_19 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "mb-1"
  }, "124", -1
  /* HOISTED */
  );
});

var _hoisted_20 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Users", -1
  /* HOISTED */
  );
});

var _hoisted_21 = {
  "class": "d-flex justify-content-between"
};

var _hoisted_22 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "mb-1"
  }, "$12,468", -1
  /* HOISTED */
  );
});

var _hoisted_23 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Revenue", -1
  /* HOISTED */
  );
});

var _hoisted_24 = {
  "class": "d-flex justify-content-between"
};

var _hoisted_25 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    "class": "mb-0 me-2"
  }, "163MB", -1
  /* HOISTED */
  );
});

var _hoisted_26 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, "Storage")], -1
  /* HOISTED */
  );
});

var _hoisted_27 = {
  "class": "card-title mb-0"
};
var _hoisted_28 = {
  "class": "small text-medium-emphasis"
};
var _hoisted_29 = {
  "class": "d-flex justify-content-between align-items-center w-100"
};
var _hoisted_30 = {
  "class": "mb-0"
};
var _hoisted_31 = {
  "class": "card-title mb-0"
};
var _hoisted_32 = {
  "class": "title text-secondary"
};
var _hoisted_33 = {
  "class": "mb-0"
};
var _hoisted_34 = {
  "class": "title text-secondary"
};
var _hoisted_35 = {
  "class": "title text-secondary"
};
var _hoisted_36 = {
  "class": "title text-secondary"
};
var _hoisted_37 = {
  "class": "d-flex align-items-center"
};
var _hoisted_38 = {
  "class": "ms-2"
};
var _hoisted_39 = {
  "class": "title text-secondary"
};
var _hoisted_40 = {
  key: 0
};
var _hoisted_41 = {
  "class": "text-secondary text-center mb-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  var _component_CModalTitle = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalTitle");

  var _component_CModalHeader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalHeader");

  var _component_Loading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Loading");

  var _component_CFormLabel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CFormLabel");

  var _component_CFormSelect = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CFormSelect");

  var _component_CModalBody = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalBody");

  var _component_CButton = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CButton");

  var _component_CModalFooter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModalFooter");

  var _component_CModal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CModal");

  var _component_CCol = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCol");

  var _component_CBadge = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CBadge");

  var _component_CIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CIcon");

  var _component_CDropdownToggle = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CDropdownToggle");

  var _component_CDropdownItem = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CDropdownItem");

  var _component_CDropdownMenu = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CDropdownMenu");

  var _component_CDropdown = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CDropdown");

  var _component_CRow = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CRow");

  var _component_CAvatar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CAvatar");

  var _component_CCardBody = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCardBody");

  var _component_CCard = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCard");

  var _component_CCardHeader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCardHeader");

  var _component_CAccordionHeader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CAccordionHeader");

  var _component_CFormSwitch = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CFormSwitch");

  var _component_CAccordionBody = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CAccordionBody");

  var _component_CAccordionItem = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CAccordionItem");

  var _component_CAccordion = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CAccordion");

  var _component_CCardFooter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CCardFooter");

  var _component_CTooltip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CTooltip");

  var _component_CButtonGroup = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("CButtonGroup");

  var _component_ContractTemplates = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ContractTemplates");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModal, {
    visible: $data.showStatusUpdateModal,
    onClose: _cache[3] || (_cache[3] = function () {
      _this.showStatusUpdateModal = false;
    })
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalHeader, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalTitle, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.changeStatus')), 1
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
            active: $data.isLoadingTenant,
            "onUpdate:active": _cache[0] || (_cache[0] = function ($event) {
              return $data.isLoadingTenant = $event;
            }),
            "is-full-page": false
          }, null, 8
          /* PROPS */
          , ["active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormLabel, {
            "for": "status"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.selectStatus')), 1
              /* TEXT */
              )];
            }),
            _: 1
            /* STABLE */

          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormSelect, {
            id: "status",
            modelValue: $data.newStatus,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
              return $data.newStatus = $event;
            })
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(['ACTIVE', 'INACTIVE', 'RESTRICTED'], function (status) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
                  value: status,
                  key: status
                }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(status), 9
                /* TEXT, PROPS */
                , _hoisted_2);
              }), 64
              /* STABLE_FRAGMENT */
              ))];
            }),
            _: 1
            /* STABLE */

          }, 8
          /* PROPS */
          , ["modelValue"])])];
        }),
        _: 1
        /* STABLE */

      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CModalFooter, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, {
            color: "light",
            onClick: _cache[2] || (_cache[2] = function () {
              _this.showStatusUpdateModal = false;
            })
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.cancel')), 1
              /* TEXT */
              )];
            }),
            _: 1
            /* STABLE */

          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, {
            color: "primary",
            onClick: $options.updateTenantStatus
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
  , ["visible"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, {
    "class": "mb-3"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardBody, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
                    active: $data.isLoadingTenant,
                    "onUpdate:active": _cache[4] || (_cache[4] = function ($event) {
                      return $data.isLoadingTenant = $event;
                    }),
                    "is-full-page": false
                  }, null, 8
                  /* PROPS */
                  , ["active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, {
                    "class": "mb-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 8
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.tenantOverview')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 4,
                        "class": "d-block"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CBadge, {
                            color: $data.tenant.status === 'ACTIVE' ? 'success' : 'danger',
                            "class": "d-flex align-items-center",
                            onClick: _cache[5] || (_cache[5] = function () {
                              _this.showStatusUpdateModal = !$data.showStatusUpdateModal;
                            })
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tenant.status), 1
                              /* TEXT */
                              )];
                            }),
                            _: 1
                            /* STABLE */

                          }, 8
                          /* PROPS */
                          , ["color"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CDropdown, {
                            "class": "ms-2",
                            color: "light",
                            variant: "btn-group"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CDropdownToggle, {
                                color: "light",
                                caret: false,
                                size: "sm"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                    icon: "cilOptions"
                                  })];
                                }),
                                _: 1
                                /* STABLE */

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CDropdownMenu, null, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CDropdownItem, {
                                    "class": "small",
                                    onClick: _cache[6] || (_cache[6] = function () {
                                      _this.$router.push("/tenants/".concat($data.tenant.id, "/edit"));
                                    })
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.edit')), 1
                                      /* TEXT */
                                      )];
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

                          })])];
                        }),
                        _: 1
                        /* STABLE */

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, {
                    "class": "g-3"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        md: 9
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tenant.name), 1
                          /* TEXT */
                          ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CBadge, {
                            "class": "me-4",
                            color: "primary"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
                                href: $options.windowLocationProtocol + '//' + $data.tenant.id + '.' + $options.windowLocationHost,
                                "class": "text-white text-decoration-none",
                                target: "_blank"
                              }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.windowLocationProtocol) + "//" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tenant.id) + "." + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.windowLocationHost), 1
                              /* TEXT */
                              ), _hoisted_10], 8
                              /* PROPS */
                              , _hoisted_8)];
                            }),
                            _: 1
                            /* STABLE */

                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CBadge, {
                            "class": "d-flex align-items-center me-4",
                            color: "info"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.tenant.plan), 1
                              /* TEXT */
                              )];
                            }),
                            _: 1
                            /* STABLE */

                          })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$tc('labels.createdAt', {
                            dateTime: $options.tenantCreatedAt
                          })), 1
                          /* TEXT */
                          ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CAvatar, {
                            src: $data.defaultAvatar,
                            size: "md"
                          }, null, 8
                          /* PROPS */
                          , ["src"]), _hoisted_15]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CAvatar, {
                            src: $data.defaultAvatar,
                            size: "md"
                          }, null, 8
                          /* PROPS */
                          , ["src"]), _hoisted_17])])];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, {
                            "class": "g-3"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                                md: 12
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, {
                                    color: "primary",
                                    "text-color": "white"
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardBody, null, {
                                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                            icon: "cilOptions"
                                          })]), _hoisted_20];
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

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                                md: 12
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, {
                                    color: "warning",
                                    "text-color": "white"
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardBody, null, {
                                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                            icon: "cilOptions"
                                          })]), _hoisted_23];
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

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                                md: 12
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, {
                                    color: "danger",
                                    "text-color": "white"
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardBody, null, {
                                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                            icon: "cilOptions"
                                          })]), _hoisted_26];
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
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol)];
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

      })];
    }),
    _: 1
    /* STABLE */

  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, {
    "class": "mb-3"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, {
            "class": "modules-card"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardHeader, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [$data.tenant && !$data.isLoadingModules ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CRow, {
                    key: 0
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        sm: 8
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.availableModules')), 1
                          /* TEXT */
                          ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.totalCount')) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.modules.length), 1
                          /* TEXT */
                          )])];
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

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardBody, {
                "class": "modules-card"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
                    active: $data.isLoadingModules,
                    "onUpdate:active": _cache[7] || (_cache[7] = function ($event) {
                      return $data.isLoadingModules = $event;
                    }),
                    "is-full-page": false
                  }, null, 8
                  /* PROPS */
                  , ["active"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CAccordion, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.modules, function (module) {
                        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CAccordionItem, {
                          key: module
                        }, {
                          "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                            return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CAccordionHeader, {
                              "class": ""
                            }, {
                              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(module.name), 1
                                /* TEXT */
                                ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CBadge, {
                                  "class": "ms-3 me-4",
                                  color: $options.isModuleActive(module.name) ? 'success' : 'secondary'
                                }, {
                                  "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                    return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.isModuleActive(module.name) ? _ctx.$t('status.active').toUpperCase() : _ctx.$t('status.inactive').toUpperCase()), 1
                                    /* TEXT */
                                    )];
                                  }),
                                  _: 2
                                  /* DYNAMIC */

                                }, 1032
                                /* PROPS, DYNAMIC_SLOTS */
                                , ["color"])])];
                              }),
                              _: 2
                              /* DYNAMIC */

                            }, 1024
                            /* DYNAMIC_SLOTS */
                            ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CAccordionBody, null, {
                              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CFormSwitch, {
                                  id: module,
                                  "class": "btn",
                                  size: "lg",
                                  label: _ctx.$t('labels.setModuleActive'),
                                  "model-value": $options.isModuleActive(module.name),
                                  onChange: function onChange($event) {
                                    return $options.setModuleUpdateFields($event, module.name);
                                  }
                                }, null, 8
                                /* PROPS */
                                , ["id", "label", "model-value", "onChange"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(module.description), 1
                                /* TEXT */
                                )];
                              }),
                              _: 2
                              /* DYNAMIC */

                            }, 1024
                            /* DYNAMIC_SLOTS */
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

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardFooter, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, {
                    color: "primary",
                    "class": "float-end",
                    size: "sm",
                    disabled: $data.moduleUpdateData.modules.length === 0,
                    onClick: $options.addUpdateTenantModules
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.saveChanges')), 1
                      /* TEXT */
                      )];
                    }),
                    _: 1
                    /* STABLE */

                  }, 8
                  /* PROPS */
                  , ["disabled", "onClick"])];
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

  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, {
    "class": "mb-3"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
        md: 6
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCard, {
            "class": "oneflow-card"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCardHeader, null, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        md: 8
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.oneFlowAccount')), 1
                          /* TEXT */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                        md: 4,
                        "class": "d-flex justify-content-end"
                      }, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButtonGroup, {
                            role: "group"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CTooltip, {
                                content: _ctx.$t('actions.view'),
                                placement: "top"
                              }, {
                                toggler: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (_ref) {
                                  var on = _ref.on;
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toHandlers)(on), {
                                    onClick: _cache[8] || (_cache[8] = function ($event) {
                                      return _this.$router.push('/tenants/oneflow-accounts');
                                    }),
                                    color: "primary",
                                    size: "sm"
                                  }), {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                        icon: "cilBlur",
                                        size: "sm"
                                      })];
                                    }),
                                    _: 2
                                    /* DYNAMIC */

                                  }, 1040
                                  /* FULL_PROPS, DYNAMIC_SLOTS */
                                  )];
                                }),
                                _: 1
                                /* STABLE */

                              }, 8
                              /* PROPS */
                              , ["content"])];
                            }),
                            _: 1
                            /* STABLE */

                          }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CDropdown, {
                            "class": "ms-2",
                            color: "light",
                            variant: "btn-group"
                          }, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CDropdownToggle, {
                                color: "light",
                                caret: false,
                                size: "sm"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CIcon, {
                                    icon: "cilOptions"
                                  })];
                                }),
                                _: 1
                                /* STABLE */

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CDropdownMenu, null, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CDropdownItem, {
                                    "class": "small"
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.edit')), 1
                                      /* TEXT */
                                      )];
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

                      })];
                    }),
                    _: 1
                    /* STABLE */

                  })];
                }),
                _: 1
                /* STABLE */

              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Loading, {
                active: $data.isLoadingTenant,
                "onUpdate:active": _cache[9] || (_cache[9] = function ($event) {
                  return $data.isLoadingTenant = $event;
                }),
                "is-full-page": false
              }, null, 8
              /* PROPS */
              , ["active"]), $data.oneFlowAccount ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CCardBody, {
                key: 0
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, null, {
                        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CRow, null, {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                                md: 9,
                                "class": "mb-2"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.accountFirstNameLastName').toUpperCase()), 1
                                  /* TEXT */
                                  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.oneFlowAccount.name), 1
                                  /* TEXT */
                                  )];
                                }),
                                _: 1
                                /* STABLE */

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                                md: 3
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CBadge, {
                                    "class": "float-end",
                                    color: $data.oneFlowAccount.status === 'ACTIVE' ? 'success' : 'danger'
                                  }, {
                                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.oneFlowAccount.status), 1
                                      /* TEXT */
                                      )];
                                    }),
                                    _: 1
                                    /* STABLE */

                                  }, 8
                                  /* PROPS */
                                  , ["color"])];
                                }),
                                _: 1
                                /* STABLE */

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                                md: 12,
                                "class": "mb-2"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.organizerTitle').toUpperCase()), 1
                                  /* TEXT */
                                  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.oneFlowAccount.title), 1
                                  /* TEXT */
                                  )];
                                }),
                                _: 1
                                /* STABLE */

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                                md: 6,
                                "class": "mb-2"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.email').toUpperCase()), 1
                                  /* TEXT */
                                  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.oneFlowAccount.email), 1
                                  /* TEXT */
                                  )];
                                }),
                                _: 1
                                /* STABLE */

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                                md: 6,
                                "class": "mb-2"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.mobile').toUpperCase()), 1
                                  /* TEXT */
                                  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [$data.oneFlowAccount.country_code ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CIcon, {
                                    key: 0,
                                    "class": "mb-2",
                                    icon: 'cif-' + $data.oneFlowAccount.country_code.toLowerCase(),
                                    size: "xl"
                                  }, null, 8
                                  /* PROPS */
                                  , ["icon"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.oneFlowAccount.mobile), 1
                                  /* TEXT */
                                  )])];
                                }),
                                _: 1
                                /* STABLE */

                              }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CCol, {
                                md: 12,
                                "class": "mb-2"
                              }, {
                                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('labels.token').toUpperCase()), 1
                                  /* TEXT */
                                  ), $data.oneFlowAccount.token ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h6", _hoisted_40, "****" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.oneFlowAccount.token.substr(-4)), 1
                                  /* TEXT */
                                  )) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
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

                  })];
                }),
                _: 1
                /* STABLE */

              })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), !$data.oneFlowAccount && !$data.isLoadingTenant ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_CCardBody, {
                key: 1,
                "class": "d-flex flex-column align-items-center justify-content-center p-5"
              }, {
                "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                  return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$tc('messages.noOneFlowFor', {
                    name: $data.tenant.name
                  })), 1
                  /* TEXT */
                  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButtonGroup, {
                    role: "group"
                  }, {
                    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CTooltip, {
                        content: _ctx.$t('actions.add'),
                        placement: "top"
                      }, {
                        toggler: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (_ref2) {
                          var on = _ref2.on;
                          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_CButton, (0,vue__WEBPACK_IMPORTED_MODULE_0__.mergeProps)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toHandlers)(on), {
                            onClick: _cache[10] || (_cache[10] = function () {
                              _this.$router.push('/tenants/oneflow-accounts');
                            }),
                            color: "primary",
                            size: "sm"
                          }), {
                            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('actions.addAccount')), 1
                              /* TEXT */
                              )];
                            }),
                            _: 2
                            /* DYNAMIC */

                          }, 1040
                          /* FULL_PROPS, DYNAMIC_SLOTS */
                          )];
                        }),
                        _: 1
                        /* STABLE */

                      }, 8
                      /* PROPS */
                      , ["content"])];
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

      }), !$data.isLoadingTenant && $data.oneFlowAccount !== null && $data.tenant.id !== null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_ContractTemplates, {
        key: 0,
        tenantId: $data.tenant.id
      }, null, 8
      /* PROPS */
      , ["tenantId"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1
    /* STABLE */

  })], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modules-card[data-v-2234f954] {\n  max-height: 800px;\n  overflow-y: auto;\n}\n.oneflow-card[data-v-2234f954] {\n  height: 338px;\n  overflow-y: auto;\n}\n.oneflow-card .title[data-v-2234f954] {\n  font-weight: bold;\n  margin-bottom: 0.5rem;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.template-card {\n  height: 338px;\n  overflow-y: auto;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewTenant_vue_vue_type_style_index_0_id_2234f954_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewTenant_vue_vue_type_style_index_0_id_2234f954_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewTenant_vue_vue_type_style_index_0_id_2234f954_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContractTemplates_vue_vue_type_style_index_0_id_7e88f2ec_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContractTemplates_vue_vue_type_style_index_0_id_7e88f2ec_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContractTemplates_vue_vue_type_style_index_0_id_7e88f2ec_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/contracts/ContractTemplates.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/contracts/ContractTemplates.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ContractTemplates_vue_vue_type_template_id_7e88f2ec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContractTemplates.vue?vue&type=template&id=7e88f2ec */ "./resources/js/views/contracts/ContractTemplates.vue?vue&type=template&id=7e88f2ec");
/* harmony import */ var _ContractTemplates_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContractTemplates.vue?vue&type=script&lang=js */ "./resources/js/views/contracts/ContractTemplates.vue?vue&type=script&lang=js");
/* harmony import */ var _ContractTemplates_vue_vue_type_style_index_0_id_7e88f2ec_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css */ "./resources/js/views/contracts/ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css");
/* harmony import */ var D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ContractTemplates_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ContractTemplates_vue_vue_type_template_id_7e88f2ec__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/views/contracts/ContractTemplates.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/tenants/ViewTenant.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/tenants/ViewTenant.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewTenant_vue_vue_type_template_id_2234f954_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewTenant.vue?vue&type=template&id=2234f954&scoped=true */ "./resources/js/views/tenants/ViewTenant.vue?vue&type=template&id=2234f954&scoped=true");
/* harmony import */ var _ViewTenant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewTenant.vue?vue&type=script&lang=js */ "./resources/js/views/tenants/ViewTenant.vue?vue&type=script&lang=js");
/* harmony import */ var _ViewTenant_vue_vue_type_style_index_0_id_2234f954_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true */ "./resources/js/views/tenants/ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true");
/* harmony import */ var D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,D_Rofilabs_Stream_Websockets_main_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ViewTenant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ViewTenant_vue_vue_type_template_id_2234f954_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-2234f954"],['__file',"resources/js/views/tenants/ViewTenant.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/contracts/ContractTemplates.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./resources/js/views/contracts/ContractTemplates.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContractTemplates_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContractTemplates_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ContractTemplates.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/tenants/ViewTenant.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/views/tenants/ViewTenant.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewTenant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewTenant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewTenant.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/contracts/ContractTemplates.vue?vue&type=template&id=7e88f2ec":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/contracts/ContractTemplates.vue?vue&type=template&id=7e88f2ec ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContractTemplates_vue_vue_type_template_id_7e88f2ec__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContractTemplates_vue_vue_type_template_id_7e88f2ec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ContractTemplates.vue?vue&type=template&id=7e88f2ec */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=template&id=7e88f2ec");


/***/ }),

/***/ "./resources/js/views/tenants/ViewTenant.vue?vue&type=template&id=2234f954&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/tenants/ViewTenant.vue?vue&type=template&id=2234f954&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewTenant_vue_vue_type_template_id_2234f954_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewTenant_vue_vue_type_template_id_2234f954_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewTenant.vue?vue&type=template&id=2234f954&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=template&id=2234f954&scoped=true");


/***/ }),

/***/ "./resources/js/views/tenants/ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true":
/*!************************************************************************************************************!*\
  !*** ./resources/js/views/tenants/ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ViewTenant_vue_vue_type_style_index_0_id_2234f954_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/tenants/ViewTenant.vue?vue&type=style&index=0&id=2234f954&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/js/views/contracts/ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css":
/*!********************************************************************************************************!*\
  !*** ./resources/js/views/contracts/ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContractTemplates_vue_vue_type_style_index_0_id_7e88f2ec_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/contracts/ContractTemplates.vue?vue&type=style&index=0&id=7e88f2ec&lang=css");


/***/ })

}]);