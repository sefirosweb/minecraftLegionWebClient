import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/botlist.css'

const RenderBotsOnlineList = (props) => {
    return props.botsOnline.map((bot) => {
        return (
            <li key={bot.socketId} className='list-group-item botlist'><NavLink activeClassName="is-selected" to={`/dashboard/:${bot.socketId}`}>{bot.name}</NavLink></li >
        )
    })
}

export default RenderBotsOnlineList
