import React, { Fragment } from "react";
import GetLogs from '../components/GetLogs'

class Dashboard extends React.Component {
    state = {
        logs: []
    }

    addLog = (message) => {
        let newLogs = [...this.state.logs, message]

        newLogs = [...newLogs, message]
        newLogs = [...newLogs, message]
        newLogs = [...newLogs, message]
        newLogs = [...newLogs, message]
        newLogs = [...newLogs, message]
        newLogs = [...newLogs, message]


        if (newLogs.length > 1000) {
            newLogs.shift()
        }

        this.setState({
            logs: newLogs
        })
    }

    renderLogs = () => {
        return this.state.logs.map((log) => {
            console.log("log", log)
            return (
                <span>{log}<br /></span>
            )
        })
    }


    scrollToBottom = () => {
        this.el.scrollIntoView();
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {

        return (
            <Fragment>
                <div className="row">
                    <div className='col-10'><h1>Dashboard</h1></div>
                </div>
                <div className="row">

                    <div className="col-10">
                        <div className="form-group">
                            <GetLogs addLog={this.addLog} />
                            <div ref={el => { this.el = el; }} className="textAreaStyle form-control">
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