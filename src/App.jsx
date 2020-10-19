import React from 'react'
import logo from '@images/logo.svg'
import './App.less'
import { Spin } from 'antd'

export default function App() {
  return (
    <div className="app">
      <img src={logo} alt="logo" />
      <p>空间陈列展示</p>
      <Spin />
      <div className="img-bg" />
    </div>
  )
}
