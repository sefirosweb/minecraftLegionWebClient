import React, { Fragment } from 'react'
import { connect } from 'react-redux'

class Dashboard extends React.Component {
    renderLogs = () => {
        return this.props.logs.map((log) => {
            return (
                <div>{log}</div>
            )
        })
    }

    renderBotsOnlineList = () => {
        return this.props.botsOnline.map((bot) => {
            return (
                <li className='list-group-item'>{bot.name}</li>
            )
        })
    }

    renderCountBotsOnline = () => {
        return this.props.botsOnline.length
    }

    componentDidUpdate() {
        this.el.scrollTop = this.el.scrollHeight
    }

    renderServerConection() {
        if (this.props.connected) {
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
                            <li className='list-group-item active'>Bots Online ({this.renderCountBotsOnline()})</li>
                            {this.renderBotsOnlineList()}
                        </ul>
                    </div>
                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = (reducers) => {
    return reducers.botsReducer
}

export default connect(mapStateToProps)(Dashboard);
