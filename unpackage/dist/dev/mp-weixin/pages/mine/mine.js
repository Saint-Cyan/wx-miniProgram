"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loginStatus: 0
    };
  },
  onShow: function() {
    console.log("\u6211\u7684\u9875\u9762\u663E\u793A");
    const check = common_vendor.index.getStorageSync("userStatus");
    this.$set(this.$data, "loginStatus", check);
    console.log("\u7528\u6237\u72B6\u6001", check);
  },
  methods: {
    unLogin: function(e) {
      common_vendor.index.setStorageSync("userStatus", 0);
      common_vendor.index.setStorageSync("level", "0");
      common_vendor.index.setStorageSync("coin", "2000");
      common_vendor.index.setStorageSync("is_test", "0");
      common_vendor.index.setStorageSync("id", "");
      common_vendor.index.showToast({
        title: "\u9000\u51FA\u767B\u5F55",
        icon: "none"
      });
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    },
    wxLogin: function(e) {
      common_vendor.index.getUserProfile({
        lang: "zh_CN",
        desc: "\u83B7\u53D6\u4E2A\u4EBA\u4FE1\u606F\u7528\u4E8E\u767B\u5F55",
        success: (res) => {
          console.log(res.encryptedData);
          console.log(res.iv);
          common_vendor.index.login({
            success: (codeData) => {
              console.log(codeData.code);
              common_vendor.index.showLoading({
                title: "\u767B\u5F55\u4E2D"
              });
              common_vendor.index.request({
                url: "http://localhost:7788/login",
                header: { "content-type": "application/x-www-form-urlencoded" },
                data: {
                  code: codeData.code,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                method: "POST",
                success: (login) => {
                  if (login.statusCode == 200) {
                    console.log(login.data);
                    common_vendor.index.setStorageSync("userStatus", 1);
                    common_vendor.index.setStorageSync("level", login.data.level);
                    common_vendor.index.setStorageSync("coin", login.data.coin);
                    common_vendor.index.setStorageSync("is_test", login.data.is_test);
                    common_vendor.index.setStorageSync("id", login.data.user_id);
                  }
                  common_vendor.index.showToast({
                    title: "\u767B\u5F55\u6210\u529F",
                    icon: "success"
                  });
                  common_vendor.index.reLaunch({
                    url: "/pages/index/index"
                  });
                },
                fail: (err) => {
                  console.log(err);
                  common_vendor.index.showToast({
                    title: "\u767B\u5F55\u5931\u8D25",
                    icon: "error"
                  });
                }
              });
            }
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.loginStatus == 1
  }, $data.loginStatus == 1 ? {
    b: common_vendor.o((...args) => $options.unLogin && $options.unLogin(...args))
  } : {}, {
    c: $data.loginStatus == 0
  }, $data.loginStatus == 0 ? {
    d: common_vendor.o((...args) => $options.wxLogin && $options.wxLogin(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/xyx/Documents/HBuilderProjects/myProgram/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
