import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import RenderBotsOnlineList from '../components/RenderBotsOnlineList'
import BotActionsButtons from '../components/BotActionsButtons'
import { getBotIndexBySocketId } from '../actions/botsAction'
class Dashboard extends React.Component {
    renderLogs = () => {
        let logs = this.props.logs

        const socketId = this.props.match.params.socketId

        if (socketId) {
            logs = logs.filter((log) => {
                return log.socketId === socketId
            })
        }

        return logs.map((log) => {
            return (
                <div>{log.time} {log.botName} {log.message}</div>
            )
        })
    }

    checkCurrentBotIsConnected = () => {
        if (!this.props.loged) {
            this.props.history.push('/configuration')
            return
        }

        const { socketId } = this.props.match.params
        if (this.props.getBotIndexBySocketId(socketId) < 0 && socketId !== undefined) {
            console.log('Bot not found')
            this.props.history.push('/dashboard')
            return
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.loged) {
            this.el.scrollTop = this.el.scrollHeight
        }

        if (
            this.props.botsOnline !== prevProps.botsOnline ||
            this.props.loged !== prevProps.loged
        ) {
            this.checkCurrentBotIsConnected()
        }
    }


    componentDidMount() {
        this.checkCurrentBotIsConnected()
    }

    render() {
        if (!this.props.loged) {
            this.props.history.push('/configuration')
            return null
        }

        return (
            <Fragment>
                <div className='row'>
                    <div className='col-10'><h1>Dashboard</h1></div>
                </div>
                <div className='row'>
                    <div className='col-10'>

                        <div className='row'>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <div ref={el => { this.el = el }} className='textAreaStyle form-control'>
                                        {this.renderLogs()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {(this.props.match.params.socketId) ? <BotActionsButtons socketId={this.props.match.params.socketId} /> : <div className='pendingSelectBot'>Select any bot for do actions</div>}

                    </div>
                    <div className='col-2'>
                        <RenderBotsOnlineList match={this.props.match} />
                    </div>
                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = (reducers) => {
    const { botsReducer, configurationReducer } = reducers
    const { botsOnline, logs } = botsReducer
    const { loged } = configurationReducer

    return { botsOnline, logs, loged }
}


const mapDispatchToProps = {
    getBotIndexBySocketId
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
