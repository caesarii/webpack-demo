(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["webpackNumbers"] = factory(require("lodash"));
	else
		root["webpackNumbers"] = factory(root["_"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_lodash__) {
return (window["webpackJsonpwebpackNumbers"] = window["webpackJsonpwebpackNumbers"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: numToWord, wordToNum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numToWord", function() { return numToWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wordToNum", function() { return wordToNum; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ref_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ref.json */ "./src/ref.json");
var _ref_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./ref.json */ "./src/ref.json", 1);



function numToWord(num) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reduce(_ref_json__WEBPACK_IMPORTED_MODULE_1__, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
}

function wordToNum(word) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reduce(_ref_json__WEBPACK_IMPORTED_MODULE_1__, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
}

/***/ }),

/***/ "./src/ref.json":
/*!**********************!*\
  !*** ./src/ref.json ***!
  \**********************/
/*! exports provided: 0, 1, 2, 3, 4, 5, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"num\":1,\"word\":\"One\"},{\"num\":2,\"word\":\"Two\"},{\"num\":3,\"word\":\"Three\"},{\"num\":4,\"word\":\"Four\"},{\"num\":5,\"word\":\"Five\"},{\"num\":0,\"word\":\"Zero\"}]");

/***/ }),

/***/ "lodash":
/*!*************************************************************************************!*\
  !*** external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

},[["./src/index.js","runtime~main"]]]);
});
//# sourceMappingURL=main.webpack-numbers.js.map