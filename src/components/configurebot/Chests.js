import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'
import Chest from './Chest'

const Chests = (props) => {

  const [botConfig] = useState(props.getBotBySocketId(props.match.params.socketId))
  if (botConfig === undefined) {
    props.history.push('/dashboard')
    return null
  }

  const handleInsertNewChest = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'insertNewChest'
      }
    })
  }

  const renderChests = () => {
    return botConfig.config.chests.map((chest, index) => {
      return (
        <Chest id={index} chest={chest} socketId={botConfig.socketId} />
      )
    })
  }

  return (
    <Fragment>
      <div className='row'>
        <div className='col-12'>
          <label>
            When the bot is not ready, they go to chest to withdraw or deposit items <br />
            On withdraw try to get items in list,<br />
            On deposit EXCLUDE items in list
          </label>
        </div>
      </div>
      
      {renderChests()}

      <div className='row mb-5'>
        <div className='col-12'>
          <button type='button' className='btn btn-success' onClick={handleInsertNewChest}>Insert New Chest</button>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers
  const { botsOnline } = botsReducer
  const { socket } = configurationReducer

  return { socket, botsOnline }
}

const mapDispatchToProps = {
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(Chests);
