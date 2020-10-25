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
    }, [logs]);

    /*
    gett = () => {
        return logs.map((log) => {
            <span>{log}<br /></span>
        })
    }
    */

    return (
        <div>Hola mundo</div>
    )
}

export default GetLogs;