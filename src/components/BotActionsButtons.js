import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as botsAction from '../actions/botsAction'

const BotActionButtons = (props) => {
    const history = useHistory();
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
        history.push('/');
    }

    const handleStartStateMachineButton = () => {
        const bot = props.getBotById(props.socketId)
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
        window.open(`http://localhost:${bot.stateMachinePort}`, "_blank")
    }

    const handleStartInventoryButton = () => {
        const bot = props.getBotById(props.socketId)
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
        window.open(`http://localhost:${bot.inventoryPort}`, "_blank")
    }

    const handleStartViewerButton = () => {
        const bot = props.getBotById(props.socketId)
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
        window.open(`http://localhost:${bot.viewerPort}`, "_blank")
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

    const handleSendStartPatrolButton = () => {
        const action = {
            action: 'sendStartPatrol',
            socketId: props.socketId,
            value: props.master
        }
        props.socket.emit('sendAction', action)
    }

    const handleSendEndPatrolButton = () => {
        const action = {
            action: 'sendEndPatrol',
            socketId: props.socketId,
            value: props.master
        }
        props.socket.emit('sendAction', action)
    }

    const handleSendStartChestButton = () => {
        const action = {
            action: 'sendStartChest',
            socketId: props.socketId,
            value: props.master
        }
        props.socket.emit('sendAction', action)
    }

    const handleSendEndChestButton = () => {
        const action = {
            action: 'sendEndChest',
            socketId: props.socketId,
            value: props.master
        }
        props.socket.emit('sendAction', action)
    }

    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <input type='text' placeholder='Send chat message' className='form-control' onKeyPress={handleKeyPress} onChange={handleChangeMessage} value={chat} />
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-12'>
                    <button type='button' className='btn btn-primary mr-3' onClick={handleSendMessageButton} >Send Message</button>
                    <button type='button' className='btn btn-success mr-3' onClick={handleStartStateMachineButton}>Show State Machine</button>
                    <button type='button' className='btn btn-success mr-3' onClick={handleStartInventoryButton}>Show Item Inventory</button>
                    <button type='button' className='btn btn-success mr-3' onClick={handleStartViewerButton}>Show Viewer</button>
                    <button type='button' className='btn btn-danger mr-3' onClick={handleDisconnectButton}>Disconnect</button>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col-12'>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleSendStayButton} >Stay</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleSendFollowButton}>Follow Master</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleSendStartPatrolButton}>Set Patrol</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleSendEndPatrolButton}>End Patrol</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleSendStartChestButton}>Set Go Chest</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleSendEndChestButton}>End Chest</button>
                    <button type='button' className='btn btn-warning mr-3' onClick={handleSendEndCommandsButton}>End commands</button>
                </div>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (reducers) => {
    return reducers.botsReducer
}

export default connect(mapStateToProps, botsAction)(BotActionButtons);