import { Fragment } from "react"

const Combat = (props) => {
  return (
    <Fragment>
      <div className='row'>
        <div className='col-6'>
          <form>

            <fieldset className="form-group row">
              <legend className="col-form-label col-sm-4 float-sm-left pt-0">Combat Mode?</legend>
              <div className="col-sm-8">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="combatMode" value="none" />
                  <label className="form-check-label">None</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="combatMode" value="miner" />
                  <label className="form-check-label">PVE</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="combatMode" value="guard" />
                  <label className="form-check-label">PVP</label>
                </div>

              </div>
            </fieldset>

          </form>
        </div>
        <div className='col-3'>
          <div class="form-group">
            <label for="inputItem">Distance for start combat?</label>
            <input className='form-control' type="text" />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default Combat
