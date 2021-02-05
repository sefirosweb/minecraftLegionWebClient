import React from 'react'
import { Fragment } from 'react'
class GeneralConfig extends React.Component {
  render() {
    return (
      <Fragment>
        <div className='card px-5 pt-4'>
          <div className='row'>
            <div className='col-12'>
              <form>

                <fieldset className="form-group row">
                  <legend className="col-form-label col-sm-2 float-sm-left pt-0">Job</legend>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridJob" id="jobNone" value="none" checked />
                      <label className="form-check-label" for="jobNone">None</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridJob" id="jobMiner" value="miner" />
                      <label className="form-check-label" for="jobMiner">Miner</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridJob" id="jobGuard" value="guard" />
                      <label className="form-check-label" for="jobGuard">Guard</label>
                    </div>

                  </div>
                </fieldset>

                <fieldset className="form-group row">
                  <legend className="col-form-label col-sm-2 float-sm-left pt-0">Pick up items?</legend>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridPickupItems" id="pickUpItemsTrue" value="yes" checked />
                      <label className="form-check-label" for="pickUpItemsTrue">Yes</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridPickupItems" id="pickUpItemsFalse" value="no" />
                      <label className="form-check-label" for="pickUpItemsFalse">no</label>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </Fragment >
    )
  }
}

export default GeneralConfig
