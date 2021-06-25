import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray({
  word,
  arrayTransfer,
  keywordButton,
  resetArray,
  ...props
}) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([]);
  useEffect(() => {
    if (word.label !== "") {
      const addNew = chipData.filter((e) => e.label === word);
      if (addNew.length !== 1) {
        setChipData((prevState) => {
          return [...prevState, word];
        });
      }
    } else {
      return;
    }
  }, [word]);
  const handleDelete = (valueIndex) => () => {
    setChipData((chips) => chips.filter((chip, index) => index !== valueIndex));
  };
  useEffect(() => {
    setChipData([]);
  }, [resetArray]);

  return (
    <div>
      <Paper
        style={{ marginBottom: "10px" }}
        component="ul"
        className={classes.root}
      >
        {chipData.map((data, index) => {
          let icon;
          return (
            data.label !== "" && (
              <li
                key={
                  Math.random(0, 100) * Math.random(101, 201) +
                  new Date().getMilliseconds()
                }
              >
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={!keywordButton && handleDelete(index)}
                  className={classes.chip}
                />
              </li>
            )
          );
        })}
      </Paper>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={() => arrayTransfer(chipData)}
        disabled={chipData.length < 1 || keywordButton}
      >
        Save
      </Button>
    </div>
  );
}
