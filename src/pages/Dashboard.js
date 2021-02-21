import { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RenderBotsOnlineList from '../components/RenderBotsOnlineList'
import BotActionsButtons from '../components/BotActionsButtons'
import { getBotIndexBySocketId } from '../actions/botsAction'
import { setSelectedSocketId } from '../actions/configurationAction'
class Dashboard extends Component {

    renderLogs = () => {
        let logs = this.props.logs

        if (this.props.selectedSocketId) {
            logs = logs.filter((log) => {
                return log.socketId === this.props.selectedSocketId
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

        if (this.props.getBotIndexBySocketId(this.props.selectedSocketId) < 0 && this.props.selectedSocketId !== undefined) {
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
                    <div className='col-8'><h1>Dashboard</h1></div>
                    {(this.props.selectedSocketId) ? <div className='col-2 pt-2'><Link className='btn btn-warning mr-3' to='/configurebot/generalconfig'>Configure Bot</Link></div> : ''}
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

                        {(this.props.selectedSocketId) ? <BotActionsButtons socketId={this.props.selectedSocketId} /> : <div className='pendingSelectBot'>Select any bot for do actions</div>}

                    </div>
                    <div className='col-2'>
                        <RenderBotsOnlineList match={this.props.match} history={this.props.history} />
                    </div>
                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = (reducers) => {
    const { botsReducer, configurationReducer } = reducers
    const { botsOnline, logs } = botsReducer
    const { loged, selectedSocketId } = configurationReducer

    return { botsOnline, logs, loged, selectedSocketId }
}


const mapDispatchToProps = {
    getBotIndexBySocketId,
    setSelectedSocketId
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
