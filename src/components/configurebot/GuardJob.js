import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getBotBySocketId } from "../../actions/botsAction";
import ArrowUp from "./Icons/ArrowUp";
import ArrowDown from "./Icons/ArrowDown";
import TrashIcon from "./Icons/Trash";
import FormCheck from "../forms/FormCheck";

const GuardJob = (props) => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [z, setZ] = useState("");

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

  const changePos = (event) => {
    const value = Number(event.target.value);
    if (!Number.isInteger(value) && event.target.value !== "-") {
      return null;
    }

    switch (event.target.id) {
      case "xPos":
        setX(event.target.value);
        break;
      case "yPos":
        setY(event.target.value);
        break;
      case "zPos":
        setZ(event.target.value);
        break;
      default:
        return null;
    }
  };
  const insertPost = (event) => {
    if (
      !Number.isInteger(Number(x)) ||
      !Number.isInteger(Number(y)) ||
      !Number.isInteger(Number(z))
    ) {
      return null;
    }

    changeConfig("addPatrol", {
      x: Number(x),
      y: Number(y),
      z: Number(z),
    });
  };

  const handleRemovePos = (index, event) => {
    changeConfig("removePatrol", index);
  };

  const handleMovePosNext = (index, event) => {
    changeConfig("movePatrolNext", index);
  };

  const handleMovePosPrev = (index, event) => {
    changeConfig("movePatrolPrev", index);
  };

  const handleButtonSavePositionHasMaster = (event) => {
    changeConfig("savePositionHasMaster", props.master);
  };

  const renderPatrolTable = () => {
    return botConfig.config.patrol.map((pos, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>
            X:{pos.x}
            <br />
            Y:{pos.y}
            <br />
            Z:{pos.z}
          </td>
          <td>
            <ArrowUp onClick={handleMovePosPrev.bind(this, index)} />{" "}
            <ArrowDown onClick={handleMovePosNext.bind(this, index)} />
          </td>
          <td>
            <TrashIcon onClick={handleRemovePos.bind(this, index)} />
          </td>
        </tr>
      );
    });
  };


  const handleButtonClearPositions = (event) => {
    changeConfig("clearAllPositions");
  };

  const copyPatrol = (event) => {
    changeConfig("copyPatrol", props.master);
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <FormCheck
            id={"helpFriends"}
            onChange={() =>
              changeConfig("helpFriends", !botConfig.config.helpFriends)
            }
            label={`Help Friend?`}
            checked={botConfig.config.helpFriends}
          />
        </div>
        <div className="col-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleButtonSavePositionHasMaster}
          >
            Copy the same position as the master
          </button>
        </div>
        <div className="col-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleButtonClearPositions}
          >
            Clear all positions
          </button>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-2">
          <label>Position XYZ:</label>
        </div>
        <div className="col-2">
          <input
            type="text"
            className="form-control"
            placeholder="X"
            id="xPos"
            value={x}
            onChange={changePos}
          />
        </div>
        <div className="col-2">
          <input
            type="text"
            className="form-control"
            placeholder="Y"
            id="yPos"
            value={y}
            onChange={changePos}
          />
        </div>
        <div className="col-2">
          <input
            type="text"
            className="form-control"
            placeholder="Z"
            id="zPos"
            value={z}
            onChange={changePos}
          />
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-primary form-control"
            onClick={insertPost}
          >
            Insert
          </button>
        </div>
        <div className="col-2">
          {botConfig.config.isCopingPatrol ? (
            <button
              type="button"
              className="btn btn-warning form-control"
              onClick={copyPatrol}
            >
              Stop Copy
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success form-control"
              onClick={copyPatrol}
            >
              Start Copy
            </button>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">POS</th>
                <th scope="col">Move</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{renderPatrolTable()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (reducers) => {
  const { botsReducer, configurationReducer } = reducers;
  const { botsOnline } = botsReducer;
  const { socket, selectedSocketId, master } = configurationReducer;

  return { botsOnline, socket, selectedSocketId, master };
};

const mapDispatchToProps = {
  getBotBySocketId,
};

export default connect(mapStateToProps, mapDispatchToProps)(GuardJob);
