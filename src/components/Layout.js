import React from 'react'
import { connect } from 'react-redux'

import { updateMasters, setBots, addLog, updateBotStatus } from '../actions/botsAction'
import { setSocket, setOnlineServer, setLoged } from '../actions/configurationAction'

import NavbarLayout from './NavbarLayout'
import socketIOClient from 'socket.io-client'

class Layout extends React.Component {

  loadWebSocket = () => {
    console.log('Conecting to server...')

    if (this.socket !== undefined) {
      this.socket.disconnect()
      this.socket.close()
    }

    this.socket = socketIOClient(`${this.props.webServerSocketURL}:${this.props.webServerSocketPort}`)
    this.props.setSocket(this.socket)

    this.socket.on('connect', () => {
      this.props.setOnlineServer(true)
      console.log(`Connected to: ${this.props.webServerSocketURL}:${this.props.webServerSocketPort}`)

      this.socket.emit('login', this.props.webServerSocketPassword)
    })

    this.socket.on('login', (authenticate) => {
      console.log(authenticate)
      if (authenticate.auth) {
        this.props.setLoged(true)
        this.socket.emit('getBotsOnline')
      } else {
        this.props.setLoged(false)
      }
    })

    this.socket.on('disconnect', () => {
      this.props.setOnlineServer(false)
      this.props.setLoged(false)
      this.props.setBots([])
    })

    this.socket.on('logs', message => {
      this.props.addLog(message)
    })

    this.socket.on('botStatus', data => {
      this.props.updateBotStatus(data)
    })

    this.socket.on('mastersOnline', data => {
      this.props.updateMasters(data)
    })

    this.socket.on('botsOnline', botsOnline => {
      const botsConnected = botsOnline.sort(function (a, b) {
        if (a.name < b.name) { return -1 }
        if (a.name > b.firsnametname) { return 1 }
        return 0
      })

      this.props.setBots(botsConnected)
    })
  }


  componentDidUpdate(prevProps) {
    // Detect if have any changes on IP / PORT / PASSWORD
    if (
      this.props.webServerSocketURL !== prevProps.webServerSocketURL ||
      this.props.webServerSocketPort !== prevProps.webServerSocketPort ||
      this.props.webServerSocketPassword !== prevProps.webServerSocketPassword
    ) {
      this.loadWebSocket()
    }
  }

  componentDidMount() {
    this.loadWebSocket()
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  render() {
    return (
      <>
        <NavbarLayout />
        <div className='container'>
          {this.props.children}
        </div>
      </>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.configurationReducer
}

const mapDispatchToProps = {
  setLoged,
  setSocket,
  setOnlineServer,
  updateMasters,
  setBots,
  addLog,
  updateBotStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
