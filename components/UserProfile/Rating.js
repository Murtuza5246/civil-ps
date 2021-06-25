import React, { useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import axios from "../axios/axios";
import RatedPeople from "./RatedPeopleDialog";

export default function SimpleRating(props) {
  const [value, setValue] = React.useState(5);
  const [valueOfHeart, setValueOfHeart] = React.useState(5);
  const userId = useSelector((state) => state.user.userId);
  const fName = useSelector((state) => state.user.fName);
  const lName = useSelector((state) => state.user.lName);
  const authType = useSelector((state) => state.user.authType);
  const profileImage = useSelector((state) => state.statement.profileImage);
  useEffect(() => {
    if (props.rating === Array)
      setValueOfHeart(
        props.rating.reduce((accum, item) => accum + item.value, 0) /
          props.rating.length
      );
  }, [props.rating]);

  useEffect(() => {
    uploadNewRating(value);
  }, [value]);

  const uploadNewRating = (newValue) => {
    setValueOfHeart(newValue);

    if (userId) {
      axios
        .patch(`user/update/rating/${props.id}`, {
          userId: userId,
          value: newValue,
          name: fName + " " + lName,
          profileImage,
          authType,
        })
        .then((result) => {
          props.reLoadMe();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Average rating</Typography>
        <Rating
          name="simple-controlled"
          value={valueOfHeart > 5 ? 5 : valueOfHeart}
          //   value={4.3}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        {/* <RatedPeople
          buttonText="Who rated"
          text="Rated people"
          followers={props.rating === Array ? props.rating : []}
          userId={props.id}
          disability={props.rating ? props.rating.length === 0 : true}
        /> */}
      </Box>
    </div>
  );
}
