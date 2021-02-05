import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { getBotIndexBySocketId } from '../../actions/botsAction'
import NotFound from '../../pages/NotFound'

import GeneralConfig from './GeneralConfig'
import ItemsToBeReady from './ItemsToBeReady'
import Chests from './Chests'
import Combat from './Combat'
import GuardJob from './GuardJob'
import MinerJob from './MinerJob'
import ConfigureBotLayout from './ConfigureBotLayout'

class ConfigureBotRoute extends React.Component {
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
            <BrowserRouter basename="/configurebot">
                <ConfigureBotLayout socketId={this.props.match.params.socketId}>
                    <Switch>
                        <Route exact path='/:socketId/generalconfig' component={GeneralConfig} />
                        <Route exact path='/:socketId/itemstobeready' component={ItemsToBeReady} />
                        <Route exact path='/:socketId/chests' component={Chests} />
                        <Route exact path='/:socketId/combat' component={Combat} />
                        <Route exact path='/:socketId/guardjob' component={GuardJob} />
                        <Route exact path='/:socketId/minerjob' component={MinerJob} />
                        <Route component={NotFound} />
                    </Switch>
                </ConfigureBotLayout>
            </BrowserRouter>

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


export default connect(mapStateToProps, mapDispatchToProps)(ConfigureBotRoute);
