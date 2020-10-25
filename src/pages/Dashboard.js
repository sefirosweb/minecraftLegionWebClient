import React, { Fragment } from "react";
import GetLogs from '../components/GetLogs'

class Dashboard extends React.Component {
    state = {
        logs: []
    }

    addLog = (message) => {
        let newLogs = [...this.state.logs, message]

        if (newLogs.length > 30) {
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

    componentDidUpdate() {
        this.el.scrollTop = this.el.scrollHeight
    }


    // componentDidMount() {
    //     this.el.addEventListener('scroll', this.handleScroll);
    // }

    // componentWillUnmount() {
    //     this.el.removeEventListener('scroll', this.handleScroll);
    // }

    // handleScroll = (e) => {
    //     console.log('scrolled')
    // }

    render() {

        return (
            <Fragment>
                <div className="row">
                    <div className='col-10'><h1>Dashboard</h1></div>
                </div>
                <div className="row">

                    <div className="col-10">
                        <div className="form-group">
                            <div ref={el => { this.el = el; }} className="textAreaStyle form-control">
                                <GetLogs addLog={this.addLog} />
                                {this.renderLogs()}
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" />
                        </div>
                        <button type="button" className="btn btn-primary">Send</button>
                    </div>

                    <div className="col-2">
                        <ul className="list-group">
                            <li className='list-group-item active'>Bots Online (X)</li>
                        </ul>
                    </div>
                </div>
            </Fragment >
        )
    }
}

export default Dashboard;