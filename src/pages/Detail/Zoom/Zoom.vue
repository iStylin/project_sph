<template>
  <div class="spec-preview">
    <img :src="skuImages.imgUrl" />
    <div ref="event" class="event" @mousemove="maskMove"></div>
    <div class="big" >
      <img :src="skuImages.imgUrl" ref="bigImage"/>
    </div>
    <!-- 遮罩层--绿色部分 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      picIndex: 0,
    };
  },
  computed: {
    skuImages() {
      return this.skuImageList[this.picIndex] || {};
    },
  },
  mounted() {
    // 通过全局事件总线获取ImageList组件点击的图片索引，动态更换大图
    this.$bus.$on("getpicIndex", (picIndex) => {
      this.picIndex = picIndex;
    });
  },
  methods: {
    // 图片放大
    maskMove(e) {
      let mask = this.$refs.mask;
      let event = this.$refs.event;
      let bigImage  = this.$refs.bigImage;
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      // 限制遮罩层移动范围
      if (left < 0) {
        left = 0;
      }
      if(left>event.offsetWidth/2){
        left = event.offsetWidth/2;
      }
      if(top<0){
        top = 0;
      }
      if(top>event.offsetHeight/2)
      {
        top = event.offsetHeight/2;
      }
      // 遮罩层随鼠标移动
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 放大后的图片移动
      bigImage.style.left = - left*2 + "px";
      bigImage.style.top = - top*2 + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
