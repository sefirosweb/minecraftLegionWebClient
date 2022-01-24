import React from "react";
import { Card } from "react-bootstrap";

import { connect } from "react-redux";
import chest from "./chest.png";

const Chests = ({ loged, chests, history }) => {
  if (!loged) {
    history.push("/configuration");
    return null;
  }

  

  console.log(chests);

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Chests</Card.Title>
          <Card.Text>Contain all chests in memory of server</Card.Text>
          {chests.map((c, key) => {
            console.log(c);
            return (
              <div key={key}>
                {/* <canvas id="windowCanvas" width="352" height="332"> */}
                <img alt="" id="windowImage" src={chest} />

                {/* </canvas> */}
              </div>
            );
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
