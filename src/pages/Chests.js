import React from "react";
import { Card } from "react-bootstrap";

import { connect } from "react-redux";
import chest from "./chest.png";

import Canvas from "./Canvas";

import windowSlotsCoords from "../utils/windowSlotsCoords";
import { mcAssets } from "../utils/mc";

const Chests = ({ loged, chests, history }) => {
  if (!loged) {
    history.push("/configuration");
    return null;
  }

  const draw = (ctx) => {
    const base_image = new Image();
    base_image.src = chest;
    base_image.onload = () => ctx.drawImage(base_image, 0, 0);

    for (const item in chests[0].slots) {
      if (!chests[0].slots[item]) continue;

      const inventorySlot =
        windowSlotsCoords["chest"][chests[0].slots[item].slot];

      const itemInfo = chests[0].slots[item];
      const texture = mcAssets.textureContent[itemInfo.name].texture;

      const itemImage = new Image();
      itemImage.src = texture;

      itemImage.onload = function () {
        // Draw item image
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(itemImage, inventorySlot[0], inventorySlot[1], 32, 32);

        // Draw item count
        if (chests[0].slots[item].count > 1) {
          ctx.font = "20px monospace";
          ctx.fillStyle = "black";
          ctx.textAlign = "end";
          ctx.fillText(
            chests[0].slots[item].count,
            inventorySlot[0] + 33,
            inventorySlot[1] + 31
          );
          ctx.fillStyle = "white";
          ctx.fillText(
            chests[0].slots[item].count,
            inventorySlot[0] + 32,
            inventorySlot[1] + 30
          );
        }
      };
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Chests</Card.Title>
          <Card.Text>Contain all chests in memory of server</Card.Text>
          <Canvas draw={draw} width={352} height={332} />

          {chests.map((c, key) => {
            return <div key={key}></div>;
          })}
        </Card.Body>
      </Card>
    </>
  );
};

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers;
  const { loged } = configurationReducer;
  const { chests } = botsReducer;

  return { chests, loged };
};

export default connect(mapStateToProps)(Chests);
