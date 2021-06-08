import { Tag } from 'antd'
import React from 'react'
import { env, envName } from '@conf'
import logo from '@images/logo.svg'
import './Header.less'

const isProd = /prod.*/i.test(env)

function Header() {
  return (
    <header className="comp__layout-header">
      <img className="img-logo" src={logo} alt="logo" />
      <span>
        {!isProd && <Tag color="blue">{envName}</Tag>}
      </span>
    </header>
  )
}

export default Header
