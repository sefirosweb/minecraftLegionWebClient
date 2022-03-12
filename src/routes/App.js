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
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/configuration" element={Configuration} />
          <Route exact path="/masterlist" element={Masterlist} />
          <Route exact path="/chests" element={Chests} />
          <Route path="/configurebot" element={ConfigureBotRoute} />
          <Route exact from="/" element={<Navigate replace to="/dashboard" />}
          />
          <Route element={NotFound} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
