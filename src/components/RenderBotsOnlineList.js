import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/botlist.css'
import ProgressBar from 'react-bootstrap/ProgressBar'

const RenderBotsOnlineList = (props) => {
    return props.botsOnline.map((bot) => {
        return (
            <li key={bot.socketId} className='list-group-item botlist'>
                <NavLink activeClassName="is-selected" to={`/dashboard/${bot.socketId}`}>{bot.name}</NavLink>
                <div>
                    <ProgressBar className='mt-1' variant="danger" now={bot.health / 20 * 100} />
                    <ProgressBar className='mt-1' variant="warning" now={bot.food / 20 * 100} />
                </div>
            </li >
        )
    })
}

export default RenderBotsOnlineList
