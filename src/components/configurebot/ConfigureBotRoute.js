import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import NotFound from "../../pages/NotFound";

import GeneralConfig from "./GeneralConfig";
import ItemsToBeReady from "./ItemsToBeReady";
import Chests from "./Chests";
import Combat from "./Combat";
import GuardJob from "./GuardJob";
import MinerJob from "./MinerJob";
import FarmerJob from "./FarmerJob";
import BreederJob from "./BreederJob";
import SorterJob from "./SorterJob";
import ProcessList from "./ProcessList";
import ConfigureBotLayout from "./ConfigureBotLayout";
import { setSelectedSocketId } from '../../actions/configurationAction'
import { getBotBySocketId, getBotIndexBySocketId } from "../../actions/botsAction";
import { Button, Col, Row } from "react-bootstrap";

const ConfigureBotRoute = ({ loged, history, match, socket, botsOnline, getBotBySocketId, selectedSocketId, setSelectedSocketId, getBotIndexBySocketId }) => {
  const [botName, setBotName] = useState('')

  useEffect(() => {
    if (!loged) {
      history.push("/configuration");
      return
    }
  }, [loged, history])

  useEffect(() => {
    if (selectedSocketId === undefined) {
      history.push("/dashboard");
      return
    }

    if (getBotIndexBySocketId(selectedSocketId) < 0) {
      setSelectedSocketId(undefined)
      return
    }

    socket.emit("sendAction", {
      action: "getConfig",
      socketId: selectedSocketId,
      value: "",
    });

    setBotName(getBotBySocketId(selectedSocketId).name)
  }, [selectedSocketId, history, getBotBySocketId, socket, botsOnline, getBotIndexBySocketId, setSelectedSocketId])

  const updateReloadButton = () => {
    socket.emit("sendAction", {
      action: "action",
      socketId: selectedSocketId,
      toBotData: {
        type: "reloadConfig",
        value: "",
      },
    });
  }


  return (
    <>
      <Row className="mb-2">
        <Col xs={6}>
          <h2>Bot Configuration - {botName}</h2>
        </Col>
        <Col xs={2}>
          <Button as={Link} to='/dashboard'>
            Dashboard
          </Button>
        </Col>
        <Col xs={2}>
          <Button onClick={updateReloadButton} variant='danger'>
            Reload
          </Button>
        </Col>
      </Row>

      <ConfigureBotLayout
        history={history}
        match={match}
      >
        <Switch>
          <Route exact path="/configurebot/generalconfig" component={GeneralConfig} />
          <Route exact path="/configurebot/itemstobeready" component={ItemsToBeReady} />
          <Route exact path="/configurebot/chests" component={Chests} />
          <Route exact path="/configurebot/combat" component={Combat} />
          <Route exact path="/configurebot/guardjob" component={GuardJob} />
          <Route exact path="/configurebot/minerjob" component={MinerJob} />
          <Route exact path="/configurebot/farmerjob" component={FarmerJob} />
          <Route exact path="/configurebot/breederjob" component={BreederJob} />
          <Route exact path="/configurebot/SorterJob" component={SorterJob} />
          <Route exact path="/configurebot/processlist" component={ProcessList} />
          <Route component={NotFound} />
        </Switch>
      </ConfigureBotLayout>
    </>
  );

}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers;
  const { botsOnline, logs } = botsReducer;
  const { loged, socket, selectedSocketId } = configurationReducer;
  return { botsOnline, logs, loged, socket, selectedSocketId };
};

const mapDispatchToProps = {
  getBotBySocketId,
  setSelectedSocketId,
  getBotIndexBySocketId
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureBotRoute);
