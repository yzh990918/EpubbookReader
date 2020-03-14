<template>
  <div class="SettingFont">
    <transition name="slideUp">
      <div class="setting-wrapper" v-show="menuVisable && selectedNum === 3">
        <div class="setting-font-size">
          <div class="preview">
            A-
          </div>
          <div class="slide-wrapper">
            <Slider
              :min="12"
              :max="24"
              bar-height="4px"
              active-color="#5f5f56"
              button-size="15"
              v-model="value"
              inactive-color="#d4d4cf"
              @change="onChange"
            ></Slider>
          </div>
          <div class="preview">
            A+
          </div>
        </div>
        <div class="settingfamily">
          <div class="text" @click="showPoup">{{ defaultFontFamily }}</div>
          <div class="icon">
            <span class="icon-forward"></span>
          </div>
        </div>

        <!-- <div class="setting-font-family" @click.stop="showFontFamilySetting">
          <div class="setting-font-family-text-wrapper">
            <span class="setting-font-family-text">{{
              defaultFontFamily
            }}</span>
          </div>
          <div class="setting-font-family-icon-wrapper">
            <span class="icon-forward"></span>
          </div>
        </div> -->
      </div>
    </transition>
    <div class="propup-wrapper">
      <Popup v-model="flag" position="bottom">
        <cell-group>
          <div class="title">
            <div class="icon-wrapper">
              <van-icon
                name="https://image.yangxiansheng.top/img/规则 (2).png?imagelist"
              />
            </div>
            <cell size="large" title="部分字体由[阿里巴巴iconfont]提供"></cell>
          </div>
          <div
            class="item"
            v-for="(item, index) in fontFamilylist"
            :key="index"
          >
            <cell size="large" :value="item.font"></cell>
            <div class="button-wrapper">
              <Button
                ref="button"
                :disabled="isselected(item.font)"
                @click="setfamily(item.font)"
                color="#455a66"
                plain
                >{{ isselected(item.font) ? "当前" : "使用" }}</Button
              >
            </div>
          </div>
        </cell-group>
      </Popup>
    </div>
  </div>
</template>

<script>
import { bookmixin } from "../../mixin/index";
import { Slider, Popup, Cell, CellGroup, Button } from "vant";
import { saveFontSize, saveFontFamily, getFontSize } from "../../mixin/storage";
export default {
  mixins: [bookmixin],
  name: "",
  props: [""],

  data() {
    return {
      flag: false,
      value: 0
    };
  },

  created() {},
  components: { Slider, Popup, Cell, CellGroup, Button },

  computed: {},

  beforeMount() {},

  mounted() {
    this.fontsize();
  },

  methods: {
    fontsize() {
      if (getFontSize(this.fileName) === 16) {
        this.value = 16;
        return this;
      }
      this.value = getFontSize(this.fileName);
    },
    setfamily(font) {
      // 设置 不同的字体 关键函数 但还需要注册字体文件 使用hook钩子
      this.setfontfamily(font);
      if (this.defaultFontFamily === "Default") {
        this.CurrentBook.rendition.themes.font("Times New Roman");
        saveFontFamily(this.fileName, "Default");
      } else {
        this.CurrentBook.rendition.themes.font(font);
        saveFontFamily(this.fileName, font);
      }
    },
    isselected(font) {
      if (this.defaultFontFamily === font) {
        return true;
      } else {
        return false;
      }
    },
    showPoup() {
      this.flag = true;
      this.setfamilyVisible(true);
    },
    showFontFamilySetting() {},
    setFontSize() {},
    onChange(value) {
      this.CurrentBook.rendition.themes.fontSize(value);
      saveFontSize(this.fileName, value);
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
@import '../../assets/styles/global.styl'
.setting-wrapper
  position: absolute
  display: flex
  flex-direction: column
  left: 0
  z-index: 201
  width: 100%
  margin-top: -4.2rem
  height: 2.4rem
  background: #F5EACC
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15)
  &.slideUp-enter, &.slideUp-leave-active
    transform: translate3d(0, 100%, 0)
    opacity: 0
&.slideUp-enter-active, &.slideUp-leave-active
  opacity: 1
  transition: all 0.2s linear
.setting-font-size
  display: flex
  flex: 2
  width: 100%
  center()
  .slide-wrapper
    flex: 1
  .preview
    flex: 0 0 15%
    color: #5f5f56
    font-size: 18px
    center()
.settingfamily
  display: flex
  margin-top: -4px
  width: 100%
  flex: 1
  center()
  .text
    font-size: 0.37rem
    ellipsis()
  .icon
    font-size: 0.37rem
    center()
.propup-wrapper
  font-size: 16px
  padding: 15px
  .title
    center()
    margin-left: 20px
    font-size: 10px
    height: 40px
    line-height: 18px
    .icon-wrapper
      center()
  .item
    height: 50px
    line-height: 20px
    margin-left: 20px
    border-bottom: 1px solid rgba(255, 255, 255, 0.3)
    position: relative
    display: flex
    .button-wrapper
      justify-content: flex-end
      display: flex
      align-items: center
</style>

<style>
.van-slider__button {
  background: #5f5f56;
}
.van-popup {
  max-height: 350px;
  overflow: scroll;
}
.van-popup,
.van-cell-group,
.van-cell {
  background: #f5eacc !important;
}
.van-icon {
  color: antiquewhite;
  font-size: 11px;
}
.van-cell__title {
  margin-left: 8px !important;
  font-size: 13px !important;
  line-height: 20px;
}
.van-cell__value,
.van-cell__value--alone {
  height: 50px !important;
  display: flex;
  align-items: center;
  color: #455a64;
  font-size: 13px;
  position: relative;
}
.van-button {
  border-radius: 10px;
  background-color: #f5eacc;
  outline: none;
  font-size: 13px;
  display: flex;
  justify-items: center;
  width: 60px;
  height: 23px;
  margin-right: 20px;
}
.van-button span {
  margin-top: -10px;
  white-space: nowrap;
  display: inline-block;
}
</style>
