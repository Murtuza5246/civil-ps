import React from "react";
import classes from "./footer.module.css";
import Link from "next/link";
import { useMediaQuery } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const Footer = () => {
  const width = useMediaQuery("(min-width:500px)");
  return (
    <div className={classes.footerInfo}>
      <Grid container>
        <Grid item xs={12} lg={4} md={4}>
          <div>
            <h5 style={{ color: "red" }}>Social Media Handles</h5>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/problemspotter/"
                  target="_default"
                >
                  Instagram{"  "}
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/DatabaseOfCivilConstructionProblems"
                  target="_default"
                >
                  Facebook{"  "}
                  <i className="fab fa-facebook-square"></i>
                </a>
              </li>
              <li>
                <a href="/" target="_default">
                  Twitter{"  "}
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
          <hr style={{ border: "none", borderBottom: "0.8px solid white" }} />
        </Grid>
        <Grid item xs={12} lg={4} md={4}>
          <div>
            <h5 style={{ color: "red" }}>Features We Provide</h5>
          </div>
          <ul>
            <li>1. Save Statements For Late Read.</li>
          </ul>
          <ul>
            <li>2. Auth Type To Particular User.</li>
          </ul>
          <ul>
            <li>3. Genuine Statements.</li>
          </ul>
          <ul>
            <li>
              4. Verified Identifier With{" "}
              <i className="fas fa-check-circle"></i>.
            </li>{" "}
          </ul>
          <ul>
            <li>5. Statements Approval By Admins Expert Penal.</li>{" "}
          </ul>
          <ul>
            <li>6. Experts From Different Colleges All Over From India</li>
          </ul>
          <hr style={{ border: "none", borderBottom: "0.8px solid white" }} />
        </Grid>
        <Grid item xs={12} lg={4} md={4}>
          {/* <div>
              <h5 style={{ color: "red" }}>Features We Provide</h5>
            </div>
            <ul>
              <li>1. Save Statements For Late Read.</li>
            </ul>
            <ul>
              <li>2. Auth Type To Particular User.</li>
            </ul>
            <ul>
              <li>3. Genuine Statements.</li>
            </ul>
            <ul>
              <li>
                4. Verified Identifier With <i class="fas fa-check-circle"></i>.
              </li>{" "}
            </ul>
            <ul>
              <li>5. Statements Approval By Admins Expert Penal.</li>{" "}
            </ul>
            <ul>
              <li>6. Experts From Different Colleges All Over From India</li>
            </ul>
            <hr style={{ border: "none", borderBottom: "0.8px solid white" }} /> */}
        </Grid>
      </Grid>
      {width && (
        <hr style={{ border: "none", borderBottom: "0.8px solid white" }} />
      )}
      <p style={{ color: "grey" }}>
        - Designed by{" "}
        <Link
          href="/user/details/5fae4627e0179b001718dedf"
          // to="/user/details/5fae4627e0179b001718dedf"
          //
        >
          <a style={{ textDecoration: "none", color: "grey" }}>
            {" "}
            Murtuja kavantwala
          </a>
        </Link>
      </p>
      <p style={{ color: "grey" }}>{"Copyright " + new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
