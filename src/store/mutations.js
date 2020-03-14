import * as types from "./mutation-types";

const mutations = {
  [types.SET_FILENAME](state, filename) {
    state.fileName = filename;
  },
  [types.SET_MENU](state, flag) {
    state.menuVisable = flag;
  },
  [types.SET_SELECTNUM](state, num) {
    state.selectedNum = num;
  },
  [types.SET_CURRENTBOOK](state, book) {
    state.CurrentBook = book;
  },
  [types.SET_DEFAULTFONT](state, fontsize) {
    state.defaultFontSize = fontsize;
  },
  [types.SET_DEFAULTFONTFAMILY](state, fontfamily) {
    state.defaultFontFamily = fontfamily;
  },
  [types.FAMILY_VISIBLE](state, visible) {
    state.fontFamilyVisible = visible;
  },
  [types.SET_THEME](state, theme) {
    state.defaultTheme = theme;
  },
  [types.SET_BOOKFIN](state, flag) {
    state.bookAvailable = flag;
  }
};
export default mutations;
