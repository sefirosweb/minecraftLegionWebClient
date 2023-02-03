//@ts-nocheck
import { State } from '@/state';
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Masterlist = () => {

  const configurationState = useSelector((state: State) => state.configurationReducer);
  const { master, socket } = configurationState

  const botState = useSelector((state: State) => state.botsReducer);
  const { masters } = botState

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
    socket.emit('sendAction', {
      action: 'addMaster',
      value: inputBox
    })
    setInputBox('')
  }

  const handleRemoveMaster = (event) => {
    socket.emit('sendAction', {
      action: 'removeMaster',
      value: event.currentTarget.dataset.master
    })
  }

  const renderMasterList = () => {
    return masters.map((masterIndex, index) => {
      return (
        <li onClick={handleRemoveMaster} data-master={masterIndex.name} key={index} className={`list-group-item list-group-item-action ${(masterIndex.name === master) ? 'active' : ''}`}>
          {masterIndex.name}
        </li>
      )
    }, master)
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

export default Masterlist

// const mapStateToProps = (reducers) => {
//   const { botsReducer, configurationReducer } = reducers
//   const { master, socket } = configurationReducer
//   const { masters } = botsReducer

//   return { master, masters, socket }
// }

// export default connect(mapStateToProps)(Masterlist)
