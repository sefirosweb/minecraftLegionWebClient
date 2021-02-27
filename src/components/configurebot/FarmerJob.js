import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'
import HarvestArea from './HarvestArea'

const FarmerJob = (props) => {
  const botConfig = props.getBotBySocketId(props.selectedSocketId)
  if (botConfig === undefined) { return null }

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <h4>Insert areas and type of plant for harvest</h4>
          <HarvestArea />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers
  const { botsOnline } = botsReducer
  const { socket, selectedSocketId } = configurationReducer

  return { botsOnline, socket, selectedSocketId }
}

const mapDispatchToProps = {
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(FarmerJob)
