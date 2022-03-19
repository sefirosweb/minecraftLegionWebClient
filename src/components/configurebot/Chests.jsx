
import React from 'react'
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { getBotBySocketId } from "../../actions/botsAction";
import FormCheck from '../forms/FormCheck';
import Chest from './Chest.jsx'

const Chests = (props) => {
  const {
    socket,
    botsOnline,
    selectedSocketId
  } = props

  const botConfig = botsOnline.find((e) => { return e.socketId === selectedSocketId })
  if (botConfig === undefined) { return null }

  const changeConfig = (configToChange, value) => {
    socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange,
        value,
      },
    });
  };

  const handleInsertNewChest = (event) => {
    changeConfig("insertNewChest", '')
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
      <FormCheck
        id={"firstPickUpItemsFromKnownChests"}
        onChange={() => changeConfig("firstPickUpItemsFromKnownChests", !botConfig.config.firstPickUpItemsFromKnownChests)}
        label={
          <>
            Use a memorized chest first?
          </>
        }
        checked={botConfig.config.firstPickUpItemsFromKnownChests}
      />
      <FormCheck
        id={"canCraftItemWithdrawChest"}
        onChange={() => changeConfig("canCraftItemWithdrawChest", !botConfig.config.canCraftItemWithdrawChest)}
        label={
          <>
            Craft item if it is possible?
          </>
        }
        checked={botConfig.config.canCraftItemWithdrawChest}
      />

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
  const { configurationReducer, botsReducer } = reducers;
  const { socket, selectedSocketId } = configurationReducer;
  const { botsOnline } = botsReducer


  return { socket, selectedSocketId, botsOnline };
};

const mapDispatchToProps = {
  getBotBySocketId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chests);
