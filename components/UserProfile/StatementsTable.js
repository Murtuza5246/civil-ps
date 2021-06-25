import React, { useEffect, useState } from "react";
import Table from "../identifierDetails/Table/Table";
import axios from "../axios/axios";

const StatementTable = (props) => {
  const [statements, setStatements] = useState([]);
  useEffect(() => {
    reloadMe();
  }, [props.id]);
  const reloadMe = () => {
    axios
      .get("/user/identifier/details/" + props.id)
      .then((result) => {
        setStatements(result.data.StatementUploaded);
      })
      .catch();
  };
  return <Table data={statements ? statements : []} />;
};

export default StatementTable;
