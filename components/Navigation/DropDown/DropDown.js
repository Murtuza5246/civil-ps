import React from "react";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import * as actionCreator from "../../../redux/actions/index";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const authType = useSelector((state) => state.user.authType);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{ color: "white" }}
        >
          {!open ? (
            <ArrowDropDownIcon fontSize="small" />
          ) : (
            <ArrowDropUpIcon fontSize="small" />
          )}
          Action
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {authType && (
                      <Link href="/saved-statements">
                        <MenuItem onClick={handleClose}>
                          <a style={{ textDecoration: "none", color: "Black" }}>
                            Saved Statements{" "}
                          </a>
                        </MenuItem>
                      </Link>
                    )}

                    {(authType === "Admin" || authType === "Identifier") && (
                      <Link href="/compose">
                        <MenuItem onClick={handleClose}>
                          <a style={{ textDecoration: "none", color: "Black" }}>
                            Compose Statement{" "}
                          </a>
                        </MenuItem>
                      </Link>
                    )}
                    {userId && (
                      <Link href={`/user/details/${userId}`}>
                        <MenuItem onClick={handleClose}>
                          <a style={{ textDecoration: "none", color: "Black" }}>
                            My account
                          </a>{" "}
                        </MenuItem>
                      </Link>
                    )}
                    {!userId && (
                      <Link href="/login">
                        <MenuItem onClick={handleClose}>
                          <a style={{ textDecoration: "none", color: "Black" }}>
                            Login
                          </a>
                        </MenuItem>
                      </Link>
                    )}
                    {userId && (
                      <Link href="/statements">
                        <MenuItem onClick={handleClose}>
                          <a
                            style={{ textDecoration: "none", color: "Black" }}
                            onClick={() => dispatch(actionCreator.logout())}
                          >
                            Logout
                          </a>{" "}
                        </MenuItem>
                      </Link>
                    )}
                    {!userId && (
                      <Link href="/signup">
                        <MenuItem onClick={handleClose}>
                          <a style={{ textDecoration: "none", color: "Black" }}>
                            SignUp
                          </a>{" "}
                        </MenuItem>
                      </Link>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
