import {combineReducers} from 'redux' //数据合并
import {ADD_TODO} from './actions.jsx'

// redux共享数据处理
function previewData(state = '我是redux内容', action) { // //示列
  switch (action.type) {
    case ADD_TODO:
      return action.topicId
    default:
      return state
  }
}


const todoApp = combineReducers({
  previewData
})

export default todoApp
