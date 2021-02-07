import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import ItemsAviable from './ItemsAviable'
import _uniqueId from 'lodash/uniqueId';

const Chest = (props) => {
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [x, setX] = useState('')
    const [y, seyY] = useState('')
    const [z, setZ] = useState('')
    const uniqueId = _uniqueId()
    const chestId = `chest-${uniqueId}`
    const radioId = `radio-${uniqueId}`

    const handleQuantityChange = (event) => {
        const value = Number(event.target.value);
        if (Number.isInteger(value)) {
            setQuantity(value)
        }
    }

    const handleItemChange = (event) => {
        setItem(event.target.value)
    }

    return (
        <Fragment>

            <div className='row'>
                <div className='col-6'>
                    <h4>Chest Nº: {uniqueId}</h4>
                </div>
            </div>

            <div className='row'>
                <div className='col-6'>
                    <div className="form-group">
                        <label for="inputItem">Select Item</label>
                        <input className='form-control' type="text" list={chestId} value={item} onChange={handleItemChange} />
                        <datalist id={chestId}>
                            <ItemsAviable item={item} />
                        </datalist>
                    </div>
                </div>

                <div className='col-2'>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="text" className="form-control" value={quantity} onChange={handleQuantityChange} />
                    </div>
                </div>


                <div className='col-2'>
                    <div className="form-group">
                        <label>Type</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={radioId} value="withdraw" />
                            <label className="form-check-label">Withdraw</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={radioId} value="deposit" />
                            <label className="form-check-label">Deposit</label>
                        </div>

                    </div>
                </div>

                <div className='col-2'>
                    <div className="form-group">
                        <label>.</label>
                        <button type='button' className='form-control btn btn-primary'>Insert Item</button>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-12'>
                    <form className="form-inline">
                        <label>Position XYZ:</label>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" className="form-control" placeholder="X" value={x} />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" className="form-control" placeholder="Y" value={y} />
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" className="form-control" placeholder="Z" value={z} />
                        </div>
                    </form>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-12'>

                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td><Link>Delete</Link></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td><Link>Delete</Link></td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td><Link>Delete</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='row'>
                <div className='col-3 ml-auto'>
                    <button type='button' className='btn btn-danger float-right'>Delete chest Nº {uniqueId}</button>
                </div>
            </div>
            <hr className='mb-5' />
        </Fragment>
    )
}

export default Chest
