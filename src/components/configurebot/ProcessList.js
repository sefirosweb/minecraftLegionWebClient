import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'


const FarmerJob = (props) => {
  const botConfig = props.getBotBySocketId(props.selectedSocketId)
  if (botConfig === undefined) { return null }

  const renderEvents = () => {
      return botConfig.events.map(e => {
        return <li>{e}</li>
      })
  }

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <h4>List of all events used by bot</h4>
          <div className='border border-warning'>
            <ul>
              {renderEvents()}
            </ul>
          </div>
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
