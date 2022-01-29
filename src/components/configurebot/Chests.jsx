
import React from 'react'
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getBotBySocketId } from "../../actions/botsAction";
import Chest from './Chest.jsx'

const Chests = (props) => {
  const botConfig = props.getBotBySocketId(props.selectedSocketId);
  if (botConfig === undefined) {
    return null;
  }

  const handleInsertNewChest = (event) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "insertNewChest",
      },
    });
  };

  const renderChests = () => {
    return botConfig.config.chests.map((chest, index) => {
      return (
        <Chest
          key={index}
          id={index}
          chest={chest}
          socketId={botConfig.socketId}
        />
      );
    });
  };

  return (
    <>
      <Row>
        <Col>
          <ListGroup className='mb-3'>
            <ListGroup.Item>When the bot is not ready, they go to chest to withdraw or deposit items</ListGroup.Item>
            <ListGroup.Item variant="success">Withdraw the items selected</ListGroup.Item>
            <ListGroup.Item variant="warning">Deposit: only the items selected</ListGroup.Item>
            <ListGroup.Item variant="danger">Deposit all: excluding item to deposit selected</ListGroup.Item>
            <ListGroup.Item variant="dark">(!) The priority of chest is important for deposit / withdraw items in order</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {renderChests()}

      <Row className='mb-5'>
        <Col>
          <Button
            variant="success"
            onClick={handleInsertNewChest}
          >
            Insert New Chest
          </Button>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers;
  const { socket, selectedSocketId } = configurationReducer;

  return { socket, selectedSocketId };
};

const mapDispatchToProps = {
  getBotBySocketId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chests);
