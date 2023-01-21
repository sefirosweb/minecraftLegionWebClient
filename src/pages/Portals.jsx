import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import CoordsTable from "../components/CoordsTable";
const Portals = ({ portals }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <h2>Overworld -> Nether</h2>
          <CoordsTable positions={portals.overworld.the_nether} />
          <h2>Overworld -> End</h2>
          <CoordsTable positions={portals.overworld.the_end} />
          <h2>Nether -> Overworld</h2>
          <CoordsTable positions={portals.the_nether} />
          <h2>End -> Overworld</h2>
          <CoordsTable positions={portals.the_end} />
        </Card.Body>
      </Card>
    </>
  );
};

const mapStateToProps = (reducers) => {
  const { botsReducer } = reducers;
  const { portals } = botsReducer;

  return { portals };
};

export default connect(mapStateToProps)(Portals);
