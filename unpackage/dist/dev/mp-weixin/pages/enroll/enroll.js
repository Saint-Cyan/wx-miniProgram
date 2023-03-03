"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    enroll: function(e) {
      console.log(e);
      if (e.detail.value.password != e.detail.value.passwordAgain) {
        common_vendor.wx$1.showModal({
          title: "\u5BC6\u7801\u8F93\u5165\u9519\u8BEF",
          content: "\u8BF7\u4FDD\u8BC1\u5BC6\u7801\u4E00\u81F4",
          success: (res) => {
            if (res.confirm)
              ;
            if (res.refuse)
              ;
          }
        });
      }
      common_vendor.wx$1.request({
        url: "http://localhost:7788/enroll",
        method: "POST",
        header: { "content-type": "application/x-www-form-urlencoded" },
        data: {
          userid: e.detail.value.userID,
          password: e.detail.value.password,
          phoneNumber: e.detail.value.phoneNumber
        },
        success: (res) => {
          if (res.statusCode == 200) {
            common_vendor.wx$1.showModal({
              title: "\u6CE8\u518C\u6210\u529F",
              content: "\u7528\u6237\u6CE8\u518C\u6210\u529F\uFF0C\u8BF7\u8FD4\u56DE\u767B\u5F55\u754C\u9762\u767B\u5F55",
              success: (res2) => {
                if (res2.confirm) {
                  common_vendor.wx$1.navigateTo({
                    url: "../login/login"
                  });
                }
                if (res2.cancel)
                  ;
              }
            });
          }
          if (res.statusCode == 500) {
            common_vendor.wx$1.showModal({
              title: "\u6CE8\u518C\u5931\u8D25",
              content: "\u7528\u6237\u540D\u5DF2\u7ECF\u5B58\u5728.",
              success: (res2) => {
                if (res2.confirm)
                  ;
                if (res2.cancel)
                  ;
              }
            });
          }
          if (res.statusCode == 301) {
            common_vendor.wx$1.showModal({
              title: "\u6CE8\u518C\u5931\u8D25",
              content: "\u6570\u636E\u5E93\u6545\u969C\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u4EBA\u5458\u3002",
              success: (res2) => {
                if (res2.confirm)
                  ;
                if (res2.cancel)
                  ;
              }
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.enroll && $options.enroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/xyx/Documents/HBuilderProjects/myProgram/pages/enroll/enroll.vue"]]);
wx.createPage(MiniProgramPage);
