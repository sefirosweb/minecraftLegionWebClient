import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'
import HarvestArea from './HarvestArea'

const FarmerJob = (props) => {
  const botConfig = props.getBotBySocketId(props.selectedSocketId)
  if (botConfig === undefined) { return null }

  const handleInsertNewPlantArea = (event) => {
    props.socket.emit('sendAction', {
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
      <div className='row'>
        <div className='col-12'>
          <h4>Insert areas and type of plant for harvest</h4>
          {renderPlantAreas()}
        </div>
      </div>

      <div className='row mb-5'>
        <div className='col-12'>
          <button type='button' className='btn btn-success' onClick={handleInsertNewPlantArea}>Insert New Area</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(FarmerJob)
