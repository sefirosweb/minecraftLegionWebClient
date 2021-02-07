import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import ItemsAviable from './ItemsAviable'

const ItemsToBeReady = (props) => {

  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState(1)

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
        <div className='col-12'>
          <label>
            This is a minimun requeried for start bot to work,<br />
            Example, Guard need a sword and shield, Miner need a 1 pickaxe
          </label>
        </div>
      </div>

      <div className='row'>
        <div className='col-6'>
          <div className="form-group">
            <label for="inputItem">Select Item</label>
            <input className='form-control' type="text" list="itemsList" value={item} onChange={handleItemChange} />
            <datalist id="itemsList">
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
            <label>.</label>
            <button className='form-control btn btn-primary'>Insert</button>
          </div>
        </div>
      </div>


      <div className='row'>
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


    </Fragment >
  )
}

export default ItemsToBeReady
