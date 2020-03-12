<template>
  <div class="SettingFont">
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="menuVisable && settingMenu === 2">
        <div class="setting-font-size" v-if="showTag === 0">
          <div
            class="preview"
            :style="{ fontSize: fontSizeList[0].fontSize + 'px' }"
          >
            A
          </div>
          <div class="select">
            <div
              class="select-wrapper"
              v-for="(item, index) in fontSizeList"
              :key="index"
              @click="setFontSize(item.fontSize)"
            >
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize === item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div
            class="preview"
            :style="{
              fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'
            }"
          >
            A
          </div>
        </div>
        <div class="setting-font-family" @click.stop="showFontFamilySetting">
          <div class="setting-font-family-text-wrapper">
            <span class="setting-font-family-text">{{
              defaultFontFamily
            }}</span>
          </div>
          <div class="setting-font-family-icon-wrapper">
            <span class="icon-forward"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},
  created() {},

  computed: {
    ...mapGetters(["settingMenu", "menuVisable"])
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang="stylus" scoped>
@import '../../assets/styles/global'
.setting-wrapper
   position: absolute;
   bottom: 1.8rem;
   left: 0;
   z-index: 101;
   width: 100%;
   height: px2rem(60);
   background: white;
   box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
   .setting-font-size
     display: flex;
     height: 100%;
     .preview
       flex: 0 0 px2rem(40);
       center();
     .select
       display: flex;
       flex: 1;
       .select-wrapper
         flex: 1;
         display: flex;
         align-items: center;
         &:first-child
           .line
             &:first-child
               border-top: none;
         &:last-child
           .line
             &:last-child
               border-top: none;
         .line
           flex: 1;
           height: 0;
           border-top: px2rem(1) solid #ccc;
         .point-wrapper
           position: relative;
           flex: 0 0 0;
           width: 0;
           height: px2rem(7);
           border-left: px2rem(1) solid #ccc;
           .point
             position: absolute;
             top: px2rem(-8);
             left: px2rem(-10);
             width: px2rem(20);
             height: px2rem(20);
             border-radius: 50%;
             background: white;
             border: px2rem(1) solid #ccc;
             box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
             center()
             .small-point
               width: px2rem(5);
               height: px2rem(5);
               background: black;
               border-radius: 50%;
  //  .setting-theme
  //    height: 100%;
  //    display: flex;
  //    .setting-theme-item
  //      flex: 1;
  //      display: flex;
  //      flex-direction: column;
  //      padding: px2rem(5);
  //      box-sizing: border-box;
  //      .preview
  //        flex: 1;
  //        border: px2rem(1) solid #ccc;
  //        box-sizing: border-box;
  //        &.no-border
  //          border: none;

  //      .text
  //        flex: 0 0 px2rem(20);
  //        font-size: px2rem(14);
  //        color: #ccc;
  //        @include center;
  //        &.selected
  //          color: #333;

  //  .setting-progress
  //    position: relative;
  //    width: 100%;
  //    height: 100%;
  //    .progress-wrapper
  //      width: 100%;
  //      height: 100%;
  //      @include center;
  //      padding: 0 px2rem(30);
  //      box-sizing: border-box;
  //      .progress
  //        width: 100%;
  //        -webkit-appearance: none;
  //        height: px2rem(2);
  //        background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
  //        background-size: 0 100%;
  //        &:focus
  //          outline: none;

  //        &::-webkit-slider-thumb
  //          -webkit-appearance: none;
  //          height: px2rem(20);
  //          width: px2rem(20);
  //          border-radius: 50%;
  //          background: white;
  //          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
  //          border: px2rem(1) solid #ddd;

  //    .text-wrapper
  //      position: absolute;
  //      left: 0;
  //      bottom: 0;
  //      width: 100%;
  //      color: #333;
  //      font-size: px2rem(12);
  //      text-align: center;
</style>
