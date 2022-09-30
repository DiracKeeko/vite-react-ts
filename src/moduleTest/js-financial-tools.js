(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jsFinancialTools = factory());
})(this, (function () { 'use strict';

  function isRealNumber(num) {
      return typeof num === "number" && !isNaN(num);
  }
  function float(num, precision, placeholder = "--") {
      const accuracy = isRealNumber(precision) ? precision : 2; // default digit
      if (!isRealNumber(num)) {
          return placeholder;
      }
      return num.toFixed(accuracy);
  }
  function percentage(num, precision, placeholder = "--") {
      const accuracy = isRealNumber(precision) ? precision : 2;
      if (!isRealNumber(num)) {
          return placeholder;
      }
      return `${(num * 100).toFixed(accuracy)}%`;
  }

  function getIntPartLength(num) {
      return Math.floor(Math.log10(Math.abs(num))) + 1;
  }

  function formatRank(val) {
      if (!isRealNumber(val)) {
          return "--";
      }
      return `No.${val}`;
  }
  function formatLongText(val, limit) {
      if (!val) {
          return "--";
      }
      if (val.length > limit) {
          return `${val.slice(0, limit)}...`;
      }
      return val;
  }
  function formatWithUnit(val, unitStr = "", precision = 2) {
      if (!isRealNumber(val)) {
          return "--";
      }
      let numStr;
      switch (unitStr) {
          case "万":
              numStr = float(val / 10 ** 4, precision);
              break;
          case "亿":
              numStr = float(val / 10 ** 8, precision);
              break;
          default:
              numStr = String(val);
              break;
      }
      return `${numStr}${unitStr}`;
  }
  function formatToMonetaryShape(val, precision = 2) {
      if (!isRealNumber(val)) {
          return "--";
      }
      const intPartLength = getIntPartLength(val);
      if (intPartLength > 8) {
          const num = val / 10 ** 8;
          return `${float(num, precision)}亿`;
      }
      if (intPartLength > 4) {
          const num = val / 10 ** 4;
          return `${float(num, precision)}万`;
      }
      return `${float(val, precision)}`;
  }
  function formatToFloat(val, plusSign = "", precision = 2, scale = 1) {
      if (!isRealNumber(val)) {
          return "--";
      }
      const num = val / scale;
      if (num > 0) {
          return `${plusSign}${float(num, precision)}`;
      }
      return float(num, precision);
  }
  function formatToPercent(val, plusSign = "", precision = 2, scale = 1) {
      if (!isRealNumber(val)) {
          return "--";
      }
      const num = val / scale;
      if (num > 0) {
          return `${plusSign}${percentage(num, precision)}`;
      }
      return percentage(num, precision);
  }

  var formatter = /*#__PURE__*/Object.freeze({
    __proto__: null,
    formatRank: formatRank,
    formatLongText: formatLongText,
    formatWithUnit: formatWithUnit,
    formatToMonetaryShape: formatToMonetaryShape,
    formatToFloat: formatToFloat,
    formatToPercent: formatToPercent
  });

  var display = /*#__PURE__*/Object.freeze({
    __proto__: null,
    formatter: formatter
  });

  // import * as calc from "./calc";
  // import * as util from "./util";
  var index = {
      // ...calc,
      ...display,
      // ...util
  };

  return index;

}));
//# sourceMappingURL=js-financial-tools.js.map
