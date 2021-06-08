/*
 * @Author: your name
 * @Date: 2020-10-19 18:15:05
 * @LastEditTime: 2020-12-11 14:49:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /react/YH-react/src/http/response.interceptors.js
 */
/**
 * axios 响应拦截器
 */
import { message } from 'antd'
/**
 * axios 响应拦截器
 */
/* 简化成功数据，业务只需关注 restful 接口返回的数据即可
* @param {object} response axios response object
*/
export function simplifyResponse(response) {
  // // debugger;
  // const { meta = {} } = response.config
  // // todo: 对返回非 JSON 格式的 restful 接口做特殊处理
  // if (meta.extraDataMapper instanceof Function) {
  //   return ({ ...response.data, extraData: meta.extraDataMapper(response) })
  // }
  return response.data
}

export function errorHandler(err) {
  if (err.response.status === 404) {
    throw new Error(`${err.config.url} not found`)
  }
  const { retInfo } = err.response.data
  message.error(`发生未知错误：${retInfo}`)
  throw err
}
