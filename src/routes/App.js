import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/general.css";

import Layout from "../components/Layout";

const NotFound = lazy(() => import("../pages/NotFound"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const Masterlist = lazy(() => import("../pages/Masterlist"))
const Chests = lazy(() => import("../pages/Chests"))
const GeneralConfig = lazy(() => import("../components/configurebot/GeneralConfig"))
const ItemsToBeReady = lazy(() => import("../components/configurebot/ItemsToBeReady"))
const ConfigurebotChests = lazy(() => import("../components/configurebot/Chests"))
const Combat = lazy(() => import("../components/configurebot/Combat"))
const GuardJob = lazy(() => import("../components/configurebot/GuardJob"))
const MinerJob = lazy(() => import("../components/configurebot/MinerJob"))
const FarmerJob = lazy(() => import("../components/configurebot/FarmerJob"))
const BreederJob = lazy(() => import("../components/configurebot/BreederJob"))
const SorterJob = lazy(() => import("../components/configurebot/SorterJob"))
const ProcessList = lazy(() => import("../components/configurebot/ProcessList"))
const ConfigureBotLayout = lazy(() => import("../components/configurebot/ConfigureBotLayout"))
const Authenticated = lazy(() => import("../hooks/Authenticated"))
const SelectedBot = lazy(() => import("../hooks/SelectedBot"))
const Configuration = lazy(() => import('../pages/Configuration'));

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/configuration" element={<Configuration />} />

          <Route exact path='/' element={<Authenticated />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/masterlist" element={<Masterlist />} />
            <Route path="/chests" element={<Chests />} />

            <Route exact path='/configurebot' element={<SelectedBot />}>
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
            </Route>

            <Route path="*" element={<NotFound />} />

          </Route>

        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
