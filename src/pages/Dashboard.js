import React, { Fragment } from "react";
import GetLogs from '../components/GetLogs'

class Dashboard extends React.Component {
    render() {

        return (
            <Fragment>
                <div className="row">
                    <div className='col-10'><h1>Dashboard</h1></div>
                </div>
                <div className="row">

                    <div className="col-10">
                        <div className="form-group">
                            <div id="textAreaLogs" className="textAreaStyle form-control">
                                <GetLogs />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="inputCommandText" />
                        </div>
                        <button type="button" id="sendCommandButton" className="btn btn-primary">Send</button>
                    </div>

                    <div className="col-2">
                        <ul className="list-group" id="botList">
                            <li className='list-group-item active'>Bots Online (X)</li>
                        </ul>
                    </div>

                </div>
            </Fragment >
        )
    }
}

export default Dashboard;