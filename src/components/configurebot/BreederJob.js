import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'
import FarmArea from './FarmArea'

const BreederJob = (props) => {
  const botConfig = props.getBotBySocketId(props.selectedSocketId)
  if (botConfig === undefined) { return null }

  const handleInsertNewFarmArea = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'insertNewFarmArea'
      }
    })
  }

  const handleUpdateAnimal = (animal, event) => {
    const value = event.target.value
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'changeAnimalValue',
        value: {
          id: props.id,
          animal,
          value
        }
      }
    })
  }

  const renderFarmArea = () => {
    return botConfig.config.farmAreas.map((farmArea, index) => {
      return (
        <FarmArea key={index} id={index} farmArea={farmArea} />
      )
    })
  }

  return (
    <>
      <Row>
        <Col>
          <h4>Animal max by area</h4>
        </Col>
      </Row>

      <Row>
        <Col>
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Feed every seconds</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.seconds} onChange={handleUpdateAnimal.bind(props, 'seconds')} />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Cow</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.cow} onChange={handleUpdateAnimal.bind(props, 'cow')} />
              </div>
              <label className="col-sm-2 col-form-label">Sheep</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.sheep} onChange={handleUpdateAnimal.bind(props, 'sheep')} />
              </div>
              <label className="col-sm-2 col-form-label">Chicken</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.chicken} onChange={handleUpdateAnimal.bind(props, 'chicken')} />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Horse</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.horse} onChange={handleUpdateAnimal.bind(props, 'horse')} />
              </div>
              <label className="col-sm-2 col-form-label">Donkey</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.donkey} onChange={handleUpdateAnimal.bind(props, 'donkey')} />
              </div>
              <label className="col-sm-2 col-form-label">Llama</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.llama} onChange={handleUpdateAnimal.bind(props, 'llama')} />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Fox</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.fox} onChange={handleUpdateAnimal.bind(props, 'fox')} />
              </div>
              <label className="col-sm-2 col-form-label">Bee</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.bee} onChange={handleUpdateAnimal.bind(props, 'bee')} />
              </div>
              <label className="col-sm-2 col-form-label">Panda</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.panda} onChange={handleUpdateAnimal.bind(props, 'panda')} />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Wolf</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.wolf} onChange={handleUpdateAnimal.bind(props, 'wolf')} />
              </div>
              <label className="col-sm-2 col-form-label">Cat</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.cat} onChange={handleUpdateAnimal.bind(props, 'cat')} />
              </div>
              <label className="col-sm-2 col-form-label">Rabbit</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.rabbit} onChange={handleUpdateAnimal.bind(props, 'rabbit')} />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Pig</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.pig} onChange={handleUpdateAnimal.bind(props, 'pig')} />
              </div>
              <label className="col-sm-2 col-form-label">Turtles</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.turtles} onChange={handleUpdateAnimal.bind(props, 'turtles')} />
              </div>

            </div>




          </form>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>Insert new farm area</h4>
          {renderFarmArea()}
        </Col>
      </Row>


      <Row className='mb-5'>
        <Col>
          <button type='button' className='btn btn-success' onClick={handleInsertNewFarmArea}>Insert New Farm Area</button>
        </Col>
      </Row>

    </>
  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers
  const { socket, selectedSocketId } = configurationReducer

  return { socket, selectedSocketId }
}

const mapDispatchToProps = {
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(BreederJob)
