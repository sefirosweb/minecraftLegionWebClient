import React from "react";
import { Card } from "react-bootstrap";

import { connect } from "react-redux";
import chest from "./chest.png";

import Canvas from "./Canvas";
// import windowSlotsCoords from "./windowSlotsCoords";

const Chests = ({ loged, chests, history }) => {
  if (!loged) {
    history.push("/configuration");
    return null;
  }

  const draw = (ctx) => {
    const base_image = new Image();
    base_image.src = chest
    base_image.onload = () => ctx.drawImage(base_image, 0, 0);
  };


  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Chests</Card.Title>
          <Card.Text>Contain all chests in memory of server</Card.Text>
          <Canvas draw={draw} width={352} height={332} />

          {chests.map((c, key) => {
            return <div key={key}></div>;
          })}
        </Card.Body>
      </Card>
    </>
  );
};

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers;
  const { loged } = configurationReducer;
  const { chests } = botsReducer;

  return { chests, loged };
};

export default connect(mapStateToProps)(Chests);
