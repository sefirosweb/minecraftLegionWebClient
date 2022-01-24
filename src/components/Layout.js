import React from "react";
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
import { Fragment } from "react";

class Layout extends React.Component {
  loadWebSocket = () => {
    console.log("Conecting to server...");

    if (this.socket !== undefined) {
      this.socket.disconnect();
      this.socket.close();
    }

    this.socket = socketIOClient(
      `${this.props.webServerSocketURL}:${this.props.webServerSocketPort}`,
      {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      }
    );
    this.props.setSocket(this.socket);

    this.socket.on("connect", () => {
      this.props.setOnlineServer(true);
      console.log(
        `Connected to: ${this.props.webServerSocketURL}:${this.props.webServerSocketPort}`
      );

      this.socket.emit("login", this.props.webServerSocketPassword);
    });

    this.socket.on("login", (authenticate) => {
      console.log(authenticate);
      if (authenticate.auth) {
        this.props.setLoged(true);

        this.socket.emit("sendAction", {
          action: "addMaster",
          value: this.props.master,
        });
        this.socket.emit("getBotsOnline");
        this.socket.emit("sendAction", { action: "getChests" });
      } else {
        this.props.setLoged(false);
      }
    });

    this.socket.on("disconnect", () => {
      this.props.setOnlineServer(false);
      this.props.setLoged(false);
      this.props.setBots([]);
    });

    this.socket.on("logs", (message) => {
      this.props.addLog(message);
    });

    this.socket.on("botStatus", (data) => {
      this.props.updateBotStatus(data);
    });

    this.socket.on("mastersOnline", (data) => {
      this.props.updateMasters(data);
    });

    this.socket.on("action", ({ type, value }) => {
      if (type === "getChests") {
        this.props.updateChests(value);
      }
    });

    this.socket.on("botsOnline", (botsOnline) => {
      const botsConnected = botsOnline.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.firsnametname) {
          return 1;
        }
        return 0;
      });

      this.props.setBots(botsConnected);
    });

    this.socket.on("sendConfig", (data) => {
      this.props.setConfig(data);
    });
  };

  componentDidUpdate(prevProps) {
    // Detect if have any changes on IP / PORT / PASSWORD
    if (
      this.props.webServerSocketURL !== prevProps.webServerSocketURL ||
      this.props.webServerSocketPort !== prevProps.webServerSocketPort ||
      this.props.webServerSocketPassword !== prevProps.webServerSocketPassword
    ) {
      this.loadWebSocket();
    }
  }

  componentDidMount() {
    this.loadWebSocket();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <Fragment>
        <NavbarLayout />
        <div className="container">{this.props.children}</div>
      </Fragment>
    );
  }
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
