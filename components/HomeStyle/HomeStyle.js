import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import Grid from "@material-ui/core/Grid";
import classes from "./homePage.module.css";
import { useMediaQuery } from "@material-ui/core";
// import { Helmet } from "react-helmet";
// import dynamic from "next/dynamic";
import Demo from "./WaterEffect";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import { apiDomain } from "../../apiPath";

// const { Demo } = dynamic(
//   async () => {
//     return import("./WaterEffect.js");
//   },
//   { ssr: false }
// );
const HomeStyle = () => {
  // useEffect(() => {
  //   if (typeof window != "undefined") {
  //     window.scrollTo(0, 0);
  //   }
  // });
  const width = useMediaQuery("(min-width:500px)");

  let firstElement = () => {
    // try {
    //   return (
    //     <Demo image="Brick">
    //       <div style={{ width: "100%", margin: "auto" }}>
    //         <div className={classes.animationDiv}>
    //           <Grid item xs={12} md={12} lg={12} xl={12}>
    //             <div className={classes.mainHeadingHandler}>
    //               <h1>Hello World!!!</h1>
    //             </div>
    //           </Grid>
    //         </div>
    //       </div>
    //     </Demo>
    //   );
    // } catch {
    return (
      <div style={{ width: "100%", margin: "auto" }}>
        <div className={classes.animationDiv}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <div className={classes.mainHeadingHandler}>
              <h1>Hello world!!</h1>
            </div>
          </Grid>
        </div>
      </div>
    );
    // }
  };
  let secondElement = () => {
    // try {
    //   return (
    //     <Demo image="Banner">
    //       <div style={{ width: "100%", height: "100vh" }}></div>
    //     </Demo>
    //   );
    // } catch {
    return (
      <img
        className={classes.logoImageHandler}
        src={`${apiDomain}/websiteLogo/newlogo.jpg`}
        alt="logo"
      />
    );
    // }
  };
  return (
    <div>
      <div className={classes.homePageStyle}>
        {/* <Helmet>
          <title>
            Problemspotter - Civil engineering construction live problems
          </title>
          <meta
            id="meta-description"
            name="description"
            content={
              "civil engineering construction problems statements by industrial person and approved by experts"
            }
          />
          <meta
            id="og-title"
            property="og:title"
            content={
              "civil engineering Construction site problems , Educational website for civil engineering students , Learn the current scenario of construction site,What kind of problems they are facing"
            }
          />
          <meta
            id="og-image"
            property="og:image"
            content={
              "https://my-server-problemspotter.herokuapp.com/websiteLogo/newlogo.jpg"
            }
          />
        </Helmet> */}
        <Grid container>
          {width ? (
            firstElement()
          ) : (
            <div style={{ width: "100%", margin: "auto" }}>
              <div className={classes.animationDiv}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <div className={classes.mainHeadingHandler}>
                    <h1>Hello world!!</h1>
                  </div>
                </Grid>
              </div>
            </div>
          )}
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <div className={classes.nestedDivThree}>
              <Grid container>
                <Grid item xs={1} md={2} lg={2} xl={2}></Grid>
                <Grid item xs={12} md={4} lg={4} xl={4}>
                  <div className={classes.imageTexting}>
                    <h5>
                      Welcome to <strong>problemspotter.com</strong>.
                    </h5>
                    <p>A Database Of Civil Construction Daily Problems.</p>
                    <hr />
                    <p style={{ textAlign: "left" }}>
                      Here you will find the construction site problems , and
                      you can analyze the current scenario of working from
                      construction site to at home. Just keep reading the
                      statements ,All statements are verified by industry{" "}
                      <strong style={{ color: "red" }}>EXPERTS.</strong>
                    </p>
                    <div className={classes.exploreMoreClass}>
                      <Link href="/statements">
                        <Button secondary>Explore</Button>
                        {/* <Button variant="outlined" color="primary">
                          Explore
                        </Button> */}
                      </Link>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={4} lg={4} xl={4}>
                  <div className={classes.nestedDivForManage}>
                    <img
                      alt=""
                      src="https://image.freepik.com/free-vector/engineers-team-discussing-issues-construction-site_74855-4786.jpg"
                    />
                  </div>
                </Grid>
                <Grid item xs={1} md={2} lg={2} xl={2}></Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <div className={classes.logoMainDiv}>
          <div className={classes.LogoDiv}>
            {width ? (
              secondElement()
            ) : (
              <img
                className={classes.logoImageHandler}
                src={`${apiDomain}/websiteLogo/newlogo.jpg`}
                alt="logo"
              />
            )}
          </div>
        </div>
        <div className={classes.storyMargin}>
          <div className={classes.infoDiv}>
            <div className={classes.infoNestedDiv}>
              <h5>
                Without Hard Work You Can't Execute Your Smart Work. -
                <strong style={{ color: "red" }}>Murtuja Kavantwala</strong>
              </h5>
              <hr />
              <p className={classes.paragraphStory}>
                Hello to my Civil Engineer Friends!, I Am Murtuja Kavantwala ,I
                am also a civil engineer.You may wonder how i created this
                website i know that my profession is civil engineer so why i get
                into the website coding , During my diploma for our project me
                and my team wants to do something which can be helpful to our
                civil engineering society for that we visited many construction
                sites to learn the actual world outside of books.During this
                journey we find that every working site has different working
                problems. The one problem which we identify which we can also
                use as our study project.During to solve that problem i think
                that "How we get this idea for our study project?" -The answer
                is me and my team visited many construction site in our area.So
                i think why we get ourself limited knowledge about construction
                industry.Many students are just copy/paste their final year
                project without even visiting any construction site.And here at
                this point i got an idea why not we provide them all possible
                knowledge of working condition of construction site.{" "}
                <i style={{ color: "red" }}>
                  So i created this simplest Educational Website.
                </i>{" "}
                And here you go just click on Home button in Navigation bar to
                explore more about your area of interest.
              </p>
              <hr />
              <p style={{ opacity: "0.3", color: "grey" }}>
                The full story of how i actually learn coding ,And how i build
                this platform -All this you will find out during your reading
                journey on problemspotter.com -happy to meet you around.
                <i className="fas fa-smile-wink"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.footerForHome}>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
  // return (
  //   <div style={{ paddingTop: "60px" }}>
  //     <h1>hello</h1>
  //     <div className={classes.footerForHome}>
  //       <Footer />{" "}
  //     </div>
  //   </div>
  // );
};

// function mapStateToProps(state) {
//     return {

//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {

//     };
// }
export default HomeStyle;
