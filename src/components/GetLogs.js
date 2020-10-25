import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function GetLogs(props) {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", message => {
            logs.push(message)
            if (logs.length > 10) {
                logs.shift()
            }
            setLogs(logs)
        });
    });


    const gett = () => {
        return logs.map((log) => {
            console.log(log)
            return (
                <div>{log}</div>
            )
        })
    }


    return (
        <div>{gett}</div>
    )
}

export default GetLogs;