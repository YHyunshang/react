import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import './Layout.less'

function Layout({ children }) {
  // TODO: check login
  const location = useLocation()
  const isAuthed = location.pathname !== '/login'
  // const isLogin = true

  return (
    <div className="comp__layout">
      <Header />
      <div className="layout-content">
        {isAuthed && (
          <div className="layout-sider yh-shadow-down" />
        )}
        <div className="layout-main">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
