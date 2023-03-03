"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/mine/mine.js";
  "./pages/learn/learn.js";
  "./pages/login/login.js";
  "./pages/enroll/enroll.js";
  "./pages/test/test.js";
}
const _sfc_main = {
  globalData: {
    userStatus: 0
  },
  onLaunch: function() {
    console.log("App Launch");
    common_vendor.index.setStorageSync("userStatus", 0);
    console.log("\u7528\u6237\u72B6\u6001\u7801\u521D\u59CB\u5316");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
    common_vendor.index.removeStorageSync("userStatus");
    common_vendor.index.removeStorageSync("level");
    common_vendor.index.removeStorageSync("coin");
    common_vendor.index.removeStorageSync("is_test");
    common_vendor.index.removeStorageSync("id");
    common_vendor.index.removeStorageSync("test");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/xyx/Documents/HBuilderProjects/myProgram/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
