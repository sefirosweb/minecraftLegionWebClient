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
