import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import * as botsAction from '../actions/botsAction'

class Configuration extends React.Component {
    handleChangeMaster = (event) => {
        this.props.updateMaster(event.target.value)
    }

    handleChangeWebSocketServer = (event) => {
        this.props.updateServer(event.target.value)
    }

    handleChangeWebSocketServerPort = (event) => {
        this.props.updateServerPort(event.target.value)
    }

    handleChangeWebSocketServerPassword = (event) => {
        this.props.updateServerPassword(event.target.value)
    }

    handleChangeBotServer = (event) => {
        this.props.updateBotServer(event.target.value)
    }


    renderServerConection() {
        if (this.props.connected) {
            return <span className='color-green'>Online</span>
        } else {
            return <span className='color-red'>Offline</span>
        }
    }

    renderLogedStatus() {
        if (this.props.loged) {
            return <span className='color-green'>Loged!</span>
        } else {
            return <span className='color-red'>Not loged</span>
        }
    }

    render() {
        return (
            <Fragment>
                <div className='row'>
                    <div className='col-12'><h1>Configuration</h1></div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <Form>
                            <div className="form-group">
                                <label>Web Socket Server Password</label>
                                <input type="password" className="form-control" onChange={this.handleChangeWebSocketServerPassword} value={this.props.webServerSocketPassword} />
                            </div>
                            <div className="form-group">
                                <label>Master</label>
                                <input type="text" className="form-control" onChange={this.handleChangeMaster} value={this.props.master} />
                            </div>
                            <div className="form-group">
                                <label>Web Socket Server URL</label>
                                <input type="text" className="form-control" onChange={this.handleChangeWebSocketServer} value={this.props.webServerSocketURL} />
                            </div>
                            <div className="form-group">
                                <label>Web Socket Server Port</label>
                                <input type="text" className="form-control" onChange={this.handleChangeWebSocketServerPort} value={this.props.webServerSocketPort} />
                            </div>
                            <div className="form-group">
                                <label>Server Bots (Used for connect to Bots Viewers)</label>
                                <input type="text" className="form-control" onChange={this.handleChangeBotServer} value={this.props.serverBots} />
                            </div>
                            <div className="form-group">
                                <label>Server status: {this.renderServerConection()}</label><br />
                                <label>Login status: {this.renderLogedStatus()}</label>
                            </div>
                        </Form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (reducers) => {
    return reducers.botsReducer
}

export default connect(mapStateToProps, botsAction)(Configuration);
