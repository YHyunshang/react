/*
 * @Author: your name
 * @Date: 2020-10-19 18:15:05
 * @LastEditTime: 2020-12-11 14:11:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /react/YH-react/src/http/index.js
 */

import _ from 'lodash'
import axios from 'axios'
// import ApiList from './common/util/api.json'
let CancelToken = axios.CancelToken

// 获取url请求
const getUrl = key => {
  if (typeof ApiList[key] === 'undefined' || ApiList[key] === '') {
    return ''
  }
  let url = ApiList[key]
  return url
}

// 请求封装
/**
 *
 *
 * @param {*} method
 * @param {*} url
 * @param {*} data
 * @param {*} params
 * @returns
 */
const apiServer = (method, url, data, params) => {
  // debugger
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
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    CancelToken: new CancelToken((c) => {

    }),
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
        // 处理错误样式处
      }
      return resp.data
    })
    .catch((err) =>
    // 处理错误样式处

      Promise.reject(new Error(err))
    )
}

// 上传封装
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

export {
    getUrl,
    apiServer,
    upload,
  }