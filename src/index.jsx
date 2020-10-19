import React, {Component} from 'react'
import {render,hydrate} from 'react-dom'
import ReactDOMServer from 'react-dom/server';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import {renderToString} from 'react-dom/server'
import './publics/public.css'
import servers from './redux/reduxServer'
import PrintA from './router/routerDom'
const enhancer = compose(
  applyMiddleware(thunk, createLogger()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)
const stores = createStore(servers, enhancer)

render(
  <Provider store={stores} >
    <Router>
      <Switch>
        {/* <Route path='/antd' component={routerDom.BlogPage1}/> */}
        <Route path='/' component={PrintA.Hello}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
