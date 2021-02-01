/* eslint-disable import/no-anonymous-default-export */
import { SET_BOTS, SET_LOGS, ONLINE_SERVER, ERROR, SET_SOCKET, SET_MASTER, SET_SOCKET_SERVER, SET_SOCKET_SERVER_PORT, SET_BOT_SERVER, SET_MASTERS, SET_SOCKET_SERVER_PASSWORD, SET_LOGED } from '../types/botsType'
import Cookies from 'js-cookie'

const INITIAL_STATE = {
  logs: [],
  botsOnline: [],
  masters: [],
  connected: false,
  error: null,
  webServerSocketPassword: localStorage.getItem('webServerSocketPassword') ? localStorage.getItem('webServerSocketPassword') : '',
  webServerSocketURL: Cookies.get('webServerSocketURL') ? Cookies.get('webServerSocketURL') : 'localhost',
  webServerSocketPort: Cookies.get('webServerSocketPort') ? Cookies.get('webServerSocketPort') : 4001,
  serverBots: Cookies.get('serverBots') ? Cookies.get('serverBots') : 'localhost',
  socket: null,
  master: Cookies.get('master') ? Cookies.get('master') : 'PlayerName',
  loged: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BOTS:
      return {
        ...state,
        botsOnline: action.payload
      }

    case SET_LOGS:
      return {
        ...state,
        logs: action.payload
      }

    case ERROR:
      return {
        ...state,
        error: action.payload
      }

    case ONLINE_SERVER:
      return {
        ...state,
        connected: action.payload
      }

    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload
      }

    case SET_MASTER:
      Cookies.set('master', action.payload)
      return {
        ...state,
        master: action.payload
      }

    case SET_MASTERS:
      return {
        ...state,
        masters: action.payload
      }

    case SET_SOCKET_SERVER:
      Cookies.set('webServerSocketURL', action.payload)
      return {
        ...state,
        webServerSocketURL: action.payload
      }

    case SET_SOCKET_SERVER_PORT:
      Cookies.set('webServerSocketPort', action.payload)
      return {
        ...state,
        webServerSocketPort: action.payload
      }

    case SET_SOCKET_SERVER_PASSWORD:
      localStorage.setItem('webServerSocketPassword', action.payload);
      return {
        ...state,
        webServerSocketPassword: action.payload
      }

    case SET_LOGED:
      return {
        ...state,
        loged: action.payload
      }

    case SET_BOT_SERVER:
      Cookies.set('serverBots', action.payload)
      return {
        ...state,
        serverBots: action.payload
      }

    default: return state
  }
}
