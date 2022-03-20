import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RenderBotsOnlineList from '../components/RenderBotsOnlineList'
import BotActionsButtons from '../components/BotActionsButtons'
import { getBotIndexBySocketId } from '../actions/botsAction'
import { setSelectedSocketId } from '../actions/configurationAction'
import { Button, Col, Row } from 'react-bootstrap'

const Dashboard = ({ logs, selectedSocketId, socketId, getBotIndexBySocketId, match, botsOnline, setSelectedSocketId }) => {
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
            <Row className='mt-3'>
                <Col md={8} className='mb-3'>
                    <h1>Dashboard</h1>
                </Col>

                <Col md={2} className='mb-3'>
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
                <Col xs={{ span: 12, order: 2 }} md={{ span: 9, order: 1 }} lg={10}>

                    <Row className='mb-3'>
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
                <Col xs={{ span: 12, order: 1 }} md={{ span: 3, order: 2 }} lg={2} className='mb-3'>
                    <RenderBotsOnlineList />
                </Col>
            </Row>
        </>
    )

}

const mapStateToProps = (reducers) => {
    const { botsReducer, configurationReducer } = reducers
    const { botsOnline, logs } = botsReducer
    const { selectedSocketId } = configurationReducer

    return { botsOnline, logs, selectedSocketId }
}


const mapDispatchToProps = {
    getBotIndexBySocketId,
    setSelectedSocketId
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
