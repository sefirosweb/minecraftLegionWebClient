import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function GetLogs(props) {
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", message => {
            props.addLog(message)
        });
    });

    return (
        <div>Getting logs...</div>
    )
}

export default GetLogs;