<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Epub from "epubjs";
global.ePub = Epub;
export default {
  name: "",
  props: [""],
  data() {
    return {
      Bookfilename: ""
    };
  },

  components: {},
  created() {},

  computed: {
    ...mapGetters(["fileName", "menuVisable"])
  },

  beforeMount() {},

  mounted() {
    this.Bookfilename = this.$route.params.fileName;
    this.setFileName(this.Bookfilename);
    this.initEpub();
  },

  methods: {
    nextPage() {
      if (this.redition) {
        console.log("下一页");
        this.redition.next();
        this.setmenu(false);
      }
    },
    prevPgae() {
      if (this.redition) {
        console.log("上一页");
        this.redition.prev();
        this.setmenu(false);
      }
    },
    toggleMenu() {
      console.log("打开菜单");
      console.log(this.menuVisable);
      this.setmenu(!this.$store.state.menuVisable);
    },
    ...mapMutations({
      setFileName: "SET_FILENAME",
      setmenu: "SET_MENU"
    }),
    initEpub() {
      const url = "https://store.yangxiansheng.top/epub/";
      let BookUrl = url + `${this.Bookfilename}.epub`;
      // setTimeout(() => {
      //   // window.console.log(this.book);
      // }, 1000);

      // 解析电子书路径
      this.book = new Epub(BookUrl);
      // 渲染
      this.redition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        method: "default"
      });
      this.redition.display();
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
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped></style>
