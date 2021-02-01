import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'


class ConfigureBotLayout extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='row'>
                    <div className='col-4'><h1>Bot Configuration</h1></div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <ul className="nav nav-tabs bg-dark">
                            <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to={`/configurebot/${this.props.socketId}/generalconfig`}>General Configuration</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to={`/configurebot/${this.props.socketId}/itemstobeready`}>Items To Be Ready</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to={`/configurebot/${this.props.socketId}/chests`}>Chests</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to={`/configurebot/${this.props.socketId}/combat`}>Combat</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to={`/configurebot/${this.props.socketId}/guardjob`}>Guard Job</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeClassName='active' to={`/configurebot/${this.props.socketId}/minerjob`}>Miner Job</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        {this.props.children}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ConfigureBotLayout