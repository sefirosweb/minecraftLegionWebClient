import { SET_BOTS, SET_LOGS, ONLINE_SERVER, ERROR, SET_SOCKET, SET_MASTER, SET_SOCKET_SERVER, SET_SOCKET_SERVER_PORT, SET_BOT_SERVER } from '../types/botsType'

const INITIAL_STATE = {
    logs: [],
    botsOnline: [],
    connected: false,
    error: null,
    webServerSocketURL: 'localhost',
    webServerSocketPort: '4001',
    serverBots: 'localhost',
    socket: null,
    master: 'Lordvivi'
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
            return {
                ...state,
                master: action.payload
            }


        case SET_SOCKET_SERVER:
            return {
                ...state,
                webServerSocketURL: action.payload
            }

        case SET_SOCKET_SERVER_PORT:
            return {
                ...state,
                webServerSocketPort: action.payload
            }

        case SET_BOT_SERVER:
            return {
                ...state,
                serverBots: action.payload
            }

        default: return state
    }
}
