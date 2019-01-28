import _ from 'lodash'
import axios from 'axios'
import ApiList from './api.json'
let CancelToken = axios.CancelToken
//获取url请求
const getUrl = key => {
  if (typeof ApiList[key] === 'undefined' || ApiList[key] === '') {
    return ''
  }
  let url = ApiList[key]
  return url
}

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

// 请求封装
const apiServer = (method, url, data, params) => {
  const sec = 10 * 1000
  let postData = {}
  let _data = _.assign({}, data)
  _.forEach(_data, (val, key) => {
    if (['timeout'].indexOf(key) === -1) {
      postData[key] = val
    }
  })
  let timeout = _data.timeout || sec
  return axios({
    method,
    url,
    data: postData,
    params,
    timeout,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    CancelToken: new CancelToken(((c) => {

    })),
    // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress(progressEvent) {
      // 对原生进度事件的处理
    },
    // // `onDownloadProgress` 允许为下载处理进度事件
    onDownloadProgress(progressEvent) {
      // 对原生进度事件的处理
    }
  })
    .then((resp) => { // 错误码处理
      if (resp.data.status > 200) {
        //处理错误样式处
      }
      return resp
    })
    .catch((err) =>
    //处理错误样式处

      Promise.reject(new Error(err))
    )
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
  getUrl,
  promise,
  deleteRepetion,
  apiServer,
  upload,
  dataTime,
  _parseJSON
}
