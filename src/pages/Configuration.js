import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { updateMaster, updateServer, updateServerPort, updateServerPassword, updateBotServer } from '../actions/configurationAction'
import { Col, Row } from 'react-bootstrap'

const Configuration = ({ loged, connected, master, webServerSocketPassword, webServerSocketURL, webServerSocketPort, serverBots,
    updateMaster, updateServer, updateServerPort, updateServerPassword, updateBotServer
}) => {

    const handleChangeMaster = (event) => {
        updateMaster(event.target.value)
    }

    const handleChangeWebSocketServer = (event) => {
        updateServer(event.target.value)
    }

    const handleChangeWebSocketServerPort = (event) => {
        updateServerPort(event.target.value)
    }

    const handleChangeWebSocketServerPassword = (event) => {
        updateServerPassword(event.target.value)
    }

    const handleChangeBotServer = (event) => {
        updateBotServer(event.target.value)
    }

    return (
        <Fragment>
            <Row>
                <Col>
                    <h1>Configuration</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>

                        <Form.Group controlId="handleChangeWebSocketServerPassword">
                            <Form.Label>Web Socket Server Password</Form.Label>
                            <Form.Control type="password" value={webServerSocketPassword} onChange={handleChangeWebSocketServerPassword} />
                        </Form.Group>

                        <Form.Group controlId="handleChangeMaster">
                            <Form.Label>Master</Form.Label>
                            <Form.Control type="text" value={master} onChange={handleChangeMaster} />
                        </Form.Group>

                        <Form.Group controlId="handleChangeWebSocketServer">
                            <Form.Label>Web Socket Server URL</Form.Label>
                            <Form.Control type="text" value={webServerSocketURL} onChange={handleChangeWebSocketServer} />
                        </Form.Group>

                        <Form.Group controlId="handleChangeWebSocketServerPort">
                            <Form.Label>Web Socket Server Port</Form.Label>
                            <Form.Control type="text" value={webServerSocketPort} onChange={handleChangeWebSocketServerPort} />
                        </Form.Group>

                        <Form.Group controlId="handleChangeBotServer">
                            <Form.Label>Server Bots (Used for connect to Bots Viewers)</Form.Label>
                            <Form.Control type="text" value={serverBots} onChange={handleChangeBotServer} />
                        </Form.Group>

                        <div>
                            Server status:
                            {connected ?
                                <span className='color-green'>Online</span> :
                                <span className='color-red'>Offline</span>
                            }
                        </div>
                        <div>
                            Login status:
                            {loged ?
                                <span className='color-green'>Loged!</span> :
                                <span className='color-red'>Not loged</span>
                            }
                        </div>

                    </Form>
                </Col>
            </Row>
        </Fragment>
    );

}

const mapStateToProps = (reducers) => {
    return reducers.configurationReducer
}

const mapDispatchToProps = {
    updateMaster,
    updateServer,
    updateServerPort,
    updateServerPassword,
    updateBotServer
}

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);