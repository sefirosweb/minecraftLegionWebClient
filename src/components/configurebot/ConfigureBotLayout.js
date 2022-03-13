import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Row } from 'react-bootstrap'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import RenderBotsOnlineList from './../../components/RenderBotsOnlineList'
import { getBotBySocketId, getBotIndexBySocketId } from "../../actions/botsAction";
import { setSelectedSocketId } from '../../actions/configurationAction'

const ConfigureBotLayout = ({ match, socket, getBotBySocketId, selectedSocketId, setSelectedSocketId, getBotIndexBySocketId }) => {
  const [botName, setBotName] = useState('')
  let navigate = useNavigate();

  useEffect(() => {
    socket.emit("sendAction", {
      action: "getConfig",
      socketId: selectedSocketId,
      value: "",
    });

    setBotName(getBotBySocketId(selectedSocketId).name)
  }, [selectedSocketId, getBotBySocketId, socket])


  if (selectedSocketId === undefined) {
    navigate('/dashboard')
    return ''
  }

  if (getBotIndexBySocketId(selectedSocketId) < 0) {
    setSelectedSocketId(undefined)
    navigate('/dashboard')
    return ''
  }

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
          <h2>Bot Configuration - {botName ? botName : ''}</h2>
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

      <Row>
        <Col xs={10}>
          <Row>
            <Col>
              <ul className='nav nav-tabs bg-dark'>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/generalconfig'>General Configuration</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/itemstobeready'>Items To Be Ready</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/chests'>Chests</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/combat'>Combat</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/guardjob'>Guard Job</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/minerjob'>Miner Job</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/farmerjob'>Farmer Job</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/breederjob'>Breeder Job</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/sorterjob'>Sorter Job</NavLink></li>
                <li className='nav-item'><NavLink className='nav-link linkSpan' to='/configurebot/processlist'>Process list</NavLink></li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='card px-5 pt-4 mr-0'>
                <Outlet />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={2}>
          <RenderBotsOnlineList />
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers;
  const { logs } = botsReducer;
  const { socket, selectedSocketId } = configurationReducer;
  return { logs, socket, selectedSocketId };
};

const mapDispatchToProps = {
  getBotBySocketId,
  setSelectedSocketId,
  getBotIndexBySocketId
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureBotLayout);
