import { Fragment, useState } from 'react'
import ItemsAviable from './ItemsAviable'
import { connect } from 'react-redux'
import { getBotBySocketId } from '../../actions/botsAction'
import TrashIcon from './Icons/Trash'

const ItemsToBeReady = (props) => {
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState(1)

  const botConfig = props.getBotBySocketId(props.selectedSocketId)
  if (botConfig === undefined) { return null }

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value)
    if (Number.isInteger(value)) {
      setQuantity(value)
    }
  }

  const handleItemChange = (event) => {
    setItem(event.target.value)
  }

  const handleInsertItem = (event) => {
    if (item === '' || quantity === 0) {
      return null
    }

    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'InsertItemToBeReady',
        value: {
          item, quantity
        }
      }
    })
  }

  const handleRemoveItem = (index, event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: botConfig.socketId,
      value: {
        configToChange: 'DeleteItemToBeReady',
        value: index
      }
    })
  }

  const renderItemsTable = () => {
    return botConfig.config.itemsToBeReady.map((item, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{index}</th>
          <td>{item.item}</td>
          <td>{item.quantity}</td>
          <td><TrashIcon onClick={handleRemoveItem.bind(this, index)} /></td>
        </tr>
      )
    })
  }

  return (
    <>
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
          <div className='form-group'>
            <label htmlFor='inputItem'>Select Item</label>
            <input className='form-control' type='text' list='itemsList' value={item} onChange={handleItemChange} />
            <datalist id='itemsList'>
              <ItemsAviable item={item} />
            </datalist>
          </div>
        </div>

        <div className='col-2'>
          <div className='form-group'>
            <label>Quantity</label>
            <input type='text' className='form-control' value={quantity} onChange={handleQuantityChange} />
          </div>
        </div>

        <div className='col-2'>
          <div className='form-group'>
            <label>.</label>
            <button className='form-control btn btn-primary' onClick={handleInsertItem}>Insert</button>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>

          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Item</th>
                <th scope='col'>Quantity</th>
                <th scope='col' />
              </tr>
            </thead>
            <tbody>
              {renderItemsTable()}
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers
  const { botsOnline } = botsReducer
  const { socket, selectedSocketId } = configurationReducer

  return { botsOnline, socket, selectedSocketId }
}

const mapDispatchToProps = {
  getBotBySocketId
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsToBeReady)
