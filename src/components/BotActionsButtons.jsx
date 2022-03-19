import React, { useState, Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { updateBotStatus, getBotBySocketId } from "../actions/botsAction";

const BotActionButtons = (props) => {
  const navigation = useNavigate();
  const [chat, setChat] = useState("");

  const handleChangeMessage = (event) => {
    setChat(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSendMessageButton();
    }
  };

  const handleSendMessageButton = () => {
    handleSendAction("sendMessage", chat);
    setChat("");
  };

  const handleDisconnectButton = () => {
    props.socket.emit("sendAction", {
      action: "sendDisconnect",
      socketId: props.socketId,
      value: "Disconnect Bot",
    });
    navigation("/");
  };

  const handleStartStateMachineButton = () => {
    const bot = props.getBotBySocketId(props.socketId);
    if (bot.stateMachinePort === null) {
      const port = Math.floor(Math.random() * 50 + 1) + 4500;
      props.socket.emit("sendAction", {
        action: "startStateMachine",
        socketId: props.socketId,
        value: {
          port,
        },
      });
      bot.stateMachinePort = port;
      props.updateBotStatus(bot);
    }
    window.open(`http://${props.serverBots}:${bot.stateMachinePort}`, "_blank");
  };

  const handleStartInventoryButton = () => {
    const bot = props.getBotBySocketId(props.socketId);
    if (bot.inventoryPort === null) {
      const port = Math.floor(Math.random() * 50 + 1) + 4500;
      props.socket.emit("sendAction", {
        action: "startInventory",
        socketId: props.socketId,
        value: {
          port,
        },
      });
      bot.inventoryPort = port;
      props.updateBotStatus(bot);
    }
    window.open(`http://${props.serverBots}:${bot.inventoryPort}`, "_blank");
  };

  const handleStartViewerButton = () => {
    const bot = props.getBotBySocketId(props.socketId);
    if (bot.viewerPort === null) {
      const port = Math.floor(Math.random() * 50 + 1) + 4500;
      props.socket.emit("sendAction", {
        action: "startViewer",
        socketId: props.socketId,
        value: {
          port,
        },
      });
      bot.viewerPort = port;
      props.updateBotStatus(bot);
    }
    window.open(`http://${props.serverBots}:${bot.viewerPort}`, "_blank");
  };

  const handleSendAction = (type, value) => {
    props.socket.emit("sendAction", {
      action: "action",
      socketId: props.selectedSocketId,
      toBotData: {
        type: type,
        value: value,
      },
    });
  };

  return (
    <>

      <Row className="mb-3">
        <Col>
          <div className="form-group">
            <input
              type="text"
              placeholder="Send chat message"
              className="form-control"
              onKeyPress={handleKeyPress}
              onChange={handleChangeMessage}
              value={chat}
            />
          </div>
        </Col>
      </Row>



      <Row className="mb-3">
        <Col>
          <Button onClick={handleSendMessageButton}>
            Send Message
          </Button>
          {' '}
          <Button onClick={handleStartStateMachineButton}>
            Show State Machine
          </Button>
          {' '}
          <Button onClick={handleStartInventoryButton} variant='success'>
            Show Item Inventory
          </Button>
          {' '}
          <Button onClick={handleStartViewerButton} variant='success'>
            Show Viewer
          </Button>
          {' '}
          <Button onClick={handleDisconnectButton} variant='danger'>
            Disconnect
          </Button>
        </Col>
      </Row>

      <div className="row mt-2">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={handleSendAction.bind(props, "stay", "")}
          >
            Stay
          </button>
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={handleSendAction.bind(props, "follow", props.master)}
          >
            Follow Master
          </button>
          <button
            type="button"
            className="btn btn-warning mr-3"
            onClick={handleSendAction.bind(props, "endCommands", "")}
          >
            End commands
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-1 offset-1">
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={handleSendAction.bind(props, "moveOneByOne", "x+")}
          >
            X+
          </button>
        </div>

        <div className="col-2">
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={handleSendAction.bind(props, "interactWithPlayer", "")}
          >
            Interact With Player
          </button>
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={handleSendAction.bind(props, "interactWithBed", "")}
          >
            Interect With Bed
          </button>
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger mr-3 form-control"
            onClick={handleSendAction.bind(props, "tossAllItems", "")}
          >
            Toss all items
          </button>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-1">
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={handleSendAction.bind(props, "moveOneByOne", "z-")}
          >
            Z-
          </button>
        </div>
        <div className="col-1">
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={handleSendAction.bind(props, "moveOneByOne", "x-")}
          >
            X-
          </button>
        </div>
        <div className="col-1">
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={handleSendAction.bind(props, "moveOneByOne", "z+")}
          >
            Z+
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers;
  const { socket, selectedSocketId, serverBots, master } = configurationReducer;

  return { socket, selectedSocketId, serverBots, master };
};

const mapDispatchToProps = {
  updateBotStatus,
  getBotBySocketId,
};

export default connect(mapStateToProps, mapDispatchToProps)(BotActionButtons);
