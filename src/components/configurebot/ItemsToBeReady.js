import React from 'react'
import { Fragment } from 'react'

class ItemsToBeReady extends React.Component {
  render() {
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
                    <input className='form-control' type="text" list="itemsList" />
                    <datalist id="itemsList">
                      <option>Volvo</option>
                      <option>Saab</option>
                      <option>Mercedes</option>
                      <option>Audi</option>
                    </datalist>
                  </div>
                </div>

                <div className='col-2'>
                  <div class="form-group">
                    <label for="inputQuantity">Quantity</label>
                    <input type="text" class="form-control" id="inputQuantity" />
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
                        <td>Delete</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>Delete</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>Delete</td>
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
}

export default ItemsToBeReady
