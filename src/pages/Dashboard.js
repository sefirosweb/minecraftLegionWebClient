import React, { useState, useEffect, Fragment } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";


function Dashboard() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);

    return (
        <Fragment>
            <div className="row">
                <div className='col-10'><h1>Dashboard</h1></div>
            </div>
            <div className="row">

                <div className="col-10">
                    <div className="form-group">
                        <div id="textAreaLogs" className="textAreaStyle form-control"></div>
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
        </Fragment>
    );
}

export default Dashboard;