import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'
import { Layout } from '@ui-comps'
import Login from '@/pages/login'

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route key="login" path="/login" component={Login} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}
export default Routes
