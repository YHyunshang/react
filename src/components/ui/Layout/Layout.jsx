import React from 'react'
import Header from './Header'
import './Layout.less'

function Layout({ children }) {
  return (
    <div className="comp__layout">
      <Header />
      <div className="layout-content">
        {children}
      </div>
    </div>
  )
}

export default Layout
