import { Fragment } from "react"
import { Link } from "react-router-dom"
import ArrowUp from './ArrowUp'
import ArrowDown from './ArrowDown'


const GuardJob = (props) => {

  return (
    <Fragment>
      <div className='row'>
        <div className='col-6'>
          <form>
            <fieldset className="form-group row">
              <legend className="col-form-label col-sm-3 float-sm-left pt-0">Help Friend?</legend>
              <div className="col-sm-9">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="checkHelpFriend" value="yes" />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="checkHelpFriend" value="no" />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className='col-6'>
          <button type='button' className='btn btn-primary'>Copy the same position as the master</button>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">POS</th>
                <th scope="col">Up</th>
                <th scope="col">Down</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>X:50<br />Y:10<br />Z:30</td>
                <td><ArrowUp /></td>
                <td><ArrowDown /></td>
                <td><Link>Delete</Link></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>X:50<br />Y:10<br />Z:30</td>
                <td><ArrowUp /></td>
                <td><ArrowDown /></td>
                <td><Link>Delete</Link></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>X:50<br />Y:10<br />Z:30</td>
                <td><ArrowUp /></td>
                <td><ArrowDown /></td>
                <td><Link>Delete</Link></td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </Fragment>
  )
}


export default GuardJob
