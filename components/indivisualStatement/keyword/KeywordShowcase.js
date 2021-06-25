import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Link from "next/link";
import TagFacesIcon from "@material-ui/icons/TagFaces";

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

export default function ChipsArray(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  useEffect(() => {
    setChipData(props.data);
  }, [props.data]);

  return (
    <div component="ul" className={classes.root}>
      {chipData.map((data) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <li key={data.key}>
            <Link href={"/statements?searchValue=" + data.label}>
              <a style={{ textDecoration: "none" }}>
                {" "}
                <Chip
                  style={{ cursor: "pointer" }}
                  icon={icon}
                  label={
                    data.label.length > 30
                      ? data.label.substring(0, 30) + "..."
                      : data.label
                  }
                  className={classes.chip}
                />{" "}
              </a>
            </Link>
          </li>
        );
      })}
    </div>
  );
}
