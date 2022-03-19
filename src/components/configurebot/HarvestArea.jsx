import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import ItemsAviable from './ItemsAviable'
import LayerCoords from '../forms/LayerCoords'

const HarvestArea = (props) => {
  const {
    id,
    plantArea,
    socket,
    selectedSocketId
  } = props

  const handleChange = (event, type) => {
    const copyPlant = { ...plantArea }
    copyPlant[type] = event.target.value

    socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: selectedSocketId,
      value: {
        configToChange: 'changePlantArea',
        value: {
          id: id,
          plantArea: copyPlant
        }
      }
    })
  }

  const handleDeletePlantArea = (event) => {
    socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: selectedSocketId,
      value: {
        configToChange: 'deletePlantArea',
        value: id
      }
    })
  }

  return (
    <div className='p-3 mb-3 border rounded'>
      <Row className='mb-3'>

        <Col md={6}>
          <div className='form-group'>
            <label htmlFor='inputItem'>Select Plant</label>
            <input className='form-control' type='text' list={id} value={plantArea.plant ? plantArea.plant : ''} onChange={(e) => handleChange(e, 'plant')} />
            <datalist id={id}>
              <ItemsAviable item={plantArea.plant ? plantArea.plant : ''} type='plants' />
            </datalist>
          </div>
        </Col>
        <Col md={{ span: 3, offset: 3 }}>
          <button className='btn btn-danger form-control' onClick={handleDeletePlantArea}>Delete Area</button>
        </Col>

      </Row>

      <LayerCoords
        area={plantArea}
        onChange={handleChange}
      />

    </div>

  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers
  const { socket, selectedSocketId } = configurationReducer
  return { socket, selectedSocketId }
}

export default connect(mapStateToProps, null)(HarvestArea)
