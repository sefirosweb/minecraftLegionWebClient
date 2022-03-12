import { useEffect } from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/general.css";

import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import Configuration from "../pages/Configuration";
import Masterlist from "../pages/Masterlist";
import Chests from "../pages/Chests";

import GeneralConfig from "../components/configurebot/GeneralConfig";
import ItemsToBeReady from "../components/configurebot/ItemsToBeReady";
import ConfigurebotChests from "../components/configurebot/Chests";
import Combat from "../components/configurebot/Combat";
import GuardJob from "../components/configurebot/GuardJob";
import MinerJob from "../components/configurebot/MinerJob";
import FarmerJob from "../components/configurebot/FarmerJob";
import BreederJob from "../components/configurebot/BreederJob";
import SorterJob from "../components/configurebot/SorterJob";
import ProcessList from "../components/configurebot/ProcessList";

import ConfigureBotLayout from "../components/configurebot/ConfigureBotLayout";


const App = ({ loged }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!loged) {
      navigate('/configuration')
    }
  }, [loged, navigate])

  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/masterlist" element={<Masterlist />} />
          <Route path="/chests" element={<Chests />} />

          <Route path="/configurebot" element={<ConfigureBotLayout />}>
            <Route path="generalconfig" element={<GeneralConfig />} />
            <Route path="itemstobeready" element={<ItemsToBeReady />} />
            <Route path="chests" element={<ConfigurebotChests />} />
            <Route path="combat" element={<Combat />} />
            <Route path="guardjob" element={<GuardJob />} />
            <Route path="minerjob" element={<MinerJob />} />
            <Route path="farmerjob" element={<FarmerJob />} />
            <Route path="breederjob" element={<BreederJob />} />
            <Route path="SorterJob" element={<SorterJob />} />
            <Route path="processlist" element={<ProcessList />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
  );
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers;
  const { loged } = configurationReducer;
  return { loged };
};

export default connect(mapStateToProps)(App);
