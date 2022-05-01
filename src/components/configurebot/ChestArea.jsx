import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

const chestArea = (props) => {
  const handleChange = (type, event) => {
    const copyChest = { ...props.chestArea }
    copyChest[type] = event.target.value

    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'changeChestArea',
        value: {
          id: props.id,
          chestArea: copyChest
        }
      }
    })
  }

  const handleDeleteChestArea = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'deleteChestArea',
        value: props.id
      }
    })
  }

  return (
    <div className='p-3 mb-3 border rounded'>
      <Row>

        <Col xs={2}>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-primary text-white'>X Start</span></label>
            <input className='form-control' type='text' value={props.chestArea.xStart} onChange={handleChange.bind(props, 'xStart')} />
          </div>
        </Col>

        <Col xs={2}>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-warning text-dark'>Y Layer</span></label>
            <input className='form-control' type='text' value={props.chestArea.yLayer} onChange={handleChange.bind(props, 'yLayer')} />
          </div>
        </Col>

        <Col xs={2}>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-secondary text-white'>Z Start</span></label>
            <input className='form-control' type='text' value={props.chestArea.zStart} onChange={handleChange.bind(props, 'zStart')} />
          </div>
        </Col>

        <Col xs={2}>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-primary text-white'>X End</span></label>
            <input className='form-control' type='text' value={props.chestArea.xEnd} onChange={handleChange.bind(props, 'xEnd')} />
          </div>
        </Col>

        <Col xs={2}>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-secondary text-white'>Z End</span></label>
            <input className='form-control' type='text' value={props.chestArea.zEnd} onChange={handleChange.bind(props, 'zEnd')} />
          </div>
        </Col>

      </Row>
      
      <Row className='mt-2'>
        <Col xs={3}>
          <button className='btn btn-danger form-control' onClick={handleDeleteChestArea}>Delete Area</button>
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

export default connect(mapStateToProps, null)(chestArea)
