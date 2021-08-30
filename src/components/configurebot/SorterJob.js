import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'
import ChestArea from './ChestArea'

const SorterJob = (props) => {
  const botConfig = props.getBotBySocketId(props.selectedSocketId)
  if (botConfig === undefined) { return null }

  const handleInsertNewChestArea = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'insertNewChestArea'
      }
    })
  }


  const renderChestArea = () => {
    return botConfig.config.chestAreas.map((chestArea, index) => {
      return (
        <ChestArea key={index} id={index} chestArea={chestArea} />
      )
    })
  }

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <h4>Insert chest area</h4>
          {renderChestArea()}
        </div>
      </div>

      <div className='row mb-5'>
        <div className='col-12'>
          <button type='button' className='btn btn-success' onClick={handleInsertNewChestArea}>Insert New Chest Area</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SorterJob)
