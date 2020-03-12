import * as types from "./mutation-types";

const mutations = {
  [types.SET_FILENAME](state, filename) {
    state.fileName = filename;
  },
  [types.SET_MENU](state, flag) {
    state.menuVisable = flag;
  },
  [types.SET_MENUNUM](state, num) {
    state.settingMenu = num;
  }
};
export default mutations;
