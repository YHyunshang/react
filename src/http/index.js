import axios from 'axios'
import { hosts as HOSTS } from '@conf'

import {
  withAuthHeader,
} from './request.interceptors'
import {
  simplifyResponse,
  errorHandler,
} from './response.interceptors'

const client = axios.create({
  baseURL: HOSTS.poscmServer,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

client.interceptors.request.use(withAuthHeader)
client.interceptors.response.use(simplifyResponse)

// 根据 meta.showErrMsg 展示错误信息
client.interceptors.response.use(
  (res) => res,
  errorHandler,
)

export default client
