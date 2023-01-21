import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import { connect } from "react-redux";
import DrawChest from "../components/DrawChest";

const Chests = ({ chests, socket }) => {

  const deleteChest = (key, chest) => {
    if (window.confirm("Confirm delete chest?") === true) {
      const newChests = { ...chests }
      delete newChests[key]

      socket.emit('sendAction', {
        action: 'setChests',
        value: newChests
      })
    }

  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Chests</Card.Title>
          <Card.Text>Contain all chests in memory of server</Card.Text>
          <CardGroup>
            {Object.entries(chests).map((entry) => {
                 const key = entry[0]
                 const chest = entry[1]
              return <DrawChest key={key} chest={chest} deleteChest={() => deleteChest(key, chest)} />;
            })}
          </CardGroup>
        </Card.Body>
      </Card>
    </>
  );
};

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers;
  const { socket } = configurationReducer
  const { chests } = botsReducer;
  return { chests, socket };
};

export default connect(mapStateToProps)(Chests);
