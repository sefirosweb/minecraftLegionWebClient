import { Fragment } from 'react'

const GeneralConfig = (props) => {
  return (
    <Fragment>
      <div className='row'>
        <div className='col-12'>
          <form>

            <fieldset className="form-group row">
              <legend className="col-form-label col-sm-2 float-sm-left pt-0">Job</legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridJob" value="none" />
                  <label className="form-check-label">None</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridJob" value="miner" />
                  <label className="form-check-label">Miner</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridJob" value="guard" />
                  <label className="form-check-label">Guard</label>
                </div>

              </div>
            </fieldset>

            <fieldset className="form-group row">
              <legend className="col-form-label col-sm-2 float-sm-left pt-0">Pick up items?</legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridPickupItems" value="yes" />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridPickupItems" value="no" />
                  <label className="form-check-label">no</label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </Fragment >
  )
}


export default GeneralConfig
