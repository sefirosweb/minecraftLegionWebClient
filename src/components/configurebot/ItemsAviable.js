import { Fragment } from 'react'

const MC_VERSION = '1.15.1'
const mcData = require('minecraft-data')(MC_VERSION)

const ItemsAviable = (props) => {
  const renderBlocks = () => {
    let type
    switch (props.type) {
      case 'all':
        type = 'itemsArray'
        break
      case 'foods':
        type = 'foodsArray'
        break
      default:
        type = 'itemsArray'
        break
    }

    const matchRegularExpression = new RegExp(props.item, 'gi')
    const items = mcData[type].filter(itemIndex => {
      return itemIndex.displayName.match(matchRegularExpression)
    })

    if (items.length > 10) {
      items.splice(0, items.length - 10)
    }

    return items.map((item, index) => {
      return <option key={index} value={item.name}>{item.displayName}</option>
    })
  }

  return (
    <>
      {renderBlocks()}
    </>
  )
}

export default ItemsAviable
