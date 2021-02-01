import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateBotStatus, getBotBySocketId } from '../actions/botsAction'

const BotActionButtons = (props) => {
  const history = useHistory()
  const [chat, setChat] = useState('')

  const handleChangeMessage = (event) => {
    const message = event.target.value
    setChat(message)
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSendMessageButton()
    }
  }

  const handleSendMessageButton = () => {
    const action = {
      action: 'sendMessage',
      socketId: props.socketId,
      value: chat
    }
    props.socket.emit('sendAction', action)
    setChat('')
  }

  const handleDisconnectButton = () => {
    const action = {
      action: 'sendDisconnect',
      socketId: props.socketId,
      value: 'Disconnect Bot'
    }
    props.socket.emit('sendAction', action)
    history.push('/')
  }

  const handleStartStateMachineButton = () => {
    const bot = props.getBotBySocketId(props.socketId)
    if (bot.stateMachinePort === null) {
      const port = Math.floor((Math.random() * 1000) + 1) + 4000
      const action = {
        action: 'startStateMachine',
        socketId: props.socketId,
        value: {
          port
        }
      }
      props.socket.emit('sendAction', action)
      bot.stateMachinePort = port
      props.updateBotStatus(bot)
    }
    window.open(`http://${props.serverBots}:${bot.stateMachinePort}`, '_blank')
  }

  const handleStartInventoryButton = () => {
    const bot = props.getBotBySocketId(props.socketId)
    if (bot.inventoryPort === null) {
      const port = Math.floor((Math.random() * 1000) + 1) + 4000
      const action = {
        action: 'startInventory',
        socketId: props.socketId,
        value: {
          port
        }
      }
      props.socket.emit('sendAction', action)
      bot.inventoryPort = port
      props.updateBotStatus(bot)
    }
    window.open(`http://${props.serverBots}:${bot.inventoryPort}`, '_blank')
  }

  const handleStartViewerButton = () => {
    const bot = props.getBotBySocketId(props.socketId)
    if (bot.viewerPort === null) {
      const port = Math.floor((Math.random() * 1000) + 1) + 4000
      const action = {
        action: 'startViewer',
        socketId: props.socketId,
        value: {
          port
        }
      }
      props.socket.emit('sendAction', action)
      bot.viewerPort = port
      props.updateBotStatus(bot)
    }
    window.open(`http://${props.serverBots}:${bot.viewerPort}`, '_blank')
  }

  const handleSendStayButton = () => {
    const action = {
      action: 'sendStay',
      socketId: props.socketId,
      value: props.master
    }
    props.socket.emit('sendAction', action)
  }

  const handleSendFollowButton = () => {
    const action = {
      action: 'sendFollow',
      socketId: props.socketId,
      value: props.master
    }
    props.socket.emit('sendAction', action)
  }

  const handleSendEndCommandsButton = () => {
    const action = {
      action: 'sendEndCommands',
      socketId: props.socketId,
      value: props.master
    }
    props.socket.emit('sendAction', action)
  }

  const handleSendStartWayButton = () => {
    const action = {
      action: 'sendStartWay',
      socketId: props.socketId,
      value: props.master
    }
    props.socket.emit('sendAction', action)
  }

  const handleSendSavePatrolButton = () => {
    const action = {
      action: 'sendSavePatrol',
      socketId: props.socketId,
      value: props.master
    }
    props.socket.emit('sendAction', action)
  }

  const handleSendSaveEquipmentChestButton = () => {
    const action = {
      action: 'sendSaveChest',
      socketId: props.socketId,
      value: 'equipment'
    }
    props.socket.emit('sendAction', action)
  }

  const handleSendSaveFoodChestButton = () => {
    const action = {
      action: 'sendSaveChest',
      socketId: props.socketId,
      value: 'food'
    }
    props.socket.emit('sendAction', action)
  }

  const handleSendSaveDepositChestButton = () => {
    const action = {
      action: 'sendSaveChest',
      socketId: props.socketId,
      value: 'deposit'
    }
    props.socket.emit('sendAction', action)
  }

  const handleConfigureButton = () => {
    const action = {
      action: 'getConfig',
      socketId: props.socketId,
      value: ''
    }

    console.log('getConfig', action)
    props.socket.emit('sendAction', action)

    props.socket.on('sendConfig', data => {
      console.log('sendConfig', data)
    })
  }
  const handleXup = () => {
    const action = {
      action: 'move',
      socketId: props.socketId,
      value: 'x+'
    }
    props.socket.emit('sendAction', action)
  }
  const handleXdown = () => {
    const action = {
      action: 'move',
      socketId: props.socketId,
      value: 'x-'
    }
    props.socket.emit('sendAction', action)
  }

  const handleZup = () => {
    const action = {
      action: 'move',
      socketId: props.socketId,
      value: 'z+'
    }
    props.socket.emit('sendAction', action)
  }
  const handleZdown = () => {
    const action = {
      action: 'move',
      socketId: props.socketId,
      value: 'z-'
    }
    props.socket.emit('sendAction', action)
  }
  const handleInteract = () => {
    const action = {
      action: 'interact',
      socketId: props.socketId,
      value: props.master
    }
    props.socket.emit('sendAction', action)
  }

  const handleDrop = () => {
    const action = {
      action: 'drop',
      socketId: props.socketId,
      value: props.master
    }
    props.socket.emit('sendAction', action)
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
          <button type='button' className='btn btn-warning mr-3' onClick={handleConfigureButton}>Configure</button>
          <button type='button' className='btn btn-danger mr-3' onClick={handleDisconnectButton}>Disconnect</button>
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
