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

  const changeConfig = (configToChange, value) => {
    props.socket.emit("sendAction", {
      action: "changeConfig",
      socketId: botConfig.socketId,
      value: {
        configToChange,
        value,
      },
    });
  };

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };

  const handleInsertItem = (event) => {
    if (item === "") {
      return null;
    }

    changeConfig("InsertItemCanBeEat", { item });
  };

  const renderItemsTable = () => {
    return botConfig.config.itemsCanBeEat.map((food, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{food}</td>
          <td>
            <ArrowUp
              onClick={() => changeConfig("moveItemCanBeEatPrev", index)}
            />{" "}
            <ArrowDown
              onClick={() => changeConfig("moveItemCanBeEatNext", index)}
            />
          </td>
          <td>
            <TrashIcon
              onClick={() => changeConfig("deleteItemCanBeEat", index)}
            />
          </td>
        </tr>
      );
    });
  };

  const handleChangeJob = (event) => {
    changeConfig("job", event.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-7">
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
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridJob"
                  value="crafter"
                  onChange={handleChangeJob}
                  checked={botConfig.config.job === "crafter"}
                />
                <label className="form-check-label">Crafter</label>
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

          <FormCheck
            id={"pickUpItems"}
            onChange={() =>
              changeConfig("pickUpItems", !botConfig.config.pickUpItems)
            }
            label={`Pick up items?`}
            checked={botConfig.config.pickUpItems}
          />

          <FormCheck
            id={"randomFarmArea"}
            onChange={() =>
              changeConfig("randomFarmArea", !botConfig.config.randomFarmArea)
            }
            label={`Random Farmer area?`}
            checked={botConfig.config.randomFarmArea}
          />
        </div>

        <div className="col-5">
          <FormCheck
            id={"allowSprinting"}
            onChange={() =>
              changeConfig("allowSprinting", !botConfig.config.allowSprinting)
            }
            label={`Allow Sprint`}
            checked={botConfig.config.allowSprinting}
          />

          <FormCheck
            id={"allowScanDigprinting"}
            onChange={() => changeConfig("canDig", !botConfig.config.canDig)}
            label={
              <>
                Can dig? <br /> (!) Caution can stuck the bot
              </>
            }
            checked={botConfig.config.canDig}
          />
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
