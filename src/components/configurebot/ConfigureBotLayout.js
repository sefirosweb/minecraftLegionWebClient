import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'

class ConfigureBotLayout extends React.Component {
  render() {
    const botName = this.props.getBotBySocketId(this.props.socketId).name
    return (
      <Fragment>
        <div className='row'>
          <div className='col-12'><h1>Bot Configuration - {botName}</h1></div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <ul className='nav nav-tabs bg-dark'>
              <li className='nav-item'><NavLink className='nav-link linkSpan ' activeClassName='active' to={`/${this.props.socketId}/generalconfig`}>General Configuration</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan ' activeClassName='active' to={`/${this.props.socketId}/itemstobeready`}>Items To Be Ready</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan ' activeClassName='active' to={`/${this.props.socketId}/chests`}>Chests</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan ' activeClassName='active' to={`/${this.props.socketId}/combat`}>Combat</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan ' activeClassName='active' to={`/${this.props.socketId}/guardjob`}>Guard Job</NavLink></li>
              <li className='nav-item'><NavLink className='nav-link linkSpan ' activeClassName='active' to={`/${this.props.socketId}/minerjob`}>Miner Job</NavLink></li>
            </ul>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='card px-5 pt-4'>
              {this.props.children}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers
  const { botsOnline } = botsReducer
  const { socket } = configurationReducer

  return { socket, botsOnline }
}

const mapDispatchToProps = {
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureBotLayout);
