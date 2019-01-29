import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
// import api from '../../publics/api.js'
import style from './hello.scss'
// import apis from '../../publics/api'
// Material-UI
import Button from '@material-ui/core/Button'
import * as action from '../../redux/actions.jsx'
// import {createSelector} from 'reselect'
// 函数类
// function readonly(target, key, descriptor) {
//   descriptor.value = () => {
//     return '重新负值参数'
//   }
//   descriptor.writable = false
//   return descriptor
// }

// class Dog {
//   @readonly
//   bark () {
//     console.log('b')
//   }
// }

// 修饰符
const withHeader = (name) => (WrappedComponent) => class HOC extends Component {
  constructor() {
    super()
    this.state = {
      data: name
    }
  }
  render() {
    return (
      <div>
        <div className={style.demoHeader}>{this.state.data}</div>
        <WrappedComponent {...this.props}/>
      </div>
    )
  }
}

// 小组件分离
const Apps = (props) => <Button variant="contained" color="primary"> Hello2 {props.previewData} </Button>

@withHeader('2019')
class App extends Component {
  render() {
    // const {dispatch} = this.props
    return (
      <div onClick={() => {
        this.pointdebug()
      }} className = {style.textL}>
        <Apps {...this.props} />
      </div>
    )
  }
  pointdebug() {
    this.props.dispatch(action.addList('我是dispatch'))
  }
}

//redux
const mapToprops = (state) => {
  const {previewData} = state
  return {
    previewData
  }
}

export default withRouter(connect(mapToprops)(App))
