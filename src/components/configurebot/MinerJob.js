import { Fragment } from 'react'
import House_XYZ from '../../images/House_XYZ.png'

const MinerJob = (props) => {
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
                  <input className="form-check-input" type="radio" name="tunnelType" value="yes" />
                  <label className="form-check-label">Make a Hole</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="tunnelType" value="no" />
                  <label className="form-check-label">Make a Tunel</label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className='col-6'>
          <form>
            <fieldset className="form-group row">
              <legend className="col-form-label col-sm-3 float-sm-left pt-0">Horientation?</legend>
              <div className="col-sm-9">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="onrientationType" value="yes" />
                  <label className="form-check-label">X+</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="onrientationType" value="no" />
                  <label className="form-check-label">X-</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="onrientationType" value="no" />
                  <label className="form-check-label">Z+</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridPionrientationTypeckupItems" value="no" />
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
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">Y</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">Z</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" />
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
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">Y</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-1 col-form-label">Z</label>
                <div className="col-sm-3">
                  <input type="text" className="form-control" />
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

export default MinerJob
