import { Fragment } from 'react'
import Chest from './Chest'

const Chests = (props) => {
  return (
    <Fragment>
      <div className='row'>
        <div className='col-12'>
          <label>
            When the bot is not ready, they go to chest to withdraw or deposit items <br />
            On withdraw try to get items in list,<br />
            On deposit EXCLUDE items in list
          </label>
        </div>
      </div>

      <Chest />
      <Chest />
      <Chest />

      <div className='row mb-5'>
        <div className='col-12'>
          <button type='button' className='btn btn-success'>Insert New Chest</button>
        </div>
      </div>
    </Fragment>
  )
}

export default Chests
