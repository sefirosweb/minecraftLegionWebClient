import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const BotActionButtons = (props) => {
    const history = useHistory();

    const handleDisconnectButton = () => {
        const socketId = props.socketId
        console.log(socketId)
        props.socket.emit('botDisconnect', socketId)
        history.push('/');
    }


    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <input type='text' placeholder='Send chat message' className='form-control' />
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-12'>
                    <button type='button' className='btn btn-primary mr-3'>Send</button>
                    <button type='button' className='btn btn-primary mr-3'>Send</button>
                    <button type='button' className='btn btn-primary mr-3'>Send</button>
                    <button type='button' className='btn btn-primary mr-3'>Send</button>
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