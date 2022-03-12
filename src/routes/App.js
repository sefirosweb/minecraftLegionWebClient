import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/general.css";
import Layout from "../components/Layout";
import ConfigureBotRoute from "../components/configurebot/ConfigureBotRoute";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import Configuration from "../pages/Configuration";
import Masterlist from "../pages/Masterlist";
import Chests from "../pages/Chests";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/masterlist" element={<Masterlist />} />
          <Route path="/chests" element={<Chests />} />
          <Route path="/configurebot" element={<ConfigureBotRoute />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
