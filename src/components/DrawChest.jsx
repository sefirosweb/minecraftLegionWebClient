import React from 'react'
import { mcAssets } from '../utils/mc';
import smallChest from "../images/smallChest.png";
import largeChest from "../images/largeChest.png";
import Canvas from "./Canvas";
import windowSlotsCoords from '../utils/windowSlotsCoords';


const DrawChest = ({ chest }) => {

    console.log(chest.slots.length)
    const draw = (ctx) => {
        const base_image = new Image();
        base_image.src = chest.slots.length === 27 ? smallChest : largeChest
        base_image.onload = () => ctx.drawImage(base_image, 0, 0);

        for (const item in chest.slots) {
            if (!chest.slots[item]) continue;

            const inventorySlot =
                windowSlotsCoords["chest"][chest.slots[item].slot];

            const itemInfo = chest.slots[item];
            const texture = mcAssets.textureContent[itemInfo.name].texture;

            const itemImage = new Image();
            itemImage.src = texture;

            itemImage.onload = function () {
                // Draw item image
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(itemImage, inventorySlot[0], inventorySlot[1], 32, 32);

                // Draw item count
                if (chest.slots[item].count > 1) {
                    ctx.font = "20px monospace";
                    ctx.fillStyle = "black";
                    ctx.textAlign = "end";
                    ctx.fillText(
                        chest.slots[item].count,
                        inventorySlot[0] + 33,
                        inventorySlot[1] + 31
                    );
                    ctx.fillStyle = "white";
                    ctx.fillText(
                        chest.slots[item].count,
                        inventorySlot[0] + 32,
                        inventorySlot[1] + 30
                    );
                }
            };
        }
    }

    return <Canvas
        draw={draw}
        width={352}
        height={chest.slots.length === 27 ? 150 : 260}
    />
}

export default DrawChest