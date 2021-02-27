import { useState } from 'react'
import { connect } from 'react-redux'
import ItemsAviable from './ItemsAviable'

const HarvestArea = (props) => {
  const [item, setItem] = useState('')


  const handleItemChange = (event) => {
    setItem(event.target.value)
  }

  return (
    <div className='p-3 mb-3 border rounded'>

      <div className='row'>
        <div className='col-6'>
          <div className='form-group'>
            <label htmlFor='inputItem'>Select Plant</label>
            <input className='form-control' type='text' list='1' value={item} onChange={handleItemChange} />
            <datalist id='1'>
              <ItemsAviable item={item} />
            </datalist>
          </div>
        </div>
        <div className='offset-3 col-3'>
          <button className='btn btn-danger form-control'>Delete Area</button>
        </div>
      </div>

      <div className='row'>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className="badge bg-primary text-white">X Start</span></label>
            <input className='form-control' type='text' value='' />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className='badge bg-warning text-dark'>Y Layer</span></label>
            <input className='form-control' type='text' value='' />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class="badge bg-secondary text-white">Z Start</span></label>
            <input className='form-control' type='text' value='' />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span className="badge bg-primary text-white">X End</span></label>
            <input className='form-control' type='text' value='' />
          </div>
        </div>
        <div className='col-2'>
          <div className='form-group'>
            <label htmlFor='inputItem'><span class="badge bg-secondary text-white">Z End</span></label>
            <input className='form-control' type='text' value='' />
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
