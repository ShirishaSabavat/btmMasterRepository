// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import videos from "./videos"
import media from "./media"
import courses from "./courses"

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  videos,
  media,
  courses
})

export default rootReducer
