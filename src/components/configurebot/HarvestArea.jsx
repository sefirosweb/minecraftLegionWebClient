import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import ItemsAviable from './ItemsAviable'

const HarvestArea = (props) => {
  const {
    id,
    plantArea,
    socket,
    selectedSocketId
  } = props

  const handleChange = (type, event) => {
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
            <input className='form-control' type='text' list={id} value={plantArea.plant ? plantArea.plant : ''} onChange={handleChange.bind(props, 'plant')} />
            <datalist id={id}>
              <ItemsAviable item={plantArea.plant ? plantArea.plant : ''} type='plants' />
            </datalist>
          </div>
        </Col>
        <Col md={{ span: 3, offset: 3 }}>
          <button className='btn btn-danger form-control' onClick={handleDeletePlantArea}>Delete Area</button>
        </Col>
        
      </Row>

      <div className='row'>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-primary text-white'>X Start</span></label>
            <input className='form-control' type='text' value={plantArea.xStart} onChange={handleChange.bind(props, 'xStart')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-warning text-dark'>Y Layer</span></label>
            <input className='form-control' type='text' value={plantArea.yLayer} onChange={handleChange.bind(props, 'yLayer')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class='badge bg-secondary text-white'>Z Start</span></label>
            <input className='form-control' type='text' value={plantArea.zStart} onChange={handleChange.bind(props, 'zStart')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-primary text-white'>X End</span></label>
            <input className='form-control' type='text' value={plantArea.xEnd} onChange={handleChange.bind(props, 'xEnd')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class='badge bg-secondary text-white'>Z End</span></label>
            <input className='form-control' type='text' value={plantArea.zEnd} onChange={handleChange.bind(props, 'zEnd')} />
          </div>
        </div>
      </div>

    </div>

  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers
  const { socket, selectedSocketId } = configurationReducer
  return { socket, selectedSocketId }
}

export default connect(mapStateToProps, null)(HarvestArea)
