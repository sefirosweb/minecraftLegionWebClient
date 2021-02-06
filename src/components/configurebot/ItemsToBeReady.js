import React, { useState } from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const MC_VERSION = '1.15.1'
const mcData = require("minecraft-data")(MC_VERSION)

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

  const renderBlocks = () => {
    const matchRegularExpression = new RegExp(item, 'gi' );
    const items = mcData.itemsArray.filter(itemIndex => {
      return itemIndex.displayName.match(matchRegularExpression)
    })

    if (items.length > 10) {
      items.splice(0, items.length - 10)
    }

    return items.map(item => {
      return <option value={item.name}>{item.displayName}</option>
    })
  }


  return (
    <Fragment>

      <div className='card px-5 pt-4'>
        <div className='row'>
          <div className='col-12'>

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
                <div class="form-group">
                  <label for="inputItem">Select Item</label>
                  <input className='form-control' type="text" list="itemsList" value={item} onChange={handleItemChange} />
                  <datalist id="itemsList">
                    {renderBlocks()}
                  </datalist>
                </div>
              </div>

              <div className='col-2'>
                <div class="form-group">
                  <label for="inputQuantity">Quantity</label>
                  <input type="text" class="form-control" id="inputQuantity" value={quantity} onChange={handleQuantityChange} />
                </div>
              </div>

              <div className='col-2'>
                <div class="form-group">
                  <label for="inputQuantity">.</label>
                  <button className='form-control btn btn-primary'>Insert</button>
                </div>
              </div>

            </div>
            <div className='row mt-4'>
              <div className='col-12'>

                <table class="table">
                  <thead class="thead-dark">
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
          </div>
        </div>
      </div>
    </Fragment >
  )
}

export default ItemsToBeReady
