import { connect } from 'react-redux'



const FarmArea = (props) => {
  const handleChange = (type, event) => {
    const copyFarm = { ...props.farmArea }
    copyFarm[type] = event.target.value

    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'changeFarmArea',
        value: {
          id: props.id,
          farmArea: copyFarm
        }
      }
    })
  }

  const handleDeleteFarmArea = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'deleteFarmArea',
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
            <input className='form-control' type='text' value={props.farmArea.xStart} onChange={handleChange.bind(props, 'xStart')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-warning text-dark'>Y Layer</span></label>
            <input className='form-control' type='text' value={props.farmArea.yLayer} onChange={handleChange.bind(props, 'yLayer')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class='badge bg-secondary text-white'>Z Start</span></label>
            <input className='form-control' type='text' value={props.farmArea.zStart} onChange={handleChange.bind(props, 'zStart')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-primary text-white'>X End</span></label>
            <input className='form-control' type='text' value={props.farmArea.xEnd} onChange={handleChange.bind(props, 'xEnd')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class='badge bg-secondary text-white'>Z End</span></label>
            <input className='form-control' type='text' value={props.farmArea.zEnd} onChange={handleChange.bind(props, 'zEnd')} />
          </div>
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-3'>
          <button className='btn btn-danger form-control' onClick={handleDeleteFarmArea}>Delete Area</button>
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

export default connect(mapStateToProps, null)(FarmArea)
