import React from 'react'
import { Form, Input } from 'antd'

const { Item: FormItem } = Form

function LoginForm() {
  return (
    <div className="comp__login-form">
      <h1>账号登录</h1>
      <Form name="login">
        <FormItem name="username" rule={[{ required: true, message: '请输入正确的账号' }]}>
          <Input />
        </FormItem>
        <FormItem name="password" rule={[{ required: true, message: '请输入正确的密码' }]}>
          <Input.Password />
        </FormItem>
      </Form>
    </div>
  )
}

export default LoginForm
