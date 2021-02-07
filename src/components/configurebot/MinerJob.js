import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'
import House_XYZ from '../../images/House_XYZ.png'

const MinerJob = (props) => {

  const [botConfig] = useState(props.getBotBySocketId(props.match.params.socketId))
  if (botConfig === undefined) {
    props.history.push('/dashboard')
    return null
  }

  const handleChangeTunnel = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'changeTunnel',
        value: event.target.value
      }
    })
  }


  const handleChangeOrientation = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'changeOrientation',
        value: event.target.value
      }
    })
  }


  const handleChangePosMiner = (event) => {
    const pos = event.target.value
    const coord = event.target.id
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'changePosMiner',
        value: {
          coord,
          pos
        }
      }
    })
  }

  return (
    <Fragment>

      <div className='row'>
        <div className='col-12'>
          <label>
            Depending the tunnel type and orientation have a different behavior
          </label>
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-6'>
          <form>
            <fieldset className="form-group row">
              <legend className="col-form-label col-sm-3 float-sm-left pt-0">Tunel type?</legend>
              <div className="col-sm-9">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="tunnelType" value="vertically" onChange={handleChangeTunnel} checked={botConfig.config.minerCords.tunel === 'vertically'} />
                  <label className="form-check-label">Make a Hole</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="tunnelType" value="horizontally" onChange={handleChangeTunnel} checked={botConfig.config.minerCords.tunel === 'horizontally'} />
                  <label className="form-check-label">Make a Tunel</label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className='col-6'>
          <form>
            <fieldset className="form-group row">
              <legend className="col-form-label col-sm-3 float-sm-left pt-0">Orientation?</legend>
              <div className="col-sm-9">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="onrientationType" value="x+" onChange={handleChangeOrientation} checked={botConfig.config.minerCords.orientation === 'x+'} />
                  <label className="form-check-label">X+</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="onrientationType" value="x-" onChange={handleChangeOrientation} checked={botConfig.config.minerCords.orientation === 'x-'} />
                  <label className="form-check-label">X-</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="onrientationType" value="z+" onChange={handleChangeOrientation} checked={botConfig.config.minerCords.orientation === 'z+'} />
                  <label className="form-check-label">Z+</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="onrientationType" value="z-" onChange={handleChangeOrientation} checked={botConfig.config.minerCords.orientation === 'z-'} />
                  <label className="form-check-label">Z-</label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>

      <div className='row'>
        <div className='col-6'>
          <fieldset className="form-group row">
            <legend className="col-form-label col-sm-3 float-sm-left pt-0">Start Coords</legend>
            <div className="col-sm-9">

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">X</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" id='xStart' onChange={handleChangePosMiner} value={botConfig.config.minerCords.xStart} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">Y</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" id='yStart' onChange={handleChangePosMiner} value={botConfig.config.minerCords.yStart} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">Z</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" id='zStart' onChange={handleChangePosMiner} value={botConfig.config.minerCords.zStart} />
                </div>
              </div>

            </div>
          </fieldset>
        </div>
        <div className='col-6'>
          <fieldset className="form-group row">
            <legend className="col-form-label col-sm-3 float-sm-left pt-0">End Coords</legend>
            <div className="col-sm-9">

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">X</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" id='xEnd' onChange={handleChangePosMiner} value={botConfig.config.minerCords.xEnd} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">Y</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" id='yEnd' onChange={handleChangePosMiner} value={botConfig.config.minerCords.yEnd} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">Z</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" id='zEnd' onChange={handleChangePosMiner} value={botConfig.config.minerCords.zEnd} />
                </div>
              </div>

            </div>
          </fieldset>
        </div>
      </div>

      <div className='row mb-5'>
        <div className='col-12'>
          <label>
            <img src={House_XYZ} width='100%' alt="House_XYZ" />
          </label>
        </div>
      </div>
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(MinerJob);