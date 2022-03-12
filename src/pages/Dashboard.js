import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import RenderBotsOnlineList from '../components/RenderBotsOnlineList'
import BotActionsButtons from '../components/BotActionsButtons'
import { getBotIndexBySocketId } from '../actions/botsAction'
import { setSelectedSocketId } from '../actions/configurationAction'
import { Button, Col, Row } from 'react-bootstrap'

const Dashboard = ({ logs, selectedSocketId, socketId, getBotIndexBySocketId, loged, match, botsOnline, setSelectedSocketId }) => {

    let navigate = useNavigate();

    useEffect(() => {
        if (!loged) {
            navigate('/configuration')
        }
    }, [loged, navigate]);

    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [logs]);

    useEffect(() => {
        if (getBotIndexBySocketId(selectedSocketId) < 0) {
            setSelectedSocketId(undefined)
        }
    }, [botsOnline, selectedSocketId, getBotIndexBySocketId, setSelectedSocketId])

    return (
        <>
            <Row>
                <Col xs={8}>
                    <h1>Dashboard</h1>
                </Col>

                <Col xs={2}>
                    {!selectedSocketId ? '' :
                        <Button
                            as={Link}
                            to='/configurebot/generalconfig'
                            variant='warning'
                        >
                            Configure Bot
                        </Button>
                    }
                </Col>
            </Row>

            <Row>
                <Col xs={10}>

                    <Row>
                        <Col xs={12}>
                            <div className='form-group'>
                                <div className='textAreaStyle form-control'>
                                    {
                                        logs.filter(log => {
                                            if (!selectedSocketId) return true
                                            return log.socketId === selectedSocketId
                                        }).map((log, key) => <div key={key}>{log.time} {log.botName} {log.message}</div>)
                                    }
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                            {selectedSocketId ?
                                <BotActionsButtons socketId={selectedSocketId} /> :
                                <div className='pendingSelectBot'>Select any bot for do actions</div>
                            }
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
    const { botsReducer, configurationReducer } = reducers
    const { botsOnline, logs } = botsReducer
    const { loged, selectedSocketId } = configurationReducer

    return { botsOnline, logs, loged, selectedSocketId }
}


const mapDispatchToProps = {
    getBotIndexBySocketId,
    setSelectedSocketId
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
