import { Button, Col, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

const FarmArea = (props) => {
  const handleChange = (type, event) => {
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

      <Row>

        <Form.Group as={Col} sm="4" md="3" lg="2" controlId="validationCustomFeed">
          <Form.Label><span className='badge bg-primary text-white'>X Start</span></Form.Label>
          <Form.Control
            type="text"
            value={props.farmArea.xStart}
            onChange={handleChange.bind(props, 'xStart')}
          />
        </Form.Group>

        <Form.Group as={Col} sm="4" md="3" lg="2" controlId="validationCustomFeed">
          <Form.Label><span className='badge bg-warning text-dark'>Y Layer</span></Form.Label>
          <Form.Control
            type="text"
            value={props.farmArea.yLayer}
            onChange={handleChange.bind(props, 'yLayer')}
          />
        </Form.Group>

        <Form.Group as={Col} sm="4" md="3" lg="2" controlId="validationCustomFeed">
          <Form.Label><span class='badge bg-secondary text-white'>Z Start</span></Form.Label>
          <Form.Control
            type="text"
            value={props.farmArea.zStart}
            onChange={handleChange.bind(props, 'zStart')}
          />
        </Form.Group>

        <Form.Group as={Col} sm="4" md="3" lg="2" controlId="validationCustomFeed">
          <Form.Label><span className='badge bg-primary text-white'>X End</span></Form.Label>
          <Form.Control
            type="text"
            value={props.farmArea.xEnd}
            onChange={handleChange.bind(props, 'xEnd')}
          />
        </Form.Group>

        <Form.Group as={Col} sm="4" md="3" lg="2" controlId="validationCustomFeed">
          <Form.Label><span class='badge bg-secondary text-white'>Z End</span></Form.Label>
          <Form.Control
            type="text"
            value={props.farmArea.zEnd}
            onChange={handleChange.bind(props, 'zEnd')}
          />
        </Form.Group>

      </Row >

      <Row>
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
