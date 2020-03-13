<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { bookmixin } from "../../mixin/index";
import {
  getFontFamily,
  getFontSize,
  saveFontFamily,
  saveFontSize
} from "../../mixin/storage";
import Epub from "epubjs";
global.ePub = Epub;
export default {
  mixins: [bookmixin],
  name: "",
  props: [""],
  data() {
    return {
      Bookfilename: "",
      Book: {}
    };
  },

  components: {},
  created() {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.initEpub();
  },

  methods: {
    nextPage() {
      if (this.redition) {
        console.log("下一页");
        this.redition.next();
        this.hidemenu();
        this.setfamilyVisible(false);
      }
    },
    hidemenu() {
      this.setmenu(false);
      this.setSelectNum(-1);
    },
    prevPgae() {
      if (this.redition) {
        console.log("上一页");
        this.redition.prev();
        this.hidemenu();
        this.setfamilyVisible(false);
      }
    },
    toggleMenu() {
      this.setmenu(!this.menuVisable);
      if (this.menuVisable) {
        this.setSelectNum(-1);
        this.setfamilyVisible(false);
      }
    },
    loadingFontsize() {
      // 取到fontSize
      let fontSize = getFontSize(this.fileName);
      // 没有就写入当前默认的值
      if (!fontSize) {
        fontSize = 16;
        saveFontSize(this.fileName, fontSize);
        this.redition.themes.fontSize(fontSize);
      }
      // 读取到就更改字体大小
      this.redition.themes.fontSize(fontSize);
      saveFontSize(this.fileName, fontSize);
    },
    loadingFontfamily() {
      let fontfamily = getFontFamily(this.fileName);
      if (!fontfamily) {
        saveFontFamily(this.fileName, "Default");
        this.redition.themes.font(fontfamily);
      }
      this.redition.themes.font(fontfamily);
      this.setfontfamily(fontfamily);
    },

    initEpub() {
      this.setFileName(this.$route.params.fileName);
      const url = "https://store.yangxiansheng.top/epub/";
      let BookUrl = url + `${this.$route.params.fileName}.epub`;
      this.book = new Epub(BookUrl);
      this.Book = this.book;
      // this.setBook(this.book);
      // 渲染
      this.redition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default"
      });
      this.redition.display().then(() => {
        // 加载
        this.loadingFontsize();
        this.loadingFontfamily();
      });
      // 获取到手指滑动的时间 和偏移
      this.redition.on("touchstart", event => {
        // console.log(event);
        // 获取刚触摸屏幕的位置和时间(ms)
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.redition.on("touchend", event => {
        // 计算偏移 时差 右往左滑(负数)
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        const Timeinteval = event.timeStamp - this.touchStartTime;
        // console.log(offsetX, Timeinteval);

        // 定义规则
        // 偏移小于-30 并且滑动事件小于500ms 下一页
        if (Timeinteval < 500 && offsetX < -40) {
          this.nextPage();
        } else if (Timeinteval < 500 && offsetX > 40) {
          this.prevPgae();
        } else {
          this.toggleMenu();
        }
        // 禁止默认方法调用和传播
        // event.preventDefault();
        // event.stopImmediatePropagation();
      });
      this.setBook(this.Book);
      this.redition.hooks.content.register(contents => {
        // 异步加载全部字体文件
        Promise.all([
          contents.addStylesheet(
            "https://store.yangxiansheng.top/font/font1.css"
          ),
          contents.addStylesheet(
            "https://store.yangxiansheng.top/font/font2.css"
          ),
          contents.addStylesheet(
            "https://store.yangxiansheng.top/font/font3.css"
          ),
          contents.addStylesheet(
            "https://store.yangxiansheng.top/font/font4.css"
          ),
          contents.addStylesheet(
            "https://store.yangxiansheng.top/font/font5.css"
          ),
          contents.addStylesheet(
            "https://store.yangxiansheng.top/font/cabin.css"
          ),
          contents.addStylesheet(
            "https://store.yangxiansheng.top/font/montserrat.css"
          ),
          contents.addStylesheet(
            "https://store.yangxiansheng.top/font/tangerine.css"
          )
        ]).then(() => {
          console.log("加载完成");
        });
      });
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped></style>
