import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateBotStatus, getBotBySocketId } from '../actions/botsAction'

const BotActionButtons = (props) => {
  const history = useHistory()
  const [chat, setChat] = useState('')

  const handleChangeMessage = (event) => {
    setChat(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSendMessageButton()
    }
  }

  const handleSendMessageButton = () => {
    handleSendAction('sendMessage', chat)
    setChat('')
  }

  const handleDisconnectButton = () => {
    props.socket.emit('sendAction', {
      action: 'sendDisconnect',
      socketId: props.socketId,
      value: 'Disconnect Bot'
    })
    history.push('/')
  }

  const handleStartStateMachineButton = () => {
    const bot = props.getBotBySocketId(props.socketId)
    if (bot.stateMachinePort === null) {
      const port = Math.floor((Math.random() * 1000) + 1) + 4000
      props.socket.emit('sendAction', {
        action: 'startStateMachine',
        socketId: props.socketId,
        value: {
          port
        }
      })
      bot.stateMachinePort = port
      props.updateBotStatus(bot)
    }
    window.open(`http://${props.serverBots}:${bot.stateMachinePort}`, '_blank')
  }

  const handleStartInventoryButton = () => {
    const bot = props.getBotBySocketId(props.socketId)
    if (bot.inventoryPort === null) {
      const port = Math.floor((Math.random() * 1000) + 1) + 4000
      props.socket.emit('sendAction', {
        action: 'startInventory',
        socketId: props.socketId,
        value: {
          port
        }
      })
      bot.inventoryPort = port
      props.updateBotStatus(bot)
    }
    window.open(`http://${props.serverBots}:${bot.inventoryPort}`, '_blank')
  }

  const handleStartViewerButton = () => {
    const bot = props.getBotBySocketId(props.socketId)
    if (bot.viewerPort === null) {
      const port = Math.floor((Math.random() * 1000) + 1) + 4000
      props.socket.emit('sendAction', {
        action: 'startViewer',
        socketId: props.socketId,
        value: {
          port
        }
      })
      bot.viewerPort = port
      props.updateBotStatus(bot)
    }
    window.open(`http://${props.serverBots}:${bot.viewerPort}`, '_blank')
  }

  const handleSendAction = (type, value) => {
    props.socket.emit('sendAction', {
      action: 'action',
      socketId: props.selectedSocketId,
      toBotData: {
        type: type,
        value: value
      }
    })
  }

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <div className='form-group'>
            <input type='text' placeholder='Send chat message' className='form-control' onKeyPress={handleKeyPress} onChange={handleChangeMessage} value={chat} />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <button type='button' className='btn btn-primary mr-3' onClick={handleSendMessageButton}>Send Message</button>
          <button type='button' className='btn btn-success mr-3' onClick={handleStartStateMachineButton}>Show State Machine</button>
          <button type='button' className='btn btn-success mr-3' onClick={handleStartInventoryButton}>Show Item Inventory</button>
          <button type='button' className='btn btn-success mr-3' onClick={handleStartViewerButton}>Show Viewer</button>
          <button type='button' className='btn btn-danger mr-3' onClick={handleDisconnectButton}>Disconnect</button>
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-12'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendAction.bind(props, 'stay', '')}>Stay</button>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendAction.bind(props, 'follow', props.master)}>Follow Master</button>
          <button type='button' className='btn btn-warning mr-3' onClick={handleSendAction.bind(props, 'endCommands', '')}>End commands</button>
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-1 offset-1'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendAction.bind(props, 'moveOneByOne', 'x+')}>X+</button>
        </div>

        <div className='col-2'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendAction.bind(props, 'interactWithPlayer', '')}>Interact With Player</button>
        </div>
        <div className='col-2'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendAction.bind(props, 'interactWithBed', '')}>Interect With Bed</button>
        </div>
        <div className='col-2'>
          <button type='button' className='btn btn-danger mr-3 form-control' onClick={handleSendAction.bind(props, 'tossAllItems', '')}>Toss all items</button>
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-1'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendAction.bind(props, 'moveOneByOne', 'z-')}>Z-</button>
        </div>
        <div className='col-1'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendAction.bind(props, 'moveOneByOne', 'x-')}>X-</button>
        </div>
        <div className='col-1'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendAction.bind(props, 'moveOneByOne', 'z+')}>Z+</button>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers
  const { socket, selectedSocketId, serverBots, master } = configurationReducer

  return { socket, selectedSocketId, serverBots, master }
}

const mapDispatchToProps = {
  updateBotStatus,
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(BotActionButtons)
