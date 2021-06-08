import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { Layout } from '@ui-comps'
import Login from '@/pages/login'

function Routes() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route key="login" path="/login" component={Login} />
        </Switch>
      </Router>
    </Layout>
  )
}
export default Routes
