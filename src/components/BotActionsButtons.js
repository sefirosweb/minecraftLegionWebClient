import React from 'react'

const Spinner = (props) => (
    <React.Fragment>
        <div className='row'>
            <div className='col-12'>
                <div className='form-group'>
                    <input type='text' placeholder='Send chat message' className='form-control' />
                </div>
            </div>
        </div>

        <div className='row'>
            <div className='col-12'>
                <button type='button' className='btn btn-primary mr-3'>Send</button>
                <button type='button' className='btn btn-primary mr-3'>Send</button>
                <button type='button' className='btn btn-primary mr-3'>Send</button>
                <button type='button' className='btn btn-primary mr-3'>Send</button>
                <button type='button' className='btn btn-primary mr-3'>Send</button>
            </div>
        </div>
    </React.Fragment>
)

export default Spinner