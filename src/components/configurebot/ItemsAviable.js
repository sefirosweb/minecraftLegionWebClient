import { Fragment } from 'react'

const MC_VERSION = '1.15.1'
const mcData = require("minecraft-data")(MC_VERSION)

const ItemsAviable = (props) => {
    const renderBlocks = () => {
        const matchRegularExpression = new RegExp(props.item, 'gi');
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
            {renderBlocks()}
        </Fragment>
    )
}

export default ItemsAviable
