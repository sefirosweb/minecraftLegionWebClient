import { SET_BOTS, SET_LOGS, ONLINE_SERVER, ERROR, SET_SOCKET, SET_MASTER } from '../types/botsType'

export const setBots = (bots) => async (dispatch) => {
    dispatch({
        type: SET_BOTS,
        payload: bots
    })
}

export const addLog = (newLog) => async (dispatch, getState) => {
    const { logs } = getState().botsReducer
    let newLogs = [...logs, newLog]
    if (newLogs.length > 1000) {
        newLogs.shift()
    }

    dispatch({
        type: SET_LOGS,
        payload: newLogs
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

export const setSocket = (socket) => async (dispatch) => {
    dispatch({
        type: SET_SOCKET,
        payload: socket
    })
}

export const updateBotStatus = (botDataStatus) => async (dispatch, getState) => {
    const { botsOnline } = getState().botsReducer
    const botIndex = botsOnline.findIndex((e) => { return e.socketId === botDataStatus.socketId })

    // Caution inmutabilidad is requeried!
    const botsOnlineUpdate = [
        ...botsOnline,
    ]
    botsOnlineUpdate[botIndex][botDataStatus.type] = botDataStatus.value

    dispatch({
        type: SET_BOTS,
        payload: botsOnlineUpdate
    })
}

export const updateMaster = (newMaster) => async (dispatch) => {
    dispatch({
        type: SET_MASTER,
        payload: newMaster
    })
}

