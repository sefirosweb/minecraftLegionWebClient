import { Button, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'
import HarvestArea from './HarvestArea'

const FarmerJob = (props) => {

  const {
    socket,
    botsOnline,
    selectedSocketId
  } = props

  const botConfig = botsOnline.find((e) => { return e.socketId === selectedSocketId })
  if (botConfig === undefined) { return null }

  const handleInsertNewPlantArea = (event) => {
    socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'insertNewPlantArea'
      }
    })
  }

  const renderPlantAreas = () => {
    return botConfig.config.plantAreas.map((plantArea, index) => {
      return (
        <HarvestArea key={index} id={index} plantArea={plantArea} />
      )
    })
  }

  return (
    <>
      <Row className='mb-3'>
        <Col>
          <h4>Insert areas and type of plant for harvest</h4>
          {renderPlantAreas()}
        </Col>
      </Row>

      <Row className='mb-5'>
        <Col>
          <Button
            variant='success'
            onClick={handleInsertNewPlantArea}
          >
            Insert New Area
          </Button>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer, botsReducer } = reducers
  const { socket, selectedSocketId } = configurationReducer
  const { botsOnline } = botsReducer

  return { socket, selectedSocketId, botsOnline }
}

const mapDispatchToProps = {
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(FarmerJob)
