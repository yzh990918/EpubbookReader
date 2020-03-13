<template>
  <div>
    <transition name="slideUp">
      <div class="setting-wrapper" v-show="menuVisable && selectedNum === 2">
        <div class="setting-theme">
          <div
            class="setting-theme-item"
            v-for="(item, index) in themeList"
            :key="index"
            @click="setTheme(index)"
          >
            <div
              class="preview"
              :style="{ background: item.style.body.background }"
              :class="{ 'no-border': item.style.body.background !== '#fff' }"
            ></div>
            <div class="text" :class="{ selected: index === defaultTheme }">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},
  created() {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang="stylus" scoped></style>
