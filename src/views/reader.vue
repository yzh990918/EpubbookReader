<template>
  <div class="reader">
    <bookReader></bookReader>
    <bookMenu></bookMenu>
  </div>
</template>

<script>
import bookReader from "../components/reader/ebookreader";
import bookMenu from "../components/reader/ebookmenu";
import { getReadTime, saveReadTime } from "../mixin/storage";
import { bookmixin } from "../mixin/index";
export default {
  mixins: [bookmixin],
  name: "reader",
  props: [""],
  data() {
    return {
      flag: false
    };
  },

  components: { bookReader, bookMenu },
  created() {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.catchReadtime();
  },
  beforeDestroy() {
    // 在组件销毁前 清理定时任务
    if (this.task) {
      clearInterval(this.task);
    }
  },

  methods: {
    catchReadtime() {
      let readtime = getReadTime(this.fileName);
      if (!readtime) {
        readtime = 0;
      }
      this.task = setInterval(() => {
        if (readtime % 30 === 0) {
          saveReadTime(this.fileName, readtime);
        }
        readtime++;
      }, 1000);
      // 每隔半分钟记录一次时间 写入storage
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
.reader
  position absolute
  top 0
  left 0
  bottom 0
  right 0
  width 100%
  height 100%
</style>
