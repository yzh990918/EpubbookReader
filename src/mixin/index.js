import { mapGetters, mapMutations } from "vuex";
export const bookmixin = {
  data() {
    return {
      fontFamilylist: [
        { font: "Default" },
        { font: "思源粗黑体" },
        { font: "思源宋体" },
        { font: "硬楷体" },
        { font: "狂草体" },
        { font: "逐浪丫玉体" },
        { font: "cabin" },
        { font: "dayOne" },
        { font: "montserrat" },
        { font: "tangerine" }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "fileName",
      "menuVisable",
      "selectedNum",
      "CurrentBook",
      "defaultFontSize",
      "defaultFontFamily",
      "fontFamilyVisible",
      "defaultTheme",
      "bookAvailable",
      "section",
      "progress",
      "metadata",
      "navigation",
      "cover",
      "offsetY"
    ])
  },
  methods: {
    ...mapMutations({
      setFileName: "SET_FILENAME",
      setmenu: "SET_MENU",
      setSelectNum: "SET_SELECTNUM",
      setBook: "SET_CURRENTBOOK",
      setfonytsize: "SET_DEFAULTFONT",
      setfontfamily: "SET_DEFAULTFONTFAMILY",
      setfamilyVisible: "FAMILY_VISIBLE",
      settheme: "SET_THEME",
      setProgressFinished: "SET_BOOKFIN",
      setsection: "SET_SECTION",
      setprogressValue: "SET_RPOGRESS",
      setnavigation: "SET_NAV",
      setmetadata: "SET_METADATA",
      setcover: "SET_COVER",
      setOffsetY: "SET_OFFSETY"
    })

    // 设置主题方法注册为mixin 因为多处复用
    /**
     * 点击后的逻辑大概这样: 1.设置vuex theme 2.this.redition.themes设置epub主题 3.保存storage
     * @param {*} theme
     */
    // setTheme(theme) {
    //   this.settheme(theme).then(() => {
    //     this.switchTheme();
    //     this.saveTheme(this.fileName, theme);
    //   });
    // }
  }
};
