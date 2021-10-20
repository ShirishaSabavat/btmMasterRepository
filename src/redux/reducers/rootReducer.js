// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import videos from "./videos"
import media from "./media"
import courses from "./courses"
import cms from "./cms"
import faculty from "./faculty"
import organization from "./settings/organization"
import courseSchedule from "./courseSchedule"
import user from "./user"
import common from "./common"
import sales from "./sales"
import staff from "./staff"
import gallery from "./gallery"
import roles from "./roles"
import landingPage from "./landingPage"
import inquiry from "./inquery/index"

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  videos,
  media,
  courses,
  cms,
  faculty,
  organization,
  courseSchedule,
  user,
  common,
  sales,
  staff,
  gallery,
  roles,
  landingPage,
  inquiry
})

export default rootReducer
