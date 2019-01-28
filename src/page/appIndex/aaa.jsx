import React, {Component} from 'react'

export default class Adds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datas: '子组件测试'
    }
  }

  render() {
    return (
      <div>测试</div>
    )
  }
}
