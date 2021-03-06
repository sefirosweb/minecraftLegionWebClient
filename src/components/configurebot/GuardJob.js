import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'
import ArrowUp from './Icons/ArrowUp'
import ArrowDown from './Icons/ArrowDown'
import TrashIcon from './Icons/Trash'

const GuardJob = (props) => {
  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [z, setZ] = useState('')

  const botConfig = props.getBotBySocketId(props.selectedSocketId)
  if (botConfig === undefined) { return null }

  const changePos = (event) => {
    const value = Number(event.target.value)
    if (!Number.isInteger(value) && event.target.value !== '-') {
      return null
    }

    switch (event.target.id) {
      case 'xPos':
        setX(event.target.value)
        break
      case 'yPos':
        setY(event.target.value)
        break
      case 'zPos':
        setZ(event.target.value)
        break
      default:
        return null
    }
  }
  const insertPost = (event) => {
    if (!Number.isInteger(Number(x)) || !Number.isInteger(Number(y)) || !Number.isInteger(Number(z))) {
      return null
    }

    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'addPatrol',
        value: {
          x: Number(x),
          y: Number(y),
          z: Number(z)
        }
      }
    })
  }

  const handleRemovePos = (index, event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'removePatrol',
        value: index
      }
    })
  }

  const handleMovePosNext = (index, event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'movePatrolNext',
        value: index
      }
    })
  }

  const handleMovePosPrev = (index, event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'movePatrolPrev',
        value: index
      }
    })
  }

  const handleButtonSavePositionHasMaster = (event) => {
    console.log('handle save')
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'savePositionHasMaster',
        value: props.master
      }
    })
  }

  const renderPatrolTable = () => {
    return botConfig.config.patrol.map((pos, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{index}</th>
          <td>X:{pos.x}<br />Y:{pos.y}<br />Z:{pos.z}</td>
          <td><ArrowUp onClick={handleMovePosPrev.bind(this, index)} /> <ArrowDown onClick={handleMovePosNext.bind(this, index)} /></td>
          <td><TrashIcon onClick={handleRemovePos.bind(this, index)} /></td>
        </tr>
      )
    })
  }

  const handleCHangeHelp = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'helpFriend',
        value: event.target.value
      }
    })
  }

  const copyPatrol = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'copyPatrol',
        value: props.master
      }
    })
  }

  return (
    <>
      <div className='row'>
        <div className='col-6'>
          <form>
            <fieldset className='form-group row'>
              <legend className='col-form-label col-sm-3 float-sm-left pt-0'>Help Friend?</legend>
              <div className='col-sm-9'>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' name='checkHelpFriend' value='true' onChange={handleCHangeHelp} checked={botConfig.config.helpFriends === true} />
                  <label className='form-check-label'>Yes</label>
                </div>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' name='checkHelpFriend' value='false' onChange={handleCHangeHelp} checked={botConfig.config.helpFriends === false} />
                  <label className='form-check-label'>No</label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className='col-6'>
          <button type='button' className='btn btn-primary' onClick={handleButtonSavePositionHasMaster}>Copy the same position as the master</button>
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col-2'>
          <label>Position XYZ:</label>
        </div>
        <div className='col-2'>
          <input type='text' className='form-control' placeholder='X' id='xPos' value={x} onChange={changePos} />
        </div>
        <div className='col-2'>
          <input type='text' className='form-control' placeholder='Y' id='yPos' value={y} onChange={changePos} />
        </div>
        <div className='col-2'>
          <input type='text' className='form-control' placeholder='Z' id='zPos' value={z} onChange={changePos} />
        </div>
        <div className='col-2'>
          <button type='button' className='btn btn-primary form-control' onClick={insertPost}>Insert</button>
        </div>
        <div className='col-2'>
          {botConfig.config.isCopingPatrol
            ? <button type='button' className='btn btn-warning form-control' onClick={copyPatrol}>Stop Copy</button>
            : <button type='button' className='btn btn-success form-control' onClick={copyPatrol}>Start Copy</button>}
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>

          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>POS</th>
                <th scope='col'>Move</th>
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {renderPatrolTable()}
            </tbody>
          </table>

        </div>
      </div>

    </>
  )
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers
  const { botsOnline } = botsReducer
  const { socket, selectedSocketId, master } = configurationReducer

  return { botsOnline, socket, selectedSocketId, master }
}

const mapDispatchToProps = {
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(GuardJob)
