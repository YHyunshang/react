//异步封装
const promise = function(node) {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      if (typeof node === 'function') {
        resolve(node())
      } else {
        resolve(node)
      }
    }, 100)
  }))
}

//算法封装 去重
const deleteRepetion = function(arr) {
  let arrTable = {},
    arrData = []
  for (let i = 0; i < arr.length; i++) {
    if (!arrTable[arr[i]]) {
      arrTable[arr[i]] = true
      arrData.push(arr[i])
    }
  }
  return arrData
}

//上传封装
const upload = (file, url) => new Promise((resolve, reject) => {
  let xhr = new XMLHttpRequest()
  if (xhr.upload) {
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else {
          // 上传出错处理
          reject(xhr.responseText)
        }
      }
    }
    // 开始上传
    xhr.open('POST', url, true)
    let form = new FormData()
    form.append('file', file)
    xhr.send(form)
  }
})

// json
const _parseJSON = str => {
  if (typeof str === 'object') {
    return str
  }
  try {
    return JSON.parse(str)
  } catch (ex) {
    console.log(ex)
  }
  return (new Function('', `return ${str}`))()
}

const dataTime = (date) => {
  let createAt = new Date(date)
  let time = new Date().getTime() - createAt.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if (time / 1000 < 60) {
    return '刚刚'
  } else if ((time / 60000) < 60) {
    return `${parseInt((time / 60000))}分钟前`
  } else if ((time / 3600000) < 24) {
    return `${parseInt(time / 3600000)}小时前`
  } else if ((time / 86400000) < 31) {
    return `${parseInt(time / 86400000)}天前`
  } else if ((time / 2592000000) < 12) {
    return `${parseInt(time / 2592000000)}月前`
  } else {
    return `${parseInt(time / 31536000000)}年前`
  }
}

export default {
  promise,
  deleteRepetion,
  upload,
  dataTime,
  _parseJSON
}
