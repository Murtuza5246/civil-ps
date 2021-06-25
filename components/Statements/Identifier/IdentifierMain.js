import React, { useEffect, useState } from "react";
import classes from "./IdentifierMain.module.css";
import Identifier from "./Identifier";
import WritingArea from "./WritingArea";
import axios from "../../axios/axios";
import Loader from "./Loader/Loader";
import AllCatchUp from "../allCautchUp/AllCautchUp";
import { useSelector } from "react-redux";

const IdentifierMain = (props) => {
  const [data, setData] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [paramsFetch, setParamsFetch] = useState(false);
  const authType = useSelector((state) => state.user.authType);
  const composeHandler = useSelector((state) => state.user.composeHandler);
  const level = useSelector((state) => state.user.level);
  const [paramsId, setParamsId] = useState("");
  useEffect(() => {
    if (getParameterByName("posts")) {
      fetchData(getParameterByName("posts"));
      setParamsFetch(true);
      setParamsId(getParameterByName("posts"));
    } else {
      fetchData();
    }
  }, []);

  const getParameterByName = (name, url) => {
    // if (!url) url = window.location.href;
    // name = name.replace(/[[\]]/g, "\\$&");
    // var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    //   results = regex.exec(url);
    // if (!results) return null;
    // if (!results[2]) return "";
    // return decodeURIComponent(results[2].replace(/\+/g, " "));
    return "";
  };

  const fetchData = (id) => {
    axios
      .get("/identifierPost/posts")
      .then((result) => {
        setDataAvailable(result.data.length === 0);
        if (id) {
          setData([
            ...result.data.filter((item) => item._id === id),
            ...result.data.filter((item) => item._id !== id),
          ]);
        } else {
          setData(result.data.reverse());
        }
      })
      .catch();
  };

  let spinner = null;
  let postData = data.filter((items) => {
    const field =
      items.uploadedByName.toLowerCase().indexOf(props.searchUser) !== -1;

    return field;
  });
  if (data.length === 0 && !dataAvailable) {
    spinner = <Loader />;
  } else if (data.length !== 0 && !dataAvailable) {
    spinner = postData.map((item, index) => (
      <Identifier
        key={item._id}
        item={item}
        fetchData={fetchData}
        paramsId={paramsId}
        paramsFetch={paramsFetch}
      />
    ));
  } else {
    spinner = (
      <div style={{ width: "100%", textAlign: "center", paddingTop: "100px" }}>
        <strong>
          You are the first here share some knowledge with your community
        </strong>
      </div>
    );
  }
  if (data.length !== 0 && postData.length === 0 && props.searchUser !== "") {
    spinner = (
      <div
        style={{
          width: "100%",
          textAlign: "center",
          paddingTop: "100px",
          height: "80vh",
        }}
      >
        <p>No user found</p>
      </div>
    );
  }

  return (
    <div className={classes.MainIdentifierClass}>
      {(level >= 25000 || composeHandler) && (
        <WritingArea fetchData={fetchData} />
      )}
      {spinner}
      {data.length !== 0 && postData.length !== 0 && <AllCatchUp />}
    </div>
  );
};

export default IdentifierMain;
