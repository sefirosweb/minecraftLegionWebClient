import React from 'react'
import { connect } from 'react-redux'

import * as botsAction from '../actions/botsAction'

import NavbarLayout from './NavbarLayout'
import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://127.0.0.1:4001'

class Layout extends React.Component {
    socket = null

    componentDidMount() {
        // When finish render, start stocket listening
        this.socket = socketIOClient(ENDPOINT)
        this.props.setSocket(this.socket)

        this.socket.on('connect', () => {
            this.props.setOnlineServer(true)
        })

        this.socket.on('disconnect', () => {
            this.props.setOnlineServer(false)
        })

        this.socket.on('logs', message => {
            this.props.addLog(message)
        })

        this.socket.on('botStatus', data => {
            this.props.updateBotStatus(data)
        })

        this.socket.emit('getBotsOnline')
        this.socket.on('botsOnline', botsOnline => {

            const botsConnected = botsOnline.sort(function (a, b) {
                if (a.name < b.name) { return -1 }
                if (a.name > b.firsnametname) { return 1 }
                return 0
            })

            this.props.setBots(botsConnected)
        })
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    render() {
        return (
            <React.Fragment>
                <NavbarLayout />
                <div className='container'>
                    {this.props.children}
                </div>
            </React.Fragment >
        )
    }
}

const mapStateToProps = (reducers) => {
    return reducers.botsReducer
}

export default connect(mapStateToProps, botsAction)(Layout);