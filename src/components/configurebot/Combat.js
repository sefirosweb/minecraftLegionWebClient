import { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'

const Combat = (props) => {
  const botConfig = props.getBotBySocketId(props.selectedSocketId)
  if (botConfig === undefined) { return null }

  const handleChangeMode = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'mode',
        value: event.target.value
      }
    })
  }

  const handleChangeDistance = (event) => {
    const distance = Number(event.target.value)
    if (Number.isInteger(distance)) {
      props.socket.emit('sendAction', {
        action: 'changeConfig',
        socketId: botConfig.socketId,
        value: {
          configToChange: 'distance',
          value: distance
        }
      })
    }
  }

  return (
    <>
      <Row>
        <Col xs={6}>
          <form>


            <fieldset className='form-group row'>
              <legend className='col-form-label col-sm-4 float-sm-left pt-0'>Combat Mode?</legend>
              <Col xs={8}>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' name='combatMode' value='none' onChange={handleChangeMode} checked={botConfig.config.mode === 'none'} />
                  <label className='form-check-label'>None</label>
                </div>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' name='combatMode' value='pve' onChange={handleChangeMode} checked={botConfig.config.mode === 'pve'} />
                  <label className='form-check-label'>PVE</label>
                </div>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' name='combatMode' value='pvp' onChange={handleChangeMode} checked={botConfig.config.mode === 'pvp'} />
                  <label className='form-check-label'>PVP</label>
                </div>

              </Col>
            </fieldset>

          </form>
        </Col>
        <Col xs={3}>
          <div className='form-group'>
            <label>Distance for start combat?</label>
            <input className='form-control' type='text' onChange={handleChangeDistance} value={botConfig.config.distance} />
          </div>
        </Col>
      </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Combat)
