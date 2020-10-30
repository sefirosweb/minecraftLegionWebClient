import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
        const action = {
            action: 'startStateMachine',
            socketId: props.socketId,
            value: {
                port: Math.floor((Math.random() * 1000) + 1) + 4000
            }
        }
        props.socket.emit('sendAction', action)
    }

    const handleStartInventoryButton = () => {
        const action = {
            action: 'startInventory',
            socketId: props.socketId,
            value: {
                port: Math.floor((Math.random() * 1000) + 1) + 4000
            }
        }
        props.socket.emit('sendAction', action)
    }

    const handleStartViewerButton = () => {
        const action = {
            action: 'startViewer',
            socketId: props.socketId,
            value: {
                port: Math.floor((Math.random() * 1000) + 1) + 4000
            }
        }
        props.socket.emit('sendAction', action)
    }

    const handleSendStayButton = () => {
        const action = {
            action: 'sendStay',
            socketId: props.socketId,
            value: 'sendStay'
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
                    <button type='button' className='btn btn-success mr-3' onClick={handleStartStateMachineButton}>Start State Machine</button>
                    <button type='button' className='btn btn-success mr-3' onClick={handleStartInventoryButton}>Start Item Inventory</button>
                    <button type='button' className='btn btn-success mr-3' onClick={handleStartViewerButton}>Start Viewer</button>
                    <button type='button' className='btn btn-danger mr-3' onClick={handleDisconnectButton}>Disconnect</button>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col-12'>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleSendStayButton} >Stay</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleStartStateMachineButton}>Follow Master</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleStartInventoryButton}>Set Patrol</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleStartViewerButton}>End Patrol</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleStartViewerButton}>Set Go Chest</button>
                    <button type='button' className='btn btn-secondary mr-3' onClick={handleStartViewerButton}>End Chest</button>
                    <button type='button' className='btn btn-warning mr-3' onClick={handleDisconnectButton}>End commands</button>
                </div>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (reducers) => {
    return reducers.botsReducer
}

export default connect(mapStateToProps)(BotActionButtons);