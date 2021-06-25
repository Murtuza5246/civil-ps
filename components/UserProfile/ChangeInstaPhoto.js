import { Button, CircularProgress, Input } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputGroup } from "reactstrap";
import axios from "../axios/axios";
import { useSnackbar } from "notistack";

const ChangeInstaProfile = (props) => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const { enqueueSnackbar } = useSnackbar();
  const changePhoto = (e) => {
    if (link === "") {
      enqueueSnackbar("This can not be blank");
      return;
    }
    e.preventDefault();
    setLoading(true);
    axios
      .patch(`user/link/${props.action}/${userId}`, {
        link: link,
      })
      .then((result) => {
        enqueueSnackbar(result.data.message, { variant: "success" });
        setLoading(false);
        setLink("");
        window.location.reload();
        props.reLoadMe();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Something went wrong");
        setLoading(false);
      });
  };
  const onChangeEvent = (e) => {
    e.preventDefault();
    setLink(e.target.value);
  };
  return (
    <div>
      <p style={{ color: "grey" }}>Change {props.action} photo.</p>
      <p style={{ color: "grey" }}>{"eg : " + props.placeholder}</p>
      <form>
        <InputGroup>
          <Input
            name="link"
            placeholder={`paste here`}
            onChange={(e) => onChangeEvent(e)}
            style={{ width: "100%", padding: "10px" }}
            value={link}
          />
          {!loading ? (
            <Button
              variant="contained"
              color="primary"
              disabled={!userId}
              type="submit"
              onClick={(e) => changePhoto(e, "success")}
            >
              {" "}
              Change{" "}
            </Button>
          ) : (
            <CircularProgress color="secondary" />
          )}
        </InputGroup>
      </form>
    </div>
  );
};
export default ChangeInstaProfile;
