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
          <Button onClick={handleSendMessageButton} className='mb-1'>
            Send Message
          </Button>
          {' '}
          <Button onClick={handleStartStateMachineButton} className='mb-1'>
            Show State Machine
          </Button>
          {' '}
          <Button onClick={handleStartInventoryButton} variant='success' className='mb-1'>
            Show Item Inventory
          </Button>
          {' '}
          <Button onClick={handleStartViewerButton} variant='success' className='mb-1'>
            Show Viewer
          </Button>
          {' '}
          <Button onClick={handleDisconnectButton} variant='danger' className='mb-1'>
            Disconnect
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button onClick={() => handleSendAction("stay", "")} variant='secondary'>
            Stay
          </Button>
          {' '}
          <Button onClick={() => handleSendAction("follow", props.master)} variant='secondary'>
            Follow Master
          </Button>
          {' '}
          <Button onClick={() => handleSendAction("endCommands", "")} variant='warning'>
            End commands
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>

          <Row className="mb-3">

            <Col xs={{ span: 4, offset: 4 }} className="d-grid">
              <Button onClick={() => handleSendAction("moveOneByOne", "x+")} variant='secondary'>
                X+
              </Button>
            </Col>

          </Row>

          <Row>

            <Col xs={4} className="d-grid mb-3">
              <Button onClick={() => handleSendAction("moveOneByOne", "z-")} variant='secondary'>
                Z-
              </Button>
            </Col>

            <Col xs={4} className="d-grid mb-3">
              <Button onClick={() => handleSendAction("moveOneByOne", "x-")} variant='secondary'>
                X-
              </Button>
            </Col>

            <Col xs={4} className="d-grid mb-3">
              <Button onClick={() => handleSendAction("moveOneByOne", "z+")} variant='secondary'>
                Z+
              </Button>
            </Col>

          </Row>
        </Col>

        <Col md={2} className='d-grid mb-3'>
          <Button onClick={() => handleSendAction("interactWithPlayer", "")} variant='secondary'>
            Interact With Player
          </Button>
        </Col>
        <Col md={2} className='d-grid mb-3'>
          <Button onClick={() => handleSendAction("interactWithBed", "")} variant='secondary'>
            Interect With Bed
          </Button>
        </Col>
        <Col md={2} className='d-grid mb-3'>
          <Button onClick={() => handleSendAction("tossAllItems", "")} variant='danger'>
          Toss all items
          </Button>
        </Col>
      </Row >

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
