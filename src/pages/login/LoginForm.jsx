import React from 'react'
import { Button, Form, Input } from 'antd'

const { Item: FormItem } = Form

function LoginForm() {
  const onFinish = () => {
    // TODO: deal with form submit
  }

  const onForgetPWD = () => {
    // TODO: deal with click forget-password
  }

  return (
    <div className="comp__login-form">
      <h1>账号登录</h1>
      <Form name="login" onFinish={onFinish}>
        <FormItem name="username" rule={[{ required: true, message: '请输入正确的账号' }]}>
          <Input allowClear />
        </FormItem>
        <FormItem name="password" rule={[{ required: true, message: '请输入正确的密码' }]}>
          <Input.Password allowClear />
        </FormItem>
        <Button type="primary" htmlType="submit">登录</Button>
      </Form>
      <div className="btm-btns">
        <Button type="link" onClick={onForgetPWD}>忘记密码</Button>
      </div>
    </div>
  )
}

export default LoginForm
