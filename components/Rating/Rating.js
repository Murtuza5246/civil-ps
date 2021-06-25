import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import axios from "../axios/axios";
import SideNoteBadge from "../qAndA/SideNoteBadge";
import classes from "./Rating.module.css";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CustomizedRatings(props) {
  const [valueOfHeart, setValueOfHeart] = useState(4.3);
  const userId = useSelector((state) => state.user.userId);
  console.log(userId);

  useEffect(() => {
    if (props.rating)
      setValueOfHeart(
        props.rating.reduce((accum, item) => accum + item.value, 0) /
          props.rating.length
      );
  }, [props.rating]);

  const uploadNewRating = (newValue) => {
    setValueOfHeart(newValue);
    if (userId) {
      axios
        .patch("user/update/rating/" + props.id, {
          userId: userId,
          value: newValue,
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
        <StyledRating
          name="customized-color"
          disabled={!userId}
          value={valueOfHeart}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          precision={0.5}
          onChange={(event, newValue) => {
            uploadNewRating(newValue);
          }}
          icon={<FavoriteIcon fontSize="inherit" />}
        />
        <div className={classes.badgeContent}>
          <SideNoteBadge
            title={props.rating.length >= 1000 ? "1000+" : props.rating.length}
          />
        </div>
      </Box>
    </div>
  );
}
