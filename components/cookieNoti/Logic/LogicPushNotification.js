import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axios/axios";
import PushNotification from "../PushNotification";

const LogicPushNotification = () => {
  const [notification, setNotification] = useState([]);
  const [time, setTime] = useState(false);
  const [canNotify, setCanNotify] = useState(0);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (userId && canNotify >= 1) {
      setTimeout(() => {
        axios
          .get(`/user/notification/${userId}`)
          .then((result) => {
            setTime(!time);

            setNotification(result.data);
          })
          .catch();
      }, 60000);
    }
  }, [userId, time, canNotify]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`/user/notificationCheck/${userId}`)
        .then((result) => {
          setCanNotify(result.data);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  const resetNotification = () => {
    setNotification([]);
    axios
      .patch(`/user/notification/reset/${userId}`)
      .then((result) => {
        setNotification([]);
      })
      .catch((err) => console.log(err));
  };

  if (notification.length !== 0) {
    return (
      <div>
        {notification.map((items) => (
          <PushNotification
            resetThis={resetNotification}
            title={items.title}
            link={items.link}
          />
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default LogicPushNotification;
