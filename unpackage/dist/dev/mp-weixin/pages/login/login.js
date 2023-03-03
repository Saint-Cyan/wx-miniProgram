"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      code: null
    };
  },
  onShow: function() {
    const check = common_vendor.index.getStorageSync("userStatus");
    if (check == null) {
      common_vendor.index.setStorageSync("userStatus", 0);
      console.log("\u751F\u6210\u7528\u6237\u72B6\u6001");
    }
    if (check == 1) {
      console.log("\u6B22\u8FCE\u7528\u6237");
    }
    if (check == 0) {
      console.log("\u8BF7\u767B\u5F55");
    }
  },
  methods: {
    toEnroll: function() {
      common_vendor.wx$1.navigateTo({
        url: "../enroll/enroll"
      });
    },
    weixinLogin: function(e) {
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
                    common_vendor.index.setStorageSync("userStatus", 1);
                    common_vendor.index.setStorageSync("level", login.data.level);
                    common_vendor.index.setStorageSync("coin", login.data.coin);
                    common_vendor.index.setStorageSync("is_test", login.data.is_test);
                    common_vendor.index.setStorageSync("token", login.data.token);
                    let check_unserStatus = common_vendor.index.getStorageSync("userStatus");
                    let check_level = common_vendor.index.getStorageSync("level");
                    let check_coin = common_vendor.index.getStorageSync("coin");
                    let check_test = common_vendor.index.getStorageSync("is_test");
                    let check_token = common_vendor.index.getStorageSync("token");
                    console.log(check_coin, check_level, check_unserStatus, check_test, check_token);
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
    },
    log: function(e) {
      common_vendor.wx$1.login({
        timeout: 6e5,
        success: (res) => {
          common_vendor.wx$1.request({
            url: "http://localhost:7788/login",
            method: "POST",
            header: { "content-type": "application/x-www-form-urlencoded" },
            data: {
              userid: e.detail.value.userid,
              password: e.detail.value.password
            },
            success: (res2) => {
              if (res2.statusCode == 200) {
                common_vendor.wx$1.showModal({
                  title: "\u767B\u5F55\u6210\u529F",
                  content: "\u6B22\u8FCE\u56DE\u6765",
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.wx$1.switchTab({
                        url: "../index/index"
                      });
                    }
                    if (res3.cancel)
                      ;
                  }
                });
              }
              if (res2.statusCode == 401) {
                common_vendor.wx$1.showModal({
                  title: "\u767B\u5F55\u5931\u8D25",
                  content: "\u8BF7\u68C0\u67E5\u60A8\u7684\u8D26\u53F7\u548C\u5BC6\u7801",
                  success: (res3) => {
                    if (res3.confirm)
                      ;
                    if (res3.cancel)
                      ;
                  }
                });
              }
            }
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.userid,
    b: common_vendor.o(($event) => _ctx.userid = $event.detail.value),
    c: _ctx.password,
    d: common_vendor.o(($event) => _ctx.password = $event.detail.value),
    e: common_vendor.o((...args) => $options.weixinLogin && $options.weixinLogin(...args)),
    f: common_vendor.o((...args) => $options.toEnroll && $options.toEnroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/xyx/Documents/HBuilderProjects/myProgram/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
