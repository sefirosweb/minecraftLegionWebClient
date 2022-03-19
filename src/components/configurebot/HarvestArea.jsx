import { connect } from 'react-redux'
import ItemsAviable from './ItemsAviable'

const HarvestArea = (props) =>  {
  const handleChange = (type, event) => {
    const copyPlant = { ...props.plantArea }
    copyPlant[type] = event.target.value

    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'changePlantArea',
        value: {
          id: props.id,
          plantArea: copyPlant
        }
      }
    })
  }

  const handleDeletePlantArea = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.selectedSocketId,
      value: {
        configToChange: 'deletePlantArea',
        value: props.id
      }
    })
  }

  return (
    <div className='p-3 mb-3 border rounded'>
      <div className='row'>
        <div className='col-6'>
          <div className='form-group'>
            <label htmlFor='inputItem'>Select Plant</label>
            <input className='form-control' type='text' list={props.id} value={props.plantArea.plant ? props.plantArea.plant : ''} onChange={handleChange.bind(props, 'plant')} />
            <datalist id={props.id}>
              <ItemsAviable item={props.plantArea.plant ? props.plantArea.plant : ''} type='plants' />
            </datalist>
          </div>
        </div>
        <div className='offset-3 col-3'>
          <button className='btn btn-danger form-control' onClick={handleDeletePlantArea}>Delete Area</button>
        </div>
      </div>

      <div className='row'>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-primary text-white'>X Start</span></label>
            <input className='form-control' type='text' value={props.plantArea.xStart} onChange={handleChange.bind(props, 'xStart')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-warning text-dark'>Y Layer</span></label>
            <input className='form-control' type='text' value={props.plantArea.yLayer} onChange={handleChange.bind(props, 'yLayer')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class='badge bg-secondary text-white'>Z Start</span></label>
            <input className='form-control' type='text' value={props.plantArea.zStart} onChange={handleChange.bind(props, 'zStart')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-primary text-white'>X End</span></label>
            <input className='form-control' type='text' value={props.plantArea.xEnd} onChange={handleChange.bind(props, 'xEnd')} />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class='badge bg-secondary text-white'>Z End</span></label>
            <input className='form-control' type='text' value={props.plantArea.zEnd} onChange={handleChange.bind(props, 'zEnd')} />
          </div>
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

export default connect(mapStateToProps, null)(HarvestArea)
