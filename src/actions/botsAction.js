import { SET_BOTS, SET_LOGS, SET_MASTERS, SET_CHESTS } from '../types/botsType'

export const setBots = (bots) => (dispatch) => {
  dispatch({
    type: SET_BOTS,
    payload: bots
  })
}

export const addLog = (newLog) => (dispatch, getState) => {
  const { logs } = getState().botsReducer
  const newLogs = [...logs, newLog]
  if (newLogs.length > 1000) {
    newLogs.shift()
  }

  dispatch({
    type: SET_LOGS,
    payload: newLogs
  })
}

export const updateBotStatus = (botDataStatus) => (dispatch, getState) => {
  const { botsOnline } = getState().botsReducer
  const botIndex = botsOnline.findIndex((e) => { return e.socketId === botDataStatus.socketId })

  const botsOnlineUpdate = [
    ...botsOnline
  ]
  botsOnlineUpdate[botIndex][botDataStatus.type] = botDataStatus.value

  dispatch({
    type: SET_BOTS,
    payload: botsOnlineUpdate
  })
}

export const updateMasters = (newMasters) => (dispatch) => {
  dispatch({
    type: SET_MASTERS,
    payload: newMasters
  })
}

export const updateChests = (newChests) => (dispatch) => {
  dispatch({
    type: SET_CHESTS,
    payload: newChests
  })
}

export const setConfig = (botConfig) => (dispatch, getState) => {
  const { botsOnline } = getState().botsReducer
  const botIndex = botsOnline.findIndex((e) => { return e.socketId === botConfig.socketId })

  const botsOnlineUpdate = [
    ...botsOnline
  ]
  botsOnlineUpdate[botIndex].config = botConfig

  dispatch({
    type: SET_BOTS,
    payload: botsOnlineUpdate
  })
}

export const getBotBySocketId = (socketId) => (dispatch, getState) => {
  const { botsOnline } = getState().botsReducer
  return botsOnline.find((e) => { return e.socketId === socketId })
}

export const getBotIndexBySocketId = (socketId) => (dispatch, getState) => {
  const { botsOnline } = getState().botsReducer
  return botsOnline.findIndex((e) => { return e.socketId === socketId })
}
