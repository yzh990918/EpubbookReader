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
      "fontFamilyVisible"
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
      setfamilyVisible: "FAMILY_VISIBLE"
    })
  }
};
