import { SET_BOTS, SET_LOGS, ONLINE_SERVER, ERROR } from '../types/botsType'

export const setBots = (bots) => async (dispatch) => {
    dispatch({
        type: SET_BOTS,
        payload: bots
    })
}

export const setLogs = (logs) => async (dispatch) => {
    dispatch({
        type: SET_LOGS,
        payload: logs
    })
}

export const setOnlineServer = (onlineServer) => async (dispatch) => {
    dispatch({
        type: ONLINE_SERVER,
        payload: onlineServer
    })
}

export const setError = (error) => async (dispatch) => {
    dispatch({
        type: ERROR,
        payload: error
    })
}

export const updateBotStatus = (botDataStatus) => async (dispatch, getState) => {
    const botsOnline = getState().botsReducer.botsOnline
    const botIndex = botsOnline.findIndex((e) => { return e.socketId === botDataStatus.socketId })

    botsOnline[botIndex][botDataStatus.type] = botDataStatus.value

    dispatch({
        type: SET_BOTS,
        payload: botsOnline
    })
}