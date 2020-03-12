<template>
  <div class="reader">
    <bookReader></bookReader>
    <bookMenu></bookMenu>
  </div>
</template>

<script>
import bookReader from "../components/reader/ebookreader";
import bookMenu from "../components/reader/ebookmenu";
export default {
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

  mounted() {},

  methods: {},

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
