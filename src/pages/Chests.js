import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import { connect } from "react-redux";
import DrawChest from "../components/DrawChest";
import { useNavigate } from "react-router-dom";

const Chests = ({ loged, chests }) => {
  let navigate = useNavigate();

  if (!loged) {
    navigate('/configuration')
    return null;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Chests</Card.Title>
          <Card.Text>Contain all chests in memory of server</Card.Text>
          <CardGroup>
            {chests.map((chest, key) => {
              return <DrawChest key={key} chest={chest} />;
            })}
          </CardGroup>
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
