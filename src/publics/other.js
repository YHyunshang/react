/*获取网址参数*/
const getURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`),
    r = window.location.search.substr(1).match(reg)
  if (r != null) return r[2]; return null
}

/*获取全部url参数,并转换成json对象*/
const getUrlAllParams = (url) => {
  var url = url ? url : window.location.href,
    _pa = url.substring(url.indexOf('?') + 1),
    _arrS = _pa.split('&'),
    _rs = {}
  for (let i = 0, _len = _arrS.length; i < _len; i++) {
    let pos = _arrS[i].indexOf('=')
    if (pos == -1) {
      continue
    }
    let name = _arrS[i].substring(0, pos),
      value = window.decodeURIComponent(_arrS[i].substring(pos + 1))
    _rs[name] = value
  }
  return _rs
}

/*删除url指定参数，返回url*/
const delParamsUrl = (url, name) => {
  let baseUrl = `${url.split('?')[0]}?`,
    query = url.split('?')[1]
  if (query.indexOf(name) > -1) {
    let obj = {},
      arr = query.split('&')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=')
      obj[arr[i][0]] = arr[i][1]
    }
    delete obj[name]
    var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&')
    return url
  } else {
    return url
  }
}

/*获取十六进制随机颜色*/
const getRandomColor = () => `#${(function(h) {
  return new Array(7 - h.length).join('0') + h
})((Math.random() * 0x1000000 << 0).toString(16))}`

/*图片加载*/
const imgLoadAll = (arr, callback) => {
  let arrImg = []
  for (let i = 0; i < arr.length; i++) {
    let img = new Image()
    img.src = arr[i]
    img.onload = function() {
      arrImg.push(this)
      if (arrImg.length == arr.length) {
        callback && callback()
      }
    }
  }
}

/*音频加载*/
const loadAudio = (src, callback) => {
  let audio = new Audio(src)
  audio.onloadedmetadata = callback
  audio.src = src
}

/*DOM转字符串*/
const domToStirng = (htmlDOM) => {
  let div = document.createElement('div')
  div.appendChild(htmlDOM)
  return div.innerHTML
}

/*字符串转DOM*/
const stringToDom = (htmlString) => {
  let div = document.createElement('div')
  div.innerHTML = htmlString
  return div.children[0]
}

/**
 * 光标所在位置插入字符，并设置光标位置
 *
 * @param {dom} 输入框
 * @param {val} 插入的值
 * @param {posLen} 光标位置处在 插入的值的哪个位置
 */
const setCursorPosition = (dom, val, posLen) => {
  let cursorPosition = 0
  if (dom.selectionStart) {
    cursorPosition = dom.selectionStart
  }
  this.insertAtCursor(dom, val)
  dom.focus()
  console.log(posLen)
  dom.setSelectionRange(dom.value.length, cursorPosition + (posLen || val.length))
}

/*光标所在位置插入字符*/
const insertAtCursor = (dom, val) => {
  if (document.selection) {
    dom.focus()
    sel = document.selection.createRange()
    sel.text = val
    sel.select()
  } else if (dom.selectionStart || dom.selectionStart == '0') {
    let startPos = dom.selectionStart
    let endPos = dom.selectionEnd
    let restoreTop = dom.scrollTop
    dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length)
    if (restoreTop > 0) {
      dom.scrollTop = restoreTop
    }
    dom.focus()
    dom.selectionStart = startPos + val.length
    dom.selectionEnd = startPos + val.length
  } else {
    dom.value += val
    dom.focus()
  }
}

export default {
  getURL,
  getUrlAllParams,
  delParamsUrl,
  getRandomColor,
  imgLoadAll,
  loadAudio,
  domToStirng,
  stringToDom,
  setCursorPosition,
  insertAtCursor
}
