import storage from "web-storage-cache";

const localStorage = new storage();

// 设置
export function setLoaclStorage(key, value) {
  return localStorage.set(key, value);
}
// 拿到
export function getLocalStorage(key) {
  return localStorage.get(key);
}
// 删除
export function removeLocalStorage(key) {
  return localStorage.delete(key);
}
// 清空
export function clearLocalStorage() {
  return localStorage.clear();
}

// 定义一个缓存函数
export function setBookObject(fileName, key, value) {
  let book = {};
  // 如果有这本书的缓存 就拿
  if (getLocalStorage(`${fileName}-info`)) {
    book = getLocalStorage(`${fileName}-info`);
  }
  // 如果没有就定义 一个json
  book[key] = value;
  setLoaclStorage(`${fileName}-info`, book);
}
// 拿缓存
export function getBookObject(fileName, key) {
  // 如果有 就拿出value的值
  if (getLocalStorage(`${fileName}-info`)) {
    return getLocalStorage(`${fileName}-info`)[key];
  } else {
    return null;
  }
}

// 业务代码
// export function getLocale() {
//   return getLocalStorage("locale");
// }

// export function saveLocale(locale) {
//   return setLoaclStorage("locale", locale);
// }

export function getLocation(fileName) {
  return getBookObject(fileName, "location");
}

export function saveLocation(fileName, location) {
  setBookObject(fileName, "location", location);
}

// export function getBookmark(fileName) {
//   return getBookObject(fileName, "bookmark");
// }

// export function saveBookmark(fileName, bookmark) {
//   setBookObject(fileName, "bookmark", bookmark);
// }

export function getReadTime(fileName) {
  return getBookObject(fileName, "time");
}

export function saveReadTime(fileName, theme) {
  setBookObject(fileName, "time", theme);
}

export function getProgress(fileName) {
  return getBookObject(fileName, "progress");
}

export function saveProgress(fileName, progress) {
  setBookObject(fileName, "progress", progress);
}

export function getNavigation(fileName) {
  return getBookObject(fileName, "navigation");
}

export function saveNavigation(fileName, navigation) {
  setBookObject(fileName, "navigation", navigation);
}

export function getMetadata(fileName) {
  return getBookObject(fileName, "metadata");
}

export function saveMetadata(fileName, metadata) {
  setBookObject(fileName, "metadata", metadata);
}

export function getCover(fileName) {
  return getBookObject(fileName, "cover");
}

export function saveCover(fileName, cover) {
  setBookObject(fileName, "cover", cover);
}

export function getFontFamily(fileName) {
  return getBookObject(fileName, "fontFamily");
}

export function saveFontFamily(fileName, fontFamily) {
  setBookObject(fileName, "fontFamily", fontFamily);
}

export function getTheme(fileName) {
  return getBookObject(fileName, "theme");
}

export function saveTheme(fileName, theme) {
  setBookObject(fileName, "theme", theme);
}

export function getFontSize(fileName) {
  return getBookObject(fileName, "fontSize");
}

export function saveFontSize(fileName, fontSize) {
  setBookObject(fileName, "fontSize", fontSize);
}
// 使用  先 saveFontSize(fileName,fontSize) 这是book对象中
// {fontSize:value}
//再拿值  getFontSize(fileName)  拿到的是 value
