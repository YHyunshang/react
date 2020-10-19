import React from 'react'
import logo from '@images/logo.svg'
import './App.less'
import { Spin } from 'antd'

export default function App() {
  return (
    <div className="app">
      <img src={logo} alt="logo" />
      <p>react 脚手架，基于webpack5</p>
    </div>
  )
}
