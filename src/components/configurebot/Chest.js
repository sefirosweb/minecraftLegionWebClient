import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import ItemsAviable from './ItemsAviable'
import TrashIcon from './Icons/Trash'
import ArrowUp from './Icons/ArrowUp'
import ArrowDown from './Icons/ArrowDown'

const Chest = (props) => {
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState(1)

  const chestId = `chest-${props.id}`
  const radioId = `radio-${props.id}`

  const handleDeleteChest = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.socketId,
      value: {
        configToChange: 'deleteChest',
        value: props.id
      }
    })
  }

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value)
    if (Number.isInteger(value)) {
      setQuantity(value)
    }
  }

  const handleItemChange = (event) => {
    setItem(event.target.value)
  }

  const handleInsertItemInChest = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.socketId,
      value: {
        configToChange: 'insertItemInChest',
        chestId: props.id,
        item,
        quantity
      }
    })
  }

  const renderItemsTable = () => {
    return props.chest.items.map((item, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{index}</th>
          <td>{item.item}</td>
          <td>{item.quantity}</td>
          <td><TrashIcon onClick={handleRemoveItemFromChest.bind(this, index)} /></td>
        </tr>
      )
    })
  }

  const handleRemoveItemFromChest = (index, event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.socketId,
      value: {
        configToChange: 'removeItemFromChest',
        chestId: props.id,
        itemIndex: index
      }
    })
  }

  const handleChangeChestType = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.socketId,
      value: {
        configToChange: 'changeChestType',
        value: event.target.value,
        chestId: props.id
      }
    })
  }

  const handleChangeChestName = (event) => {
    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.socketId,
      value: {
        configToChange: 'changeChestName',
        value: event.target.value,
        chestId: props.id
      }
    })
  }

  const handleChangeChestPos = (event) => {
    const pos = Number(event.target.value)
    console.log(event.target.value)

    if (!Number.isInteger(pos) && event.target.value !== '-') {
      return null
    }

    props.socket.emit('sendAction', {
      action: 'changeConfig',
      socketId: props.socketId,
      value: {
        configToChange: 'changeChestPos',
        pos: event.target.value,
        chestId: props.id,
        coord: event.target.dataset.coord
      }
    })
  }

  const renderSwitch = () => {
    switch (props.chest.type) {
      case 'deposit':
        return 'border-warning';
      case 'depositAll':
        return 'border-danger';
      case 'withdraw':
        return 'border-success';
      default:
        return '';
    }
  }

  return (
    <div className={`p-3 mb-3 border rounded ${renderSwitch()}`}>

      <div className='row'>
        <div className='col-6'>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold'>Chest Nº{props.id}</label>
            <div className='col-sm-8'>
              <input type='text' className='form-control-plaintext font-weight-bold' value={props.chest.name} onChange={handleChangeChestName} />
            </div>
          </div>
        </div>
        <div className='col-4'>
          <div className='float-right'>
            Sort chest:
        </div>
        </div>
        <div className='col-2'>
          <div className='float-right'><ArrowUp /> <ArrowDown /></div>
          {/* <ArrowUp onClick={handleMovePosPrev.bind(this, index)} /> <ArrowDown onClick={handleMovePosNext.bind(this, index)} /> */}
        </div>
      </div>

      <div className='row'>
        <div className='col-6'>
          <div className='form-group'>
            <label htmlFor='inputItem'>Select Item</label>
            <input className='form-control' type='text' list={chestId} value={item} onChange={handleItemChange} />
            <datalist id={chestId}>
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
            <label>Type</label>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name={radioId} value='withdraw' onChange={handleChangeChestType} checked={props.chest.type === 'withdraw'} />
              <label className='form-check-label'>Withdraw</label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name={radioId} value='deposit' onChange={handleChangeChestType} checked={props.chest.type === 'deposit'} />
              <label className='form-check-label'>Deposit</label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' name={radioId} value='depositAll' onChange={handleChangeChestType} checked={props.chest.type === 'depositAll'} />
              <label className='form-check-label'>Deposit All</label>
            </div>

          </div>
        </div>

        <div className='col-2'>
          <div className='form-group'>
            <label>.</label>
            <button type='button' className='form-control btn btn-primary' onClick={handleInsertItemInChest}>Insert Item</button>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <form className='form-inline'>
            <label>Position XYZ:</label>
            <div className='form-group mx-sm-3 mb-2'>
              <input type='text' className='form-control' placeholder='X' data-coord='x' value={props.chest.position.x ? props.chest.position.x : ''} onChange={handleChangeChestPos} />
            </div>
            <div className='form-group mx-sm-3 mb-2'>
              <input type='text' className='form-control' placeholder='Y' data-coord='y' value={props.chest.position.y ? props.chest.position.y : ''} onChange={handleChangeChestPos} />
            </div>
            <div className='form-group mx-sm-3 mb-2'>
              <input type='text' className='form-control' placeholder='Z' data-coord='z' value={props.chest.position.z ? props.chest.position.z : ''} onChange={handleChangeChestPos} />
            </div>
          </form>
        </div>
      </div>

      <div className='row mt-3'>
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

      <div className='row'>
        <div className='col-3 ml-auto'>
          <button type='button' className='btn btn-danger float-right' onClick={handleDeleteChest}>Delete chest "{props.chest.name}"</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers
  const { botsOnline } = botsReducer
  const { socket } = configurationReducer

  return { socket, botsOnline }
}

export default connect(mapStateToProps, null)(Chest)
