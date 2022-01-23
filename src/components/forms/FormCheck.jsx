import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';


export default ({ id, checked, label, onChange }) => {
    return (
        <Form>
            <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
            >
                <Form.Label column sm="4">
                    {label}
                </Form.Label>

                <Col sm="8">
                    <Form.Check
                        type="switch"
                        id={id}
                        checked={checked}
                        label={checked === true ? "Yes" : "No"}
                        onChange={onChange}
                    />
                </Col>
            </Form.Group>
        </Form>
    )
}