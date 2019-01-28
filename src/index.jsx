import React, {Component} from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './publics/public.css'
import servers from './redux/reduxServer'
// import routerDom from './router/routerDom'
import Hello from './page/appLogin/hello.jsx'
// console.log(process.env.NODE_ENV)
const enhancer = compose(
  //处理think
  applyMiddleware(thunk, createLogger()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
const stores = createStore(servers, enhancer)

render(
  <Provider store={stores} >
    <Router>
      <Switch>
        {/* <Route path='/antd' component={routerDom.BlogPage1}/> */}
        <Route path='/' component={Hello}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
