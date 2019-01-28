import axios from 'axios'
export const ADD_TODO = 'ADD_TODO'

// redux action事件
export const addList = (topicId) => ({
  type: ADD_TODO,
  topicId
})



