"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      videoPath: ""
    };
  },
  onLoad() {
  },
  onShow() {
    let srcData = "";
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("acceptDataFromOpenerPage", function(data) {
      srcData = data.data;
    });
    this.$set(this.$data, "videoPath", srcData);
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.videoPath
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/xyx/Documents/HBuilderProjects/myProgram/pages/video/video.vue"]]);
wx.createPage(MiniProgramPage);
