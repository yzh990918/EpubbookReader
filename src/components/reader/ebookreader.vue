<template>
  <div class="ebook-reader">
    <div
      class="ebook-reader-mask"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"
      @click="onMaskClick"
    ></div>
    <div id="read"></div>
  </div>
</template>

<script>
import { bookmixin } from "../../mixin/index";
import {
  getFontFamily,
  getFontSize,
  saveFontFamily,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from "../../mixin/storage";
import Epub from "epubjs";
import { themeList, addLink, removeAllCss } from "../../mixin/book";
global.ePub = Epub;
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  mixins: [bookmixin],
  name: "",
  props: [""],
  data() {
    return {
      Bookfilename: "",
      Book: {},
      show: false
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
    // 解决翻页事件bug
    move(e) {
      let offsetY = 0;
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY;
        this.setOffsetY(offsetY);
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY;
      }
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseEnter(e) {
      this.mouseMove = 1;
      this.mouseStartTime = e.timeStamp;
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseMove(e) {
      if (this.mouseMove === 1) {
        this.mouseMove = 2;
      } else if (this.mouseMove === 2) {
        let offsetY = 0;
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY;
          this.setOffsetY(offsetY);
        } else {
          this.firstOffsetY = e.clientY;
        }
      }
      e.preventDefault();
      e.stopPropagation();
    },
    onMouseEnd(e) {
      if (this.mouseMove === 2) {
        this.setOffsetY(0);
        this.firstOffsetY = 0;
        this.mouseMove = 3;
      }
      this.mouseEndTime = e.timeStamp;
      const time = this.mouseEndTime - this.mouseStartTime;
      if (time < 200) {
        this.mouseMove = 1;
      }
      e.preventDefault();
      e.stopPropagation();
    },
    moveEnd() {
      this.setOffsetY(0);
      this.firstOffsetY = 0;
    },
    onMaskClick(e) {
      if (this.mouseMove === 2) {
        console.log("1");
      } else if (this.mouseMove === 1 || this.mouseMove === 4) {
        const offsetX = e.offsetX;
        const width = window.innerWidth;
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPgae();
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage();
        } else {
          this.toggleMenu();
        }
      }
      this.mouseMove = 4;
    },
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
        saveFontSize(this.fileName, 16);
        this.setfonytsize(fontSize);
        this.this.redition.themes.fontSize(16);
      }
      // 读取到就更改字体大小
      this.redition.themes.fontSize(fontSize);
      saveFontSize(this.fileName, fontSize);
    },
    loadingFontfamily() {
      let fontfamily = getFontFamily(this.fileName);
      if (!fontfamily) {
        saveFontFamily(this.fileName, "Default");
        this.setfontfamily("Default");
        this.redition.themes.font("Times New Roman");
      }
      this.redition.themes.font(fontfamily);
      this.setfontfamily(fontfamily);
    },
    // 初始化主题文件
    initTheme() {
      let themelist = themeList();
      let Currenttheme = getTheme(this.fileName);
      if (!Currenttheme) {
        saveTheme(this.fileName, "Default");
        this.settheme("Default");
        this.redition.themes.select("Default");
      }
      // 注册主题属性
      themelist.forEach(theme => {
        this.redition.themes.register(theme.name, theme.style);
      });
      this.settheme(Currenttheme);
      this.redition.themes.select(Currenttheme);
    },
    // 设置全局样式
    initGlobaltheme() {
      removeAllCss();
      switch (this.defaultTheme) {
        case "Default":
          addLink(`https://store.yangxiansheng.top/theme/theme_default.css`);
          break;
        case "Eye":
          addLink(`https://store.yangxiansheng.top/theme/theme_eye.css`);
          break;
        case "Gold":
          addLink(`https://store.yangxiansheng.top/theme/theme_gold.css`);
          break;
        case "Night":
          addLink(`https://store.yangxiansheng.top/theme/theme_night.css`);
          break;
        default:
          this.saveTheme(this.defaultTheme);
          addLink(`https://store.yangxiansheng.top/theme/theme_default.css`);
          break;
      }
    },
    // 加载上次阅读位置
    initLocation() {
      const currentLocation = getLocation(this.fileName);
      this.redition.display(currentLocation);
    },
    //加载图书信息
    initBookInfo() {
      // 封面
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setcover(url);
        });
      });
      // 章节信息
      this.book.loaded.navigation.then(nav => {
        //  定义拆解目录算法 得到一维数组目录
        const navItem = (function flatten(arr) {
          return [].concat(
            ...arr.map(item => [item, ...flatten(item.subitems)])
          );
        })(nav.toc);
        //查找父级目录item
        function find(item, v = 0) {
          const parent = navItem.filter(it => it.id === item.parent)[0];
          return !item.parent ? v : parent ? find(parent, ++v) : v;
        }
        navItem.forEach(item => {
          item.level = find(item);
        });
        this.setnavigation(navItem);
      });
    },
    initEpub() {
      this.setFileName(this.$route.params.fileName);
      const url = "https://store.yangxiansheng.top/epub/";
      let BookUrl = url + `${this.$route.params.fileName}.epub`;
      this.book = new Epub(BookUrl);
      this.Book = this.book;
      console.log(this.book.isOpen);

      // 渲染图书文件
      this.redition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default"
      });
      Toast.loading({
        message: "记载中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      // 加载图书 显示到屏幕
      this.redition.display().then(() => {
        // 初始化storage
        this.loadingFontsize();
        this.loadingFontfamily();
        this.initTheme();
        this.initGlobaltheme();
        this.initLocation();
        this.initBookInfo();
      });

      // 定义翻页动作
      // 获取到手指滑动的时间 和偏移
      this.redition.on("touchstart", event => {
        // console.log(event);
        // 获取刚触摸屏幕的位置和时间(ms)
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
        event.preventDefault();
        event.stopPropagation();
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
        event.preventDefault();
        event.stopPropagation();
      });
      this.setBook(this.Book);

      // 分出epub文件的页数  如果当前页的宽度比375标准尺寸大 一页的文字就大于750 该分页算法比较坑 得不到精确分页
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          );
        })
        .then(() => {
          this.setProgressFinished(true);
          Toast.clear();
        })
        .then(() => {
          setTimeout(() => {
            if (this.book.isOpen === false) {
              Dialog.alert({
                message: "正在努力添加中",
                title: "库存不足"
              });
            }
          }, 50);
        });

      //注册字体文件
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
          if (!getFontFamily(this.fileName)) {
            saveFontFamily(this.fileName, "Default");
            this.redition.themes.font("Times New Roman");
            this.setfontfamily("Default");
          }
        });
      });
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
.ebook-reader
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-reader-mask
      position: absolute;
      z-index: 150;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
</style>
