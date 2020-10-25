import React, { Fragment } from 'react'
// import GetLogs from '../components/GetLogs'

import socketIOClient from 'socket.io-client'
const ENDPOINT = 'http://127.0.0.1:4001'


class Dashboard extends React.Component {
    state = {
        logs: [],
        botsOnline: [],
        connected: false
    }

    socket = null

    addLog = (message) => {
        let newLogs = [...this.state.logs, message]

        if (newLogs.length > 1000) {
            newLogs.shift()
        }

        this.setState({
            logs: newLogs
        })
    }

    renderLogs = () => {
        return this.state.logs.map((log) => {
            return (
                <div>{log}</div>
            )
        })
    }
    renderBotsOnlineList = () => {
        return this.state.botsOnline.map((bot) => {
            return (
                <li className='list-group-item'>{bot.name}</li>
            )
        })
    }

    componentDidUpdate() {
        this.el.scrollTop = this.el.scrollHeight
    }

    componentDidMount() {
        // When finish render, start stocket listening
        this.socket = socketIOClient(ENDPOINT)
        this.socket.on('connect', botsOnline => {
            this.setState({
                connected: true
            })
        })

        this.socket.on('disconnect', botsOnline => {
            this.setState({
                connected: false
            })
        })

        this.socket.on('logs', message => {
            this.addLog(message)
        })

        this.socket.emit('getBotsOnline')
        this.socket.on('botsOnline', botsOnline => {
            let botsConnected = JSON.parse(botsOnline)

            botsConnected = botsConnected.sort(function (a, b) {
                if (a.name < b.name) { return -1 }
                if (a.name > b.firsnametname) { return 1 }
                return 0
            })

            this.setState({
                botsOnline: botsConnected
            })
        })
    }

    componentWillUnmount() {
        // Close conection when exit
        this.socket.disconnect()
    }

    renderServerConection() {
        if (this.state.connected) {
            return <span className='color-green'>Online</span>
        } else {
            return <span className='color-red'>Offline</span>
        }
    }


    render() {

        return (
            <Fragment>
                <div className='row'>
                    <div className='col-10'><h1>Dashboard - {this.renderServerConection()}</h1></div>
                </div>
                <div className='row'>

                    <div className='col-10'>
                        <div className='form-group'>
                            <div ref={el => { this.el = el }} className='textAreaStyle form-control'>
                                {this.renderLogs()}
                            </div>
                        </div>
                        <div className='form-group'>
                            <input type='text' className='form-control' />
                        </div>
                        <button type='button' className='btn btn-primary'>Send</button>
                    </div>

                    <div className='col-2'>
                        <ul className='list-group'>
                            <li className='list-group-item active'>Bots Online ({this.state.botsOnline.length})</li>
                            {this.renderBotsOnlineList()}
                        </ul>
                    </div>
                </div>
            </Fragment >
        )
    }
}

export default Dashboard