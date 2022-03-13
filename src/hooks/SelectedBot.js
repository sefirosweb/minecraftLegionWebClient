import React from 'react';
import { connect } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom";
import { getBotIndexBySocketId } from '../actions/botsAction'

const SelectedBot = ({ selectedSocketId, botsOnline }) => {

  if (selectedSocketId === undefined) {
    return <Navigate to="/dashboard" />;
  }

  if (botsOnline.findIndex((e) => { return e.socketId === selectedSocketId }) < 0) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />
}

const mapStateToProps = (reducers) => {
  const { configurationReducer, botsReducer } = reducers;
  const { botsOnline } = botsReducer;
  const { selectedSocketId } = configurationReducer;
  return { selectedSocketId, botsOnline };
};

const mapDispatchToProps = {
  getBotIndexBySocketId
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedBot);
