import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { getBotIndexBySocketId } from '../actions/botsAction'


import NotFound from '../pages/NotFound'
import GeneralConfig from '../components/configurebot/GeneralConfig'
import ItemsToBeReady from '../components/configurebot/ItemsToBeReady'
import Chests from '../components/configurebot/Chests'
import Combat from '../components/configurebot/Combat'
import GuardJob from '../components/configurebot/GuardJob'
import MinerJob from '../components/configurebot/MinerJob'

class ConfigureBotLayout extends React.Component {
    componentDidUpdate(prevProps) {
        if (
            this.props.botsOnline !== prevProps.botsOnline ||
            this.props.loged !== prevProps.loged
        ) {
            this.checkCurrentBotIsConnected()
        }
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

    componentDidMount() {
        this.checkCurrentBotIsConnected()
    }

    render() {
        return (
            <Fragment>
                <div className='row'>
                    <div className='col-4'><h1>Bot Configuration</h1></div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <ul className="nav nav-tabs bg-dark">
                            <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to={`/configurebot/${this.props.match.params.socketId}/generalconfig`}>General Configuration</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to={`/configurebot/${this.props.match.params.socketId}/itemstobeready`}>Items To Be Ready</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to={`/configurebot/${this.props.match.params.socketId}/chests`}>Chests</NavLink></li>
                            
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path='/configurebot/:socketId/generalconfig' component={GeneralConfig} />
                                <Route exact path='/configurebot/:socketId/itemstobeready' component={ItemsToBeReady} />
                                <Route exact path='/configurebot/:socketId/chests' component={ItemsToBeReady} />
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </Fragment>
        );
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


export default connect(mapStateToProps, mapDispatchToProps)(ConfigureBotLayout);
