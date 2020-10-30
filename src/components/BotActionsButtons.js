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
        const socketId = props.socketId
        const action = {
            action: 'sendMessage',
            socketId,
            value: chat
        }
        props.socket.emit('sendAction', action)
        setChat('')
    }

    const handleDisconnectButton = () => {
        const socketId = props.socketId
        props.socket.emit('botDisconnect', socketId)
        history.push('/');
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
                    <button type='button' className='btn btn-success mr-3'>Start State Machine</button>
                    <button type='button' className='btn btn-success mr-3'>Start Item Inventory</button>
                    <button type='button' className='btn btn-success mr-3'>Start Viewer</button>
                    <button type='button' className='btn btn-danger mr-3' onClick={handleDisconnectButton}>Disconnect</button>
                </div>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (reducers) => {
    return reducers.botsReducer
}

export default connect(mapStateToProps)(BotActionButtons);