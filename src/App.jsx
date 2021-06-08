import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Routes from './route'
import 'antd/dist/antd.css'
import './App.less'

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Routes />
    </ConfigProvider>
  )
}
