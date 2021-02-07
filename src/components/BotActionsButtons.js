import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
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
    props.socket.emit('sendAction', {
      action: 'sendMessage',
      socketId: props.socketId,
      value: chat
    })
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

  const handleSendStayButton = () => {
    props.socket.emit('sendAction', {
      action: 'sendStay',
      socketId: props.socketId,
      value: props.master
    })
  }

  const handleSendFollowButton = () => {
    props.socket.emit('sendAction', {
      action: 'sendFollow',
      socketId: props.socketId,
      value: props.master
    })
  }

  const handleSendEndCommandsButton = () => {
    props.socket.emit('sendAction', {
      action: 'sendEndCommands',
      socketId: props.socketId,
      value: props.master
    })
  }

  const handleSendStartWayButton = () => {
    props.socket.emit('sendAction', {
      action: 'sendStartWay',
      socketId: props.socketId,
      value: props.master
    })
  }

  const handleSendSavePatrolButton = () => {
    props.socket.emit('sendAction', {
      action: 'sendSavePatrol',
      socketId: props.socketId,
      value: props.master
    })
  }

  const handleSendSaveEquipmentChestButton = () => {
    props.socket.emit('sendAction', {
      action: 'sendSaveChest',
      socketId: props.socketId,
      value: 'equipment'
    })
  }

  const handleSendSaveFoodChestButton = () => {
    props.socket.emit('sendAction', {
      action: 'sendSaveChest',
      socketId: props.socketId,
      value: 'food'
    })
  }

  const handleSendSaveDepositChestButton = () => {
    props.socket.emit('sendAction', {
      action: 'sendSaveChest',
      socketId: props.socketId,
      value: 'deposit'
    })
  }

  const handleConfigureButton = () => {
    props.socket.emit('sendAction', {
      action: 'getConfig',
      socketId: props.socketId,
      value: ''
    })
  }
  const handleXup = () => {
    props.socket.emit('sendAction', {
      action: 'move',
      socketId: props.socketId,
      value: 'x+'
    })
  }
  const handleXdown = () => {
    props.socket.emit('sendAction', {
      action: 'move',
      socketId: props.socketId,
      value: 'x-'
    })
  }

  const handleZup = () => {
    props.socket.emit('sendAction', {
      action: 'move',
      socketId: props.socketId,
      value: 'z+'
    })
  }
  const handleZdown = () => {
    props.socket.emit('sendAction', {
      action: 'move',
      socketId: props.socketId,
      value: 'z-'
    })
  }
  const handleInteract = () => {
    props.socket.emit('sendAction', {
      action: 'interact',
      socketId: props.socketId,
      value: props.master
    })
  }

  const handleDrop = () => {
    props.socket.emit('sendAction', {
      action: 'drop',
      socketId: props.socketId,
      value: props.master
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
          <Link className='btn btn-warning mr-3' to={`/configurebot/${props.socketId}/generalConfig`} onClick={handleConfigureButton}>Configure Bot</Link>
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-12'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendStayButton}>Stay</button>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendFollowButton}>Follow Master</button>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendStartWayButton}>Start Way</button>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendSavePatrolButton}>Save Patrol</button>
          <button type='button' className='btn btn-warning mr-3' onClick={handleSendEndCommandsButton}>End commands</button>
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-12'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendSaveEquipmentChestButton}>Save Equipment Chest</button>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendSaveFoodChestButton}>Save Food Chest</button>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleSendSaveDepositChestButton}>Save Deposit Chest</button>
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-1 offset-1'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleXup}>X+</button>
        </div>

        <div className='col-2 offset-2'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleInteract}>Interact</button>
        </div>
        <div className='col-1'>
          <button type='button' className='btn btn-danger mr-3' onClick={handleDrop}>Drop</button>
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-1'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleZdown}>Z-</button>
        </div>
        <div className='col-1'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleXdown}>X-</button>
        </div>
        <div className='col-1'>
          <button type='button' className='btn btn-secondary mr-3' onClick={handleZup}>Z+</button>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers
  const { socket, serverBots, master } = configurationReducer

  return { socket, serverBots, master }
}

const mapDispatchToProps = {
  updateBotStatus,
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(BotActionButtons)
