import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getBotBySocketId } from "../../actions/botsAction";
import ItemsAviable from "./ItemsAviable";
import TrashIcon from "./Icons/Trash";
import ArrowUp from "./Icons/ArrowUp";
import ArrowDown from "./Icons/ArrowDown";
import FormCheck from "../forms/FormCheck";

const GeneralConfig = (props) => {
  const [item, setItem] = useState("");
  const botConfig = props.getBotBySocketId(props.selectedSocketId);
  if (botConfig === undefined) {
    return null;
  }

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };

  const handleInsertItem = (event) => {
    if (item === "") {
      return null;
    }

    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "InsertItemCanBeEat",
        value: {
          item,
        },
      },
    });
  };

  const handleMovePosNext = (index, event) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "moveItemCanBeEatNext",
        value: index,
      },
    });
  };

  const handleMovePosPrev = (index, event) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "moveItemCanBeEatPrev",
        value: index,
      },
    });
  };

  const handleRemoveItem = (index, event) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "deleteItemCanBeEat",
        value: index,
      },
    });
  };

  const renderItemsTable = () => {
    return botConfig.config.itemsCanBeEat.map((food, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{food}</td>
          <td>
            <ArrowUp onClick={handleMovePosPrev.bind(this, index)} />{" "}
            <ArrowDown onClick={handleMovePosNext.bind(this, index)} />
          </td>
          <td>
            <TrashIcon onClick={handleRemoveItem.bind(this, index)} />
          </td>
        </tr>
      );
    });
  };

  const handleChangeJob = (event) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "job",
        value: event.target.value,
      },
    });
  };

  const handleChangePickUpItems = (event) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "pickUpItems",
        value: event.target.value,
      },
    });
  };

  const handleChangeRandomFarmArea = (event) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "randomFarmArea",
        value: !botConfig.config.randomFarmArea,
      },
    });
  };

  const handleChangeAllowSprinting = (event) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "allowSprinting",
        value: event.target.value,
      },
    });
  };

  const handleChangeCanDig = (event) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange: "canDig",
        value: event.target.value,
      },
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-8">
          <fieldset className="form-group row">
            <legend className="col-form-label col-sm-4 float-sm-left pt-0">
              Job
            </legend>
            <div className="col-sm-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridJob"
                  value="none"
                  onChange={handleChangeJob}
                  checked={botConfig.config.job === "none"}
                />
                <label className="form-check-label">None</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridJob"
                  value="miner"
                  onChange={handleChangeJob}
                  checked={botConfig.config.job === "miner"}
                />
                <label className="form-check-label">Miner</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridJob"
                  value="guard"
                  onChange={handleChangeJob}
                  checked={botConfig.config.job === "guard"}
                />
                <label className="form-check-label">Guard</label>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridJob"
                  value="farmer"
                  onChange={handleChangeJob}
                  checked={botConfig.config.job === "farmer"}
                />
                <label className="form-check-label">Farmer</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridJob"
                  value="breeder"
                  onChange={handleChangeJob}
                  checked={botConfig.config.job === "breeder"}
                />
                <label className="form-check-label">Breeder</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridJob"
                  value="sorter"
                  onChange={handleChangeJob}
                  checked={botConfig.config.job === "sorter"}
                />
                <label className="form-check-label">Sorter</label>
              </div>
            </div>
          </fieldset>

          <fieldset className="form-group row">
            <legend className="col-form-label col-sm-4 float-sm-left pt-0">
              Pick up items?
            </legend>
            <div className="col-sm-8">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridPickupItems"
                  value="true"
                  onChange={handleChangePickUpItems}
                  checked={botConfig.config.pickUpItems === true}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridPickupItems"
                  value="false"
                  onChange={handleChangePickUpItems}
                  checked={botConfig.config.pickUpItems === false}
                />
                <label className="form-check-label">no</label>
              </div>
            </div>
          </fieldset>

          <FormCheck
            botConfig={botConfig}
            onChange={handleChangeRandomFarmArea}
            label={`Random Farmer area?`}
            checked={botConfig.config.randomFarmArea}
          />
        </div>

        <div className="col-4">
          <fieldset className="form-group row">
            <legend className="col-form-label col-sm-6 float-sm-left pt-0">
              Allow Sprint
            </legend>
            <div className="col-sm-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridAllowSprinting"
                  value="true"
                  onChange={handleChangeAllowSprinting}
                  checked={botConfig.config.allowSprinting === true}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridAllowSprinting"
                  value="false"
                  onChange={handleChangeAllowSprinting}
                  checked={botConfig.config.allowSprinting === false}
                />
                <label className="form-check-label">no</label>
              </div>
            </div>
          </fieldset>

          <fieldset className="form-group row">
            <legend className="col-form-label col-sm-6 float-sm-left pt-0">
              Can dig?
              <br />
              (!) Caution can stuck the bot
            </legend>
            <div className="col-sm-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridCanDig"
                  value="true"
                  onChange={handleChangeCanDig}
                  checked={botConfig.config.canDig === true}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridCanDig"
                  value="false"
                  onChange={handleChangeCanDig}
                  checked={botConfig.config.canDig === false}
                />
                <label className="form-check-label">no</label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <h3>Valid food for eat</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="inputItem">
              (!) The food consumition have priority based on # inserted
            </label>
            <input
              className="form-control"
              type="text"
              list="itemsList"
              value={item}
              onChange={handleItemChange}
            />
            <datalist id="itemsList">
              <ItemsAviable item={item} type="foods" />
            </datalist>
          </div>
        </div>

        <div className="col-2">
          <div className="form-group">
            <label>.</label>
            <button
              className="form-control btn btn-primary"
              onClick={handleInsertItem}
            >
              Insert
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Priority</th>
                <th scope="col">Food</th>
                <th scope="col">Move</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{renderItemsTable()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers;
  const { botsOnline } = botsReducer;
  const { socket, selectedSocketId } = configurationReducer;

  return { botsOnline, socket, selectedSocketId };
};

const mapDispatchToProps = {
  getBotBySocketId,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralConfig);
