import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  updateMasters,
  updateChests,
  setBots,
  addLog,
  updateBotStatus,
  setConfig,
} from "../actions/botsAction";
import {
  setSocket,
  setOnlineServer,
  setLoged,
} from "../actions/configurationAction";

import NavbarLayout from "./NavbarLayout";
import socketIOClient from "socket.io-client";

const Layout = ({
  socket, setSocket,
  webServerSocketPort, webServerSocketURL, webServerSocketPassword,
  setOnlineServer, setLoged, master, setBots, addLog, setConfig, children,
  updateMasters, updateChests, updateBotStatus }) => {

  useEffect(() => {
    console.log("Conecting to server...");

    if (socket !== undefined) {
      socket.disconnect();
      socket.close();
    }

    const socketConection = socketIOClient(
      `${webServerSocketURL}:${webServerSocketPort}`,
      {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      }
    );

    setSocket(socketConection);

    socketConection.on("connect", () => {
      setOnlineServer(true);
      console.log(
        `Connected to: ${webServerSocketURL}:${webServerSocketPort}`
      );

      socketConection.emit("login", webServerSocketPassword);
    });

    socketConection.on("login", (authenticate) => {
      if (authenticate.auth) {
        console.log('Logged in!');
        setLoged(true);

        socketConection.emit("sendAction", {
          action: "addMaster",
          value: master,
        });
        socketConection.emit("getBotsOnline");
        socketConection.emit("sendAction", { action: "getChests" });
      } else {
        console.log('Login failed');
        setLoged(false);
      }
    });

    socketConection.on("disconnect", () => {
      setOnlineServer(false);
      setLoged(false);
      setBots([]);
    });

    socketConection.on("logs", (message) => {
      addLog(message);
    });

    socketConection.on("botStatus", (data) => {
      updateBotStatus(data);
    });

    socketConection.on("mastersOnline", (data) => {
      updateMasters(data);
    });

    socketConection.on("action", ({ type, value }) => {
      if (type === "getChests") {
        updateChests(value);
      }
    });

    socketConection.on("botsOnline", (botsOnline) => {
      const botsConnected = botsOnline.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.firsnametname) {
          return 1;
        }
        return 0;
      });

      setBots(botsConnected);
    });

    socketConection.on("sendConfig", (data) => {
      setConfig(data);
    });

    return () => socketConection.disconnect();
  }, [
    socket, setSocket, webServerSocketURL, webServerSocketPort, webServerSocketPassword,
    updateBotStatus, updateChests, updateMasters,
    setBots, setConfig, setLoged, setOnlineServer,
    addLog, master
  ])

  return (
    <>
      <NavbarLayout />
      <div className="container">{children}</div>
    </>
  );
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers;
  const { botsOnline } = botsReducer;
  const {
    webServerSocketURL,
    webServerSocketPort,
    webServerSocketPassword,
    master,
  } = configurationReducer;

  return {
    webServerSocketURL,
    webServerSocketPort,
    webServerSocketPassword,
    botsOnline,
    master,
  };
};

const mapDispatchToProps = {
  setLoged,
  setSocket,
  setConfig,
  setOnlineServer,
  updateMasters,
  updateChests,
  setBots,
  addLog,
  updateBotStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
