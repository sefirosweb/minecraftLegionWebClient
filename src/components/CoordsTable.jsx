import React from 'react'
import { Table } from 'react-bootstrap'
import '../css/Spinner.css'

const CoordsTable = ({ positions }) => (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>X</th>
                <th>Y</th>
                <th>Z</th>
            </tr>
        </thead>
        <tbody>
            {
                positions.map((p, index) =>
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{p.x}</td>
                        <td>{p.y}</td>
                        <td>{p.z}</td>
                    </tr>
                )
            }
        </tbody>
    </Table>
)

export default CoordsTable
