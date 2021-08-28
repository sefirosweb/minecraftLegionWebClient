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
      <div className='row'>
        <div className='col-12'>
          <h4>Animal max by area</h4>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Cow</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.cow} onChange={handleUpdateAnimal.bind(props, 'cow')} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Sheep</label>
              <div className="col-sm-2">
                <input type="text" className="form-control" value={botConfig.config.farmAnimal.sheep} onChange={handleUpdateAnimal.bind(props, 'sheep')} />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <h4>Insert new farm area</h4>
          {renderFarmArea()}
        </div>
      </div>

      <div className='row mb-5'>
        <div className='col-12'>
          <button type='button' className='btn btn-success' onClick={handleInsertNewFarmArea}>Insert New Farm Area</button>
        </div>
      </div>
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
