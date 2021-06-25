import { Grid, useMediaQuery } from "@material-ui/core";
import React from "react";
import Footer from "../Footer/Footer";
import Sidenav from "../sideNavbar/Sidenav";
import App from "./Chat";

const ChatMain = () => {
  const width = useMediaQuery("(min-width:500px)");
  return (
    <div style={{ backgroundColor: "white" }}>
      <Grid container>
        <Grid item lg={2} md={2} xl={2}>
          <div style={{ backgroundColor: "white", zIndex: "2" }}>
            <Sidenav />
          </div>
        </Grid>
        <Grid item xs={12} md={10} lg={10} xl={10}>
          <div style={{ width: "100%", paddingTop: "55px" }}>
            <App />
          </div>
        </Grid>
        {width ? (
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Footer />
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default ChatMain;
