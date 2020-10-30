import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import * as botsAction from '../actions/botsAction'

class Configuration extends React.Component {
    handleChangeMaster = (event) => {
        this.props.updateMaster(event.target.value)
    }


    render() {
        return (
            <Fragment>
                <div className='row'>
                    <div className='col-12'><h1>Configuration</h1></div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <Form>
                            <div className="form-group">
                                <label>Master</label>
                                <input type="text" className="form-control" onChange={this.handleChangeMaster} value={this.props.master} />
                            </div>
                        </Form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (reducers) => {
    return reducers.botsReducer
}

export default connect(mapStateToProps, botsAction)(Configuration);
