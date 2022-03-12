import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
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

const ConfigureBotRoute = ({ loged, match, socket, botsOnline, getBotBySocketId, selectedSocketId, setSelectedSocketId, getBotIndexBySocketId }) => {
  const [botName, setBotName] = useState('')
  let navigate = useNavigate();
  useEffect(() => {
    if (!loged) {
      navigate('/configuration')
      return
    }
  }, [loged, navigate])

  useEffect(() => {
    if (selectedSocketId === undefined) {
      navigate('/dashboard')
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
  }, [selectedSocketId, getBotBySocketId, socket, botsOnline, getBotIndexBySocketId, setSelectedSocketId, navigate])

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
        match={match}
      >
        <Routes>
          <Route path="/configurebot/generalconfig" element={<GeneralConfig />} />
          <Route path="/configurebot/itemstobeready" element={<ItemsToBeReady />} />
          <Route path="/configurebot/chests" element={<Chests />} />
          <Route path="/configurebot/combat" element={<Combat />} />
          <Route path="/configurebot/guardjob" element={<GuardJob />} />
          <Route path="/configurebot/minerjob" element={<MinerJob />} />
          <Route path="/configurebot/farmerjob" element={<FarmerJob />} />
          <Route path="/configurebot/breederjob" element={<BreederJob />} />
          <Route path="/configurebot/SorterJob" element={<SorterJob />} />
          <Route path="/configurebot/processlist" element={<ProcessList />} />
          <Route path="/configurebot/*" element={<NotFound />} />
        </Routes>
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
