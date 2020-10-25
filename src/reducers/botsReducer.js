import { SET_BOTS, SET_LOGS, ONLINE_SERVER, ERROR } from '../types/botsType'

const INITIAL_STATE = {
    logs: [],
    botsOnline: [],
    connected: false,
    error: null
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

        default: return state
    }
}
