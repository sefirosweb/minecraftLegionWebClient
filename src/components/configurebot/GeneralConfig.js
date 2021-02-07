import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'

const GeneralConfig = (props) => {
  const [botConfig] = useState(props.getBotBySocketId(props.match.params.socketId))
  if (botConfig === undefined) {
    props.history.push('/dashboard')
    return null
  }

  const handleChangeJob = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'job',
        value: event.target.value
      }
    })
  }

  const handleChangePickUpItems = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'pickUpItems',
        value: event.target.value
      }
    })
  }

  return (

    <Fragment>
      <div className='row'>
        <div className='col-12'>
          <form>

            <fieldset className="form-group row">
              <legend className="col-form-label col-sm-2 float-sm-left pt-0">Job</legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridJob" value="none" onChange={handleChangeJob} checked={botConfig.config.job === "none"} />
                  <label className="form-check-label">None</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridJob" value="miner" onChange={handleChangeJob} checked={botConfig.config.job === "miner"} />
                  <label className="form-check-label">Miner</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridJob" value="guard" onChange={handleChangeJob} checked={botConfig.config.job === "guard"} />
                  <label className="form-check-label">Guard</label>
                </div>

              </div>
            </fieldset>

            <fieldset className="form-group row">
              <legend className="col-form-label col-sm-2 float-sm-left pt-0">Pick up items?</legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridPickupItems" value="true" onChange={handleChangePickUpItems} checked={botConfig.config.pickUpItems === true} />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridPickupItems" value="false" onChange={handleChangePickUpItems} checked={botConfig.config.pickUpItems === false} />
                  <label className="form-check-label">no</label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </Fragment >
  )
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers
  const { botsOnline } = botsReducer
  const { socket } = configurationReducer

  return { socket, botsOnline }
}

const mapDispatchToProps = {
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralConfig);
