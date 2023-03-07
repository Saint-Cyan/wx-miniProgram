"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      userLevel: "\u672A\u767B\u5F55",
      playSrc: "http://localhost:7788/public/gaoxueyayufang.mp4",
      swiperList: [
        {
          image: "http://localhost:7788/public/gaoxueyayufang.png",
          title: "\u9AD8\u8840\u538B\u7684\u5371\u5BB3",
          source: "http://localhost:7788/public/gaoxueyayufang.mp4"
        },
        {
          image: "http://localhost:7788/public/gaoxueyaweihai.png",
          title: "\u9AD8\u8840\u538B\u5371\u5BB3",
          source: "http://localhost:7788/public/gaoxueyaweihai.mp4"
        },
        {
          image: "http://localhost:7788/public/gaoxueyazhuyi.png",
          title: "\u9AD8\u8840\u538B\u6CE8\u610F",
          source: "http://localhost:7788/public/gaoxueyazhuyi.mp4"
        }
      ]
    };
  },
  onLoad: function() {
    console.log("page load");
  },
  onShow: function() {
    try {
      const check = common_vendor.index.getStorageSync("userStatus");
      if (check == 0) {
        console.log("\u7528\u6237\u672A\u767B\u5F55");
      }
      if (check == 1) {
        console.log("\u7528\u6237\u5DF2\u767B\u5F55");
        const testStatus = common_vendor.index.getStorageSync("is_test");
        const level = common_vendor.index.getStorageSync("level");
        if (testStatus == 0) {
          common_vendor.index.showModal({
            title: "\u610F\u5411\u8C03\u67E5",
            content: "\u5F00\u59CB\u524D\uFF0C\u8BF7\u60A8\u56DE\u7B54\u4E00\u4E2A\u5C0F\u95EE\u9898",
            confirmText: "\u73B0\u5728\u524D\u5F80",
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                common_vendor.wx$1.navigateTo({
                  url: "../test/test"
                });
              }
            }
          });
        }
        if (level == "1") {
          this.updateUserLevel("\u65E0\u610F\u5411\u8005");
        } else if (level == "2") {
          this.updateUserLevel("\u610F\u5411\u8005");
        } else if (level == "3") {
          this.updateUserLevel("\u884C\u52A8\u8005");
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    updateUserLevel(newLevel) {
      this.userLevel = newLevel;
    },
    toIntroduce() {
      const src = this.playSrc;
      common_vendor.index.navigateTo({
        url: "/pages/video/video",
        success(res) {
          res.eventChannel.emit("acceptDataFromOpenerPage", { data: src });
        }
      });
    },
    showIndex(e) {
      const playSource = this.$data.swiperList[e.detail.current].source;
      this.$set(this.$data, "playSrc", playSource);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item.image,
        b: index
      };
    }),
    b: common_vendor.o((...args) => $options.showIndex && $options.showIndex(...args)),
    c: common_vendor.o((...args) => $options.toIntroduce && $options.toIntroduce(...args)),
    d: common_vendor.t($data.userLevel)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/xyx/Documents/HBuilderProjects/myProgram/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
