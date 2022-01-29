import { useState } from "react";
import { connect } from "react-redux";
import ItemsAviable from "./ItemsAviable";
import TrashIcon from "./Icons/Trash";
import ArrowUp from "./Icons/ArrowUp";
import ArrowDown from "./Icons/ArrowDown";
import { Button, Col, Form, Row } from "react-bootstrap";

const Chest = (props) => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const chestId = `chest-${props.id}`;
  const radioId = `radio-${props.id}`;

  const changeConfig = (configToChange, value) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: props.socketId,
      value: {
        configToChange,
        value,
      },
    });
  };

  const handleDeleteChest = (event) => {
    changeConfig("deleteChest", props.id);
  };

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    if (Number.isInteger(value)) {
      setQuantity(value);
    }
  };

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };

  const handleInsertItemInChest = (event) => {
    changeConfig("insertItemInChest", {
      chestId: props.id,
      item,
      quantity,
    });
  };

  const renderItemsTable = () => {
    return props.chest.items.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.item}</td>
          <td>{item.quantity}</td>
          <td>
            <TrashIcon onClick={handleRemoveItemFromChest.bind(this, index)} />
          </td>
        </tr>
      );
    });
  };

  const handleRemoveItemFromChest = (index, event) => {
    changeConfig("removeItemFromChest", {
      chestId: props.id,
      itemIndex: index,
    });
  };

  const handleChangeChestType = (event) => {
    changeConfig("changeChestType", {
      value: event.target.value,
      chestId: props.id,
    });
  };

  const handleChangeChestName = (event) => {
    changeConfig("changeChestName", {
      value: event.target.value,
      chestId: props.id,
    });
  };

  const handleChangeChestPos = (event) => {
    const pos = Number(event.target.value);

    if (!Number.isInteger(pos) && event.target.value !== "-") {
      return null;
    }

    changeConfig("changeChestPos", {
      pos: event.target.value,
      chestId: props.id,
      coord: event.target.dataset.coord,
    });
  };

  const handleCopyPositionMaster = () => {
    changeConfig("changeChestPosMaster", {
      chestId: props.id,
      master: props.master,
    });
  };

  const renderSwitch = () => {
    switch (props.chest.type) {
      case "deposit":
        return "border-warning";
      case "depositAll":
        return "border-danger";
      case "withdraw":
        return "border-success";
      default:
        return "";
    }
  };

  const handleMovePosNext = (index, event) => {
    changeConfig("moveChestNext", props.id);
  };

  const handleMovePosPrev = (index, event) => {
    changeConfig("moveChestPrev", props.id);
  };

  return (
    <div className={`p-3 mb-3 border rounded ${renderSwitch()}`}>
      <Row>
        <Col xs={6}>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label font-weight-bold">
              Chest Nº{props.id}
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control-plaintext font-weight-bold"
                value={props.chest.name}
                onChange={handleChangeChestName}
              />
            </div>
          </div>
        </Col>

        <Col xs={4}>
          <div className="float-right">Sort chest:</div>
        </Col>

        <Col xs={2}>
          <div className="float-right">
            {" "}
            <ArrowUp onClick={handleMovePosPrev} />{" "}
            <ArrowDown onClick={handleMovePosNext} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          <div className="form-group">
            <label htmlFor="inputItem">Select Item</label>
            <input
              className="form-control"
              type="text"
              list={chestId}
              value={item}
              onChange={handleItemChange}
            />
            <datalist id={chestId}>
              <ItemsAviable item={item} />
            </datalist>
          </div>
        </Col>

        <Col xs={2}>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="text"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </Col>

        <Col xs={2}>
          <div className="form-group">
            <label>Type</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={radioId}
                value="withdraw"
                onChange={handleChangeChestType}
                checked={props.chest.type === "withdraw"}
              />
              <label className="form-check-label">Withdraw</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={radioId}
                value="deposit"
                onChange={handleChangeChestType}
                checked={props.chest.type === "deposit"}
              />
              <label className="form-check-label">Deposit</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={radioId}
                value="depositAll"
                onChange={handleChangeChestType}
                checked={props.chest.type === "depositAll"}
              />
              <label className="form-check-label">Deposit All</label>
            </div>
          </div>
        </Col>

        <Col xs={2}>
          <div className="form-group">
            <label>.</label>
            <button
              type="button"
              className="form-control btn btn-primary"
              onClick={handleInsertItemInChest}
            >
              Insert Item
            </button>
          </div>
        </Col>
      </Row>

      <Row>
        <Form.Group as={Col}>
          <Form.Label>X</Form.Label>
          <Form.Control
            data-coord="x"
            value={props.chest.position.x ? props.chest.position.x : ""}
            onChange={handleChangeChestPos}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Y</Form.Label>
          <Form.Control
            data-coord="y"
            value={props.chest.position.y ? props.chest.position.y : ""}
            onChange={handleChangeChestPos}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Z</Form.Label>
          <Form.Control
            data-coord="z"
            value={props.chest.position.z ? props.chest.position.z : ""}
            onChange={handleChangeChestPos}
          />
        </Form.Group>
      </Row>

      <Button type="button" onClick={handleCopyPositionMaster}>
        Copy position same has master
      </Button>

      <div className="row mt-3">
        <div className="col-12">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{renderItemsTable()}</tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col-3 ml-auto">
          <button
            type="button"
            className="btn btn-danger float-right"
            onClick={handleDeleteChest}
          >
            Delete chest "{props.chest.name}"
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (reducers) => {
  const { configurationReducer } = reducers;
  const { socket, master } = configurationReducer;
  return { socket, master };
};

export default connect(mapStateToProps, null)(Chest);
