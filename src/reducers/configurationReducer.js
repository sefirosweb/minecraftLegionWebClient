/* eslint-disable import/no-anonymous-default-export */
import { ONLINE_SERVER, SET_SOCKET, SET_MASTER, SET_SOCKET_SERVER, SET_SOCKET_SERVER_PORT, SET_SOCKET_SERVER_PASSWORD, SET_LOGED, SET_BOT_SERVER } from '../types/configurationType'
import Cookies from 'js-cookie'

const INITIAL_STATE = {
  connected: false,
  webServerSocketPassword: window.localStorage.getItem('webServerSocketPassword') ? window.localStorage.getItem('webServerSocketPassword') : '',
  webServerSocketURL: Cookies.get('webServerSocketURL') ? Cookies.get('webServerSocketURL') : 'localhost',
  webServerSocketPort: Cookies.get('webServerSocketPort') ? Cookies.get('webServerSocketPort') : 4001,
  serverBots: Cookies.get('serverBots') ? Cookies.get('serverBots') : 'localhost',
  socket: null,
  master: Cookies.get('master') ? Cookies.get('master') : 'PlayerName',
  loged: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
      window.localStorage.setItem('webServerSocketPassword', action.payload)
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
