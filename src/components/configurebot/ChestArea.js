import { connect } from 'react-redux'

const chestArea = (props) => {
  const handleChange = (type, event) => {
    const copyChest = { ...props.chestArea }
    copyChest[type] = event.target.value

    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'changeChestArea',
        value: {
          id: props.id,
          chestArea: copyChest
        }
      }
    })
  }

  const handleDeleteChestArea = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'deleteChestArea',
        value: props.id
      }
    })
  }

  return (
    <div className='p-3 mb-3 border rounded'>
      <div className='row'>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-primary text-white'>X Start</span></label>
            <input className='form-control' type='text' value={props.chestArea.xStart} onChange={handleChange.bind(props, 'xStart')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-warning text-dark'>Y Layer</span></label>
            <input className='form-control' type='text' value={props.chestArea.yLayer} onChange={handleChange.bind(props, 'yLayer')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class='badge bg-secondary text-white'>Z Start</span></label>
            <input className='form-control' type='text' value={props.chestArea.zStart} onChange={handleChange.bind(props, 'zStart')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-primary text-white'>X End</span></label>
            <input className='form-control' type='text' value={props.chestArea.xEnd} onChange={handleChange.bind(props, 'xEnd')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class='badge bg-secondary text-white'>Z End</span></label>
            <input className='form-control' type='text' value={props.chestArea.zEnd} onChange={handleChange.bind(props, 'zEnd')} />
          </div>
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-3'>
          <button className='btn btn-danger form-control' onClick={handleDeleteChestArea}>Delete Area</button>
        </div>
      </div>
    </div>

  )
}

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers
  const { socket, selectedSocketId } = configurationReducer
  return { socket, selectedSocketId }
}

export default connect(mapStateToProps, null)(chestArea)
