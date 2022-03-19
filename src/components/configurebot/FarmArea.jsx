import { Button, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import LayerCoords from '../forms/LayerCoords'

const FarmArea = (props) => {

  const { farmArea } = props

  const handleChange = (event, type) => {
    const copyFarm = { ...props.farmArea }
    copyFarm[type] = event.target.value

    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'changeFarmArea',
        value: {
          id: props.id,
          farmArea: copyFarm
        }
      }
    })
  }

  const handleDeleteFarmArea = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'deleteFarmArea',
        value: props.id
      }
    })
  }

  return (
    <div className='p-3 mb-3 border rounded'>

      <LayerCoords
        area={farmArea}
        onChange={handleChange}
      />

      <Row className='mt-3'>
        <Col>
          <Button variant='danger' onClick={handleDeleteFarmArea}>
            Delete Area
          </Button>
        </Col>
      </Row>
    </div >

  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers
  const { socket, selectedSocketId } = configurationReducer
  return { socket, selectedSocketId }
}

export default connect(mapStateToProps, null)(FarmArea)
