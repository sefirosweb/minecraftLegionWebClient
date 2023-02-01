import { connect } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom";

const Authenticated = ({ loged }) => {
  return loged ? <Outlet /> : <Navigate to="/configuration" />;
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers;
  const { loged } = configurationReducer;
  return { loged };
};


export default connect(mapStateToProps)(Authenticated)
