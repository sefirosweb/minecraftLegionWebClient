import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import * as botsAction from '../actions/botsAction'

class Login extends React.Component {
  render() {
    return (
      <Fragment>
        <div className='row'>
          <div className='col-6 offset-3'><h1>Login</h1></div>
        </div>
        <div className='row'>
          <div className='col-6 offset-3'>
            <Form>

              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Username</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1">Permanent login</label>
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </Form>
          </div>
        </div>
      </Fragment>
    );
  }
}

// const mapStateToProps = (reducers) => {
//     return reducers.botsReducer
// }

// export default connect(mapStateToProps, botsAction)(Configuration);


export default Login
