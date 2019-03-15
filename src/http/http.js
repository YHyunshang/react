import axios from 'axios'
import ApiList from './api.json'
import _ from 'lodash'
let CancelToken = axios.CancelToken

//获取url请求
const getUrl = key => {
  if (typeof ApiList[key] === 'undefined' || ApiList[key] === '') {
    return ''
  }
  let url = ApiList[key]
  return url
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

export default {
  apiServer,
  getUrl
}
