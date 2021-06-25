import React from "react";
import { Card } from "@material-ui/core";
import LogInList from "./LogInList";

const LogInDetails = (props) => {
  const weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <h4>Log in Details</h4>
      <hr />
      <Card>
        {props.loginData.slice(0, 5).map((items) => (
          <LogInList
            flag={items.otherDetails.flag.png}
            city={
              items.day === weeks[new Date().getDay()]
                ? new Date().getTime() - new Date(items.time).getTime() >
                  86400000
                  ? items.day
                  : "Today"
                : items.day
            }
            time={items.time}
          />
        ))}
      </Card>
    </div>
  );
};

export default LogInDetails;
