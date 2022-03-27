import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Modal from './Modal'

import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'

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
      <Row>
        <Col>
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
        </Col>
      </Row>
    )
  }

  return (
    <>
      <Navbar collapseOnSelect={true} bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/configuration" eventKey="configuration">Configuration</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              {!props.loged ? '' :
                <>
                  <Nav.Link as={Link} to="/dashboard" eventKey="dashboard">Dashboard</Nav.Link>
                  <Nav.Link onClick={handleShow}>Load New Bot</Nav.Link>
                  <Nav.Link as={Link} to="/masterlist" eventKey="masterlist">Master List</Nav.Link>
                  <Nav.Link as={Link} to="/chests" eventKey='chests'>Chests</Nav.Link>
                  <Nav.Link as={Link} to="/portals" eventKey='portals'>Portals</Nav.Link>
                </>
              }

              <Nav.Link href="https://github.com/sefirosweb/minecraftLegion" rel='noreferrer' target='_blank'>Git</Nav.Link >
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} handleAccept={handleAccept} handleClose={handleClose} title='Fill the data' body={getModalFields()} />
    </>
  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers
  const { loged, socket } = configurationReducer

  return { loged, socket }
}

export default connect(mapStateToProps)(NavbarLayout)
