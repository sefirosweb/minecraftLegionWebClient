import React, { useState, useEffect, Fragment } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function GetLogs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", message => {
            logs.push(message)
            console.log(logs)
            setLogs(logs);
        });
    }, []);

    return (

        <p>
            {
                logs.map(function (log) {
                    return (
                        <span>{log}<br /></span>
                    )
                })
            }
        </p>

    )
}

export default GetLogs;