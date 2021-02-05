import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Modal from './Modal'

import '../css/NavbarLayout.css'

const NavbarLayout = (props) => {
  const [show, setShow] = useState(false)
  const [botName, setBotName] = useState('')
  const [botPassword, setBotPassword] = useState('')

  const handleClose = () => {
    setShow(false)
    setBotName('')
    setBotPassword('')
  }

  const handleShow = () => {
    setShow(true)
  }

  const handleAccept = () => {
    connectBot()
  }

  const connectBot = () => {
    const message = {
      botName,
      botPassword
    }

    props.socket.emit('botConnect', message)
    handleClose()
  }

  const handleKeyPress = (target) => {
    if (target.charCode === 13) {
      handleAccept()
    }
  }

  const changeBotName = (event) => {
    setBotName(event.target.value.trim())
  }

  const changeBotPassword = (event) => {
    setBotPassword(event.target.value)
  }

  const getModalFields = () => {
    return (
      <div className='row'>
        <div className='col-12'>
          <div className='form-group'>
            <Form onKeyPress={handleKeyPress}>
              <Form.Group>
                <Form.Label>Bot Name</Form.Label>
                <Form.Control type='text' onChange={changeBotName} value={botName} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='text' onChange={changeBotPassword} value={botPassword} />
                <Form.Text className='text-muted'>
                  No put password on open server when is not requiered
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='navBar'>
      <NavLink className='ml-3' to='/configuration' activeClassName='is-selected'>Configuration</NavLink>
      {props.loged ? <NavLink className='ml-3' to='/dashboard' activeClassName='is-selected'>Dashboard</NavLink> : ''}
      {props.loged ? <span className='linkSpan ml-3' onClick={handleShow}>Load New Bot</span> : ''}
      {props.loged ? <NavLink className='ml-3' to='/masterlist' activeClassName='is-selected'>Master List</NavLink> : ''}

      <a className='ml-5' href='https://github.com/sefirosweb/minecraftLegion' target='_blank' rel='noreferrer'>Git</a>

      {/* Load Modal */}
      <Modal show={show} handleAccept={handleAccept} handleClose={handleClose} title='Fill the data' body={getModalFields()} />
    </div>
  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers
  const { loged, socket } = configurationReducer

  return { loged, socket }
}

export default connect(mapStateToProps)(NavbarLayout)
