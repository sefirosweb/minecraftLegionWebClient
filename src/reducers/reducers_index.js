import { combineReducers } from 'redux'
import botsReducer from './botsReducer'
import configurationReducer from './configurationReducer'

export default combineReducers({
  botsReducer, configurationReducer
})
