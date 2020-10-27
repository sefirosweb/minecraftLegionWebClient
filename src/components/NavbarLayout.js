import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Modal from './Modal'

// import confLogo from '../images/sefiros.png'
import '../css/NavbarLayout.css'

const NavbarLayout = (props) => {
    const [show, setShow] = useState(false);
    const [botName, setBotName] = useState('');
    const [botPassword, setBotPassword] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAccept = () => {
        const message = {
            botName,
            botPassword
        }

        props.socket.emit('botConnect', message)
        setShow(false)
    }

    const changeBotName = (event) => {
        setBotName(event.target.value)
    }

    const changeBotPassword = (event) => {
        setBotPassword(event.target.value)
    }

    // Modal fields
    const fields = (
        <div className='row'>
            <div className='col-12'>
                <div className="form-group">
                    <Form>
                        <Form.Group>
                            <Form.Label>Bot Name</Form.Label>
                            <Form.Control type="text" placeholder="Guard1" onChange={changeBotName} value={botName} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={changeBotPassword} value={botPassword} />
                            <Form.Text className="text-muted">
                                No put password on open server when is not requiered
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )


    return (
        <div className='navBar'>
            <NavLink to="/dashboard" activeClassName="is-selected">Dashboard</NavLink>
            <NavLink to="/configuration" activeClassName="is-selected">Configuration</NavLink>
            <Link onClick={handleShow}>Load New Bot</Link>
            <a className='' href='https://github.com/sefirosweb/minecraftLegion' target='_blank' rel="noreferrer">Git</a>

            {/* Load Modal */}
            <Modal show={show} handleAccept={handleAccept} handleClose={handleClose} title='Fill the data' body={fields} />
        </div >
    )
}


export default NavbarLayout