import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'

const Masterlist = (props) => {
  const [inputBox, setInputBox] = useState('')

  const handleInputBox = (event) => {
    setInputBox(event.target.value.trim())
  }

  const handleKeyPress = (event) => {
    if (event.charCode === 13 && inputBox !== '') {
      handleSendMessageButton()
    }
  }

  const handleSendMessageButton = () => {
    props.socket.emit('sendAction', {
      action: 'addMaster',
      value: inputBox
    })
    setInputBox('')
  }

  const handleRemoveMaster = (event) => {
    props.socket.emit('sendAction', {
      action: 'removeMaster',
      value: event.currentTarget.dataset.master
    })
  }

  const renderMasterList = () => {
    return props.masters.map((masterIndex, index) => {
      return (
        <li onClick={handleRemoveMaster} data-master={masterIndex.name} key={index} className={`list-group-item list-group-item-action ${(masterIndex.name === props.master) ? 'active' : ''}`}>
          {masterIndex.name}
        </li>
      )
    }, props.master)
  }

  return (
    <>
      <div className='row'>
        <div className='col-12'><h1>Master List</h1></div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='form-group'>
            <input type='text' placeholder='Add new master' className='form-control' onKeyPress={handleKeyPress} onChange={handleInputBox} value={inputBox} />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <ul className='list-group'>
            {renderMasterList()}
          </ul>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers
  const { master, socket } = configurationReducer
  const { masters } = botsReducer

  return { master, masters, socket }
}

export default connect(mapStateToProps)(Masterlist)
