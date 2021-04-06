import { Fragment } from 'react'

const MC_VERSION = '1.16.5'
const mcData = require('minecraft-data')(MC_VERSION)
const plants = [
  { displayName: 'Carrot', name: 'carrot' },
  { displayName: 'Potato', name: 'potato' },
  { displayName: 'Beetroot', name: 'beetroot' },
  { displayName: 'Wheat', name: 'wheat' },
  { displayName: 'Melon', name: 'melon' },
  { displayName: 'Sweet Berries', name: 'sweet_berries' },
  { displayName: 'Pumpkin', name: 'pumpkin' },
  { displayName: 'Oak Sapling', name: 'oak_sapling' },
  { displayName: 'Cabirch Saplingrrot', name: 'cabirch_saplingrrot' },
  { displayName: 'Jungle Sapling', name: 'jungle_sapling' },
  { displayName: 'Acacia Sapling', name: 'acacia_sapling' },
  { displayName: 'Dark Oak Sapling', name: 'dark_oak_sapling' }
]

const ItemsAviable = (props) => {
  const renderBlocks = () => {
    let type
    switch (props.type) {
      case 'all':
        type = 'itemsArray'
        type = mcData.itemsArray
        break
      case 'foods':
        type = 'foodsArray'
        type = mcData.foodsArray
        break
      case 'plants':
        type = 'foodsArray'
        type = plants
        break
      default:
        type = 'itemsArray'
        type = mcData.itemsArray
        break
    }

    const matchRegularExpression = new RegExp(props.item, 'gi')
    const items = type.filter(itemIndex => {
      return itemIndex.displayName.match(matchRegularExpression)
    })

    console.log(mcData)

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
