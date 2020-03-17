// 定义的四种主题方法
export function themeList() {
  return [
    {
      name: "Default",
      style: {
        body: {
          color: "#4c5059",
          background: "#F5EACC"
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        },
        img: {
          width: "100%"
        },
        ".epubjs-hl": {
          fill: "red",
          "fill-opacity": "0.3",
          "mix-blend-mode": "multiply"
        }
      }
    },
    {
      name: "Gold",
      style: {
        body: {
          color: "#5c5b56",
          background: "#c6c2b6"
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        },
        img: {
          width: "100%"
        },
        ".epubjs-hl": {
          fill: "red",
          "fill-opacity": "0.3",
          "mix-blend-mode": "multiply"
        }
      }
    },
    {
      name: "Eye",
      style: {
        body: {
          color: "#404c42",
          background: "#a9c1a9"
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        },
        img: {
          width: "100%"
        },
        ".epubjs-hl": {
          fill: "red",
          "fill-opacity": "0.3",
          "mix-blend-mode": "multiply"
        }
      }
    },
    {
      name: "Night",
      style: {
        body: {
          color: "#cecece",
          background: "#000000"
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        },
        img: {
          width: "100%"
        },
        ".epubjs-hl": {
          fill: "red",
          "fill-opacity": "0.3",
          "mix-blend-mode": "multiply"
        }
      }
    }
  ];
}

// 添加一个css文件到head标签
export function addLink(href) {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", href);
  document.getElementsByTagName("head")[0].appendChild(link);
}

export function removeCss(href) {
  // 获取link标签 倒历 如果没有href和属性名条件的css文件 移除
  const link = document.getElementsByTagName("link");
  for (var i = link.length; i >= 0; i--) {
    if (
      link[i] &&
      link[i].getAttribute("href") != null &&
      link[i].getAttribute("href").indexOf(href) !== -1
    ) {
      link[i].parentNode.removeChild(link[i]);
    }
  }
}

// 设置全局样式时 全部移除样式文件
export function removeAllCss() {
  removeCss("https://store.yangxiansheng.top/theme/theme_default.css"),
    removeCss("https://store.yangxiansheng.top/theme/theme_eye.css");
  removeCss("https://store.yangxiansheng.top/theme/theme_gold.css");
  removeCss("https://store.yangxiansheng.top/theme/theme_night.css");
}

export function realPx(px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth;
  return px * (maxWidth / 375);
}
