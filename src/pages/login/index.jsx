import React from 'react'
import './index.less'
import LoginForm from './LoginForm'

function Login() {
  return (
    <main className="page__login">
      <div className="yh-container container">
        <div className="left-img" />
        <div className="right-form">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

export default Login
