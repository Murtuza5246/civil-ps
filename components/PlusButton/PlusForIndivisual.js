import React, { useState } from "react";
import classes from "./plus.module.css";
import { Tooltip } from "@material-ui/core";
import Modal from "../modal/Modal";
import SpeedDial from "../SpeedDial/SpeedForIndivisual";

const PlusButton = (props) => {
  const [state, setState] = useState(false);

  const searchbarClickButton = () => {
    setState(true);

    window.history.pushState(null, null, "/statements?open=true");
  };

  const handleClose = () => {
    setState(false);
    window.history.pushState(null, null, "/statements");
  };
  const searchFieldsHandler = (fields) => {
    setState(false);
    props.searchFieldsHandler(fields);
  };

  return (
    <div className={classes.fixedThis}>
      <Modal
        searchFieldsHandler={(fields) => searchFieldsHandler(fields)}
        open={state}
        handleClose={handleClose}
      />
      <div className={classes.FixedItems}>
        <Tooltip title="Filter" placement="left">
          <SpeedDial
            reload={props.reload}
            searchModal={() => searchbarClickButton()}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default PlusButton;
