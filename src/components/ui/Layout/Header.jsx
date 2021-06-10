import {
  Button, Dropdown, Menu, Tag,
} from 'antd'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { env, envName } from '@conf'
import logo from '@images/logo.svg'
import './Header.less'

const isProd = /prod.*/i.test(env)

function Header() {
  // TODO: check login
  const location = useLocation()
  const isAuthed = location.pathname !== '/login'

  const authedMenu = (
    <Menu>
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
  )

  return (
    <header className="comp__layout-header">
      {/* TODO: change your logo here */}
      <div className="header-left">
        <img className="img-logo" src={logo} alt="logo" />
        <span>
          {!isProd && <Tag color="blue">{envName}</Tag>}
        </span>
      </div>
      <div className="header-right">
        {isAuthed && (
          <Dropdown overlay={authedMenu}>
            <Button type="text">
              用户名
              <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </div>
    </header>
  )
}

export default Header
