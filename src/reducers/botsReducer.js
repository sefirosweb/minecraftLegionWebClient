/* eslint-disable import/no-anonymous-default-export */
import { SET_BOTS, SET_LOGS, SET_MASTERS } from '../types/botsType'

const INITIAL_STATE = {
  logs: [],
  botsOnline: [],
  masters: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BOTS:
      return {
        ...state,
        botsOnline: action.payload
      }
      
    case 'SET_CONFIG':
      return {
        ...state,
        botsOnline: action.payload
      }


    case SET_LOGS:
      return {
        ...state,
        logs: action.payload
      }

    case SET_MASTERS:
      return {
        ...state,
        masters: action.payload
      }

    default: return state
  }
}
