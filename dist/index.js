(function (modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;

    return module.exports;
  }

  return __webpack_require__(__webpack_require__.s = "./index.js");
})
({

  "./index.js":
    (function (module, exports, __webpack_require__) {
      eval(`const {
        getYear
      } = __webpack_require__('./utils.js');

      console.log(111, getYear());`)
    }),

  "./utils.js":
    (function (module, exports, __webpack_require__) {
      eval(`const {
        getTime
      } = __webpack_require__('./date.js');

      exports.getYear = function () {
        return getTime().getFullYear();
      };`)
    }),

  "./date.js":
    (function (module, exports, __webpack_require__) {
      eval(`exports.getTime = function () {
        return new Date();
      };`)
    }),

})