import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { generatePath } from 'react-router';
import '../css/botlist.css'
import ProgressBar from 'react-bootstrap/ProgressBar'

const RenderBotsOnlineList = (props) => {

  const history = useHistory()

  const renderCountBotsOnline = () => {
    return this.props.botsOnline.length
  }

  const currentLinl = (socketId) => {
    const path = generatePath(props.match.path, { socketId });
    history.push(path)
  }

  const renderBotList = () => {
    return (
      props.botsOnline.map((bot) => {
        return (
          <li key={bot.socketId} className={`list-group-item ${(bot.combat) ? 'botlistCombat' : 'botlist'}`}>
            <div className={` ${(bot.combat) ? 'botCombat' : ''}`}>
              <span className={props.match.params.socketId === bot.socketId ? 'is-selected' : ''} onClick={currentLinl.bind(this, bot.socketId)}>{bot.name}</span>
              <div>
                <ProgressBar className='mt-1' variant='danger' now={bot.health / 20 * 100} />
                <ProgressBar className='mt-1' variant='warning' now={bot.food / 20 * 100} />
              </div>
            </div>
          </li>
        )
      })

    )
  }


  return (
    <ul className='list-group'>
      <li className='list-group-item active'>Bots Online ({renderCountBotsOnline})</li>
      {renderBotList()}
    </ul>
  )

}

const mapStateToProps = (reducers) => {
  return reducers.botsReducer
}


export default connect(mapStateToProps, null)(RenderBotsOnlineList)
