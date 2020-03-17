const state = {
  fileName: "",
  menuVisable: false,
  selectedNum: -1, //-1不显示 0目录 1进度条 2主题 3字号
  CurrentBook: null,
  defaultFontSize: 16,
  defaultFontFamily: "Default",
  fontFamilyVisible: false,
  defaultTheme: "Default",
  bookAvailable: false,
  section: 0,
  progress: 0,
  navigation: null,
  cover: "",
  metadata: null,
  offsetY: 0
};
export default state;
