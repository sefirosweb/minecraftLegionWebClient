import { ONLINE_SERVER, SET_SOCKET, SET_MASTER, SET_SOCKET_SERVER, SET_SOCKET_SERVER_PORT, SET_SOCKET_SERVER_PASSWORD, SET_LOGED, SET_BOT_SERVER } from '../types/configurationType'

export const setSocket = (socket) => (dispatch) => {
  dispatch({
    type: SET_SOCKET,
    payload: socket
  })
}

export const updateMaster = (newMaster) => (dispatch) => {
  dispatch({
    type: SET_MASTER,
    payload: newMaster
  })
}

export const updateServer = (newServer) => (dispatch) => {
  dispatch({
    type: SET_SOCKET_SERVER,
    payload: newServer
  })
}

export const updateServerPort = (newPort) => (dispatch) => {
  dispatch({
    type: SET_SOCKET_SERVER_PORT,
    payload: newPort
  })
}

export const updateServerPassword = (password) => (dispatch) => {
  dispatch({
    type: SET_SOCKET_SERVER_PASSWORD,
    payload: password
  })
}

export const setLoged = (loged) => (dispatch) => {
  dispatch({
    type: SET_LOGED,
    payload: loged
  })
}

export const setOnlineServer = (onlineServer) => (dispatch) => {
  dispatch({
    type: ONLINE_SERVER,
    payload: onlineServer
  })
}

export const updateBotServer = (newBotServer) => (dispatch) => {
  dispatch({
    type: SET_BOT_SERVER,
    payload: newBotServer
  })
}
