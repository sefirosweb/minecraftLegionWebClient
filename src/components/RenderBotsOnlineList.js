import { useEffect } from 'react'
import { connect } from 'react-redux'
import '../css/botlist.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { setSelectedSocketId } from '../actions/configurationAction'

const RenderBotsOnlineList = (props) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        props.setSelectedSocketId(undefined)
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [props])

  const renderBotList = () => {
    return (
      props.botsOnline.map((bot) => {
        return (
          <li key={bot.socketId} className={`list-group-item ${(bot.combat) ? 'botlistCombat' : 'botlist'}`}>
            <div className={` ${(bot.combat) ? 'botCombat' : ''}`}>
              <span className={`pointer ${props.selectedSocketId === bot.socketId ? 'is-selected' : ''}`} onClick={() => { props.setSelectedSocketId(bot.socketId) }}>{bot.name}</span>
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
      <li className='list-group-item active'>Bots Online ({props.botsOnline.length})</li>
      {renderBotList()}
    </ul>
  )
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers
  const { botsOnline } = botsReducer
  const { selectedSocketId } = configurationReducer
  return { botsOnline, selectedSocketId }
}

const mapDispatchToProps = {
  setSelectedSocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderBotsOnlineList)
