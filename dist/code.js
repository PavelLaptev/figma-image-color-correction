!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=17)}({17:function(e,t,n){"use strict";function i(e){figma.showUI('<script>window.open("'+e+'", "_blank"); parent.postMessage({ pluginMessage: { type: "close" } }, "*");<\/script>',{visible:!1}),setTimeout(()=>{figma.closePlugin("(♡-_-♡) 𝙏𝙝𝙖𝙣𝙠 𝙮𝙤𝙪 𝙎𝙚𝙣𝙥𝙖𝙞 ")},500)}n.r(t),n.d(t,"openLink",(function(){return i})),figma.showUI(__html__,{width:456,height:690});const a=()=>{try{let e=figma.currentPage.selection[0];figma.getImageByHash(e.fills[e.fills.length-1].imageHash).getBytesAsync().then(e=>figma.ui.postMessage({type:"image",data:e,event:"section-changed"}))}catch(e){figma.ui.postMessage({type:"image",data:null,event:"section-changed"}),figma.notify("📌 Select frame with image",{timeout:2e3})}};a(),figma.on("selectionchange",()=>{a()}),figma.ui.onmessage=e=>{let t=figma.currentPage.selection[0];if("img"===e.type&&t){const n=t.fills,i=figma.createImage(e.bytes).hash,a=Object.assign(Object.assign({},n[0]),{imageHash:i});t.fills=[...n,a]}"img"===e.type||t||figma.notify("📌 Select frame with image",{timeout:2e3}),"donate-link"===e.type&&i("https://www.paypal.com/paypalme/pavellaptev")},figma.currentPage.setRelaunchData({open:""})}});