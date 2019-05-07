import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import style from './hello.scss'
// Material-UI
import Button from '@material-ui/core/Button'
import * as action from '../../redux/actions.jsx'
// import {createSelector} from 'reselect'
import api from '../../http/http'

// 小组件分离
const Apps = (props) => <Button variant="contained" color="primary"> Hello2 {props.previewData} </Button>

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
        <div className={style.demoHeader}>{this.state.data}111</div>
        <WrappedComponent {...this.props}/>
      </div>
    )
  }
}

// 修饰符
@withHeader('2019')
class App extends Component {
  render() {
    return (
      <div onClick={() => {
        this.reduxPrint()
      }} className = {style.textL}>
        <Apps {...this.props} />
      </div>
    )
  }
  reduxPrint() {
    this.props.dispatch(action.addList('我是dispatch'))
    api.api('post', '/cad/abc', {data: '1'}, {}).then((data) => {
      // console.log(data)
    })
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
