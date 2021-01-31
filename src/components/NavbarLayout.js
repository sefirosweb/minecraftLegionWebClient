import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Modal from './Modal'

// import confLogo from '../images/sefiros.png'
import '../css/NavbarLayout.css'

const NavbarLayout = (props) => {
  const [show, setShow] = useState(false)
  const [modalFields, setModalFields] = useState(false)
  const [botName, setBotName] = useState('Guard1')
  const [masterName, setMasterName] = useState('')
  const [botPassword, setBotPassword] = useState('')

  const handleClose = () => {
    setShow(false)
    setBotName('')
    setBotPassword('')
  }

  const handleShow = () => {
    setModalFields(1)
    setShow(true)
  }

  const handleMasterShow = () => {
    setModalFields(2)
    setShow(true)
  }

  const handleAccept = () => {
    if (modalFields === 1) {
      connectBot()
    } else {
      addMaster()
    }
  }

  const connectBot = () => {
    const message = {
      botName,
      botPassword
    }

    props.socket.emit('botConnect', message)
    handleClose()
  }

  const addMaster = () => {
    const message = {
      name: masterName
    }

    props.socket.emit('addMaster', message)
    handleClose()
  }

  const handleKeyPress = (target) => {
    if (target.charCode === 13) {
      handleAccept()
    }
  }

  const changeBotName = (event) => {
    setBotName(event.target.value)
  }

  const changeBotPassword = (event) => {
    setBotPassword(event.target.value)
  }

  const changeMasterName = (event) => {
    setMasterName(event.target.value)
  }

  const botLoadFields = (
    <div className='row'>
      <div className='col-12'>
        <div className='form-group'>
          <Form onKeyPress={handleKeyPress}>
            <Form.Group>
              <Form.Label>Bot Name</Form.Label>
              <Form.Control type='text' placeholder='Guard1' onChange={changeBotName} value={botName} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='text' placeholder='' onChange={changeBotPassword} value={botPassword} />
              <Form.Text className='text-muted'>
                No put password on open server when is not requiered
              </Form.Text>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )

  const renderMasterList = () => {
    return props.masters.map((e, index) => {
      return (
        <div key={index}>{e.name}</div>
      )
    })
  }

  const addNewMasterFields = (
    <div>
      <div className='row'>
        <div className='col-12'>
          <div className='form-group'>
            <Form onKeyPress={handleKeyPress}>
              <Form.Group>
                <Form.Label>Master Name</Form.Label>
                <Form.Control type='text' onChange={changeMasterName} value={masterName} />
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          {renderMasterList()}
        </div>
      </div>
    </div>
  )

  const getModalFields = () => {
    if (modalFields === 1) {
      return botLoadFields
    } else {
      return addNewMasterFields
    }
  }

  return (
    <div className='navBar'>
      <NavLink className='ml-3' to='/configuration' activeClassName='is-selected'>Configuration</NavLink>
      {props.connected ? <NavLink className='ml-3' to='/dashboard' activeClassName='is-selected'>Dashboard</NavLink> : ''}
      {props.connected ? <span className='linkSpan ml-3' onClick={handleShow}>Load New Bot</span> : ''}
      {props.connected ? <span className='linkSpan ml-3' onClick={handleMasterShow}>Master List</span> : ''}

      <a className='ml-5' href='https://github.com/sefirosweb/minecraftLegion' target='_blank' rel='noreferrer'>Git</a>

      {/* Load Modal */}
      <Modal show={show} handleAccept={handleAccept} handleClose={handleClose} title='Fill the data' body={getModalFields()} />
    </div>
  )
}

const mapStateToProps = (reducers) => {
  return reducers.botsReducer
}

export default connect(mapStateToProps)(NavbarLayout)
