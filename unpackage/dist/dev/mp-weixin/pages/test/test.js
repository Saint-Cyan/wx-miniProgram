"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      items: [
        { value: "opt_1", name: "\u6CA1\u6709\uFF0C\u4E14\u6211\u4E0D\u6253\u7B97\u5F00\u59CB" },
        { value: "opt_2", name: "\u6CA1\u6709\uFF0C\u4F46\u6211\u6B63\u5728\u8003\u8651" },
        { value: "opt_3", name: "\u6CA1\u6709\uFF0C\u4F46\u6211\u8BA4\u771F\u6253\u7B97\u5F00\u59CB" },
        { value: "opt_4", name: "\u662F\u7684\uFF0C\u4F46\u662F\u53EA\u662F\u5F00\u59CB\u4E00\u6BB5\u65F6\u95F4" },
        { value: "opt_5", name: "\u662F\u7684\uFF0C\u5DF2\u7ECF\u6301\u7EED\u5F88\u957F\u65F6\u95F4" }
      ]
    };
  },
  methods: {
    formSubmit: function(e) {
      common_vendor.index.getStorageSync("test");
      console.log(common_vendor.index.getStorageSync("id"));
      if (common_vendor.index.getStorageSync("id") != "") {
        common_vendor.index.request({
          url: "http://localhost:7788/test",
          header: { "content-type": "application/x-www-form-urlencoded" },
          method: "POST",
          data: {
            id: common_vendor.index.getStorageSync("id"),
            test: common_vendor.index.getStorageSync("test")
          },
          success: (res) => {
            if (res.statusCode == 200) {
              console.log("\u95EE\u5377\u767B\u5165\u6210\u529F");
              common_vendor.index.setStorageSync("is_test", "1");
              common_vendor.index.showToast({
                icon: "success",
                title: "\u8C22\u8C22\u60A8\u7684\u56DE\u7B54"
              });
              common_vendor.index.switchTab({
                url: "/pages/index/index"
              });
            } else if (res.statusCode == 301) {
              console.log("\u767B\u5F55\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55");
              common_vendor.index.showToast({
                icon: "error",
                title: "\u767B\u5F55\u8FC7\u671F"
              });
              common_vendor.index.setStorageSync("userStatus", 0);
              common_vendor.index.removeStorageSync("level");
              common_vendor.index.removeStorageSync("coin");
              common_vendor.index.removeStorageSync("is_test");
              common_vendor.index.removeStorageSync("id");
              common_vendor.index.removeStorageSync("test");
              common_vendor.index.reLaunch({
                url: "/pages/index/index"
              });
            } else if (res.statusCode == 500) {
              common_vendor.index.showToast({
                icon: "error",
                title: "\u670D\u52A1\u5668\u51FA\u9519\uFF0C\u7A0D\u540E\u518D\u8BD5"
              });
            }
          }
        });
      }
      console.log("\u63D0\u4EA4\u8868\u5355");
    },
    handleRadio: function(e) {
      common_vendor.index.setStorageSync("test", e.detail.value);
      console.log(common_vendor.index.getStorageSync("test"));
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: item.value,
        b: common_vendor.t(item.name),
        c: item.value
      };
    }),
    b: common_vendor.o((...args) => $options.handleRadio && $options.handleRadio(...args)),
    c: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/xyx/Documents/HBuilderProjects/myProgram/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
