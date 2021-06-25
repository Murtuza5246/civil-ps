// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
// import { Grid } from "@material-ui/core";
// import axios from "../axios/axios";
// import Skeleton from "@material-ui/lab/Skeleton";
// import TextField from "@material-ui/core/TextField";
// import classes from "./profile.module.css";
// import Backdrop from "../BackDropFile/BackDrop";
// import { ButtonToggle } from "reactstrap";
// import { withSnackbar } from "notistack";
// import MetaTags from "react-meta-tags";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import About from "../UserProfile/About";

// class ProfileDetails extends Component {
//   state = {
//     details: "",
//     profileImage: "",
//     length: "",
//     loading: false,
//     showInput: false,
//     updateLoading: false,
//     about: "",
//   };
//   componentDidMount() {
//     window.scrollTo(0, 0);
//     this.setState({ loading: true });
//     setTimeout(() => {
//       this.firstTimeFetchingDetails();
//     }, 2000);
//   }
//   firstTimeFetchingDetails() {
//     axios
//       .get("/user/details/" + this.props.userId)
//       .then((result) => {
//         this.setState({ details: result.data.userDetails[0] });
//         this.setState({
//           about: result.data.userDetails[0].about
//             ? result.data.userDetails[0].about
//             : "",
//         });
//         if (result.data.userDetails[0].profileImage !== "")
//           this.setState({
//             profileImage: result.data.userDetails[0].profileImage,
//           });
//         this.setState({
//           length: result.data.userDetails[0].savedStatements.length,
//         });
//         this.setState({ loading: false });
//       })
//       .catch((err) => {
//         console.log(err);
//         this.setState({ loading: false });
//       });
//   }
//   aboutInputShow() {
//     this.setState({ showInput: !this.state.showInput });
//   }
//   aboutChangeHandler(e) {
//     e.preventDefault();
//     this.setState({ about: e.target.value });
//   }
//   saveAboutInfo() {
//     if (this.state.about === "" || !this.state.about) {
//       this.props.enqueueSnackbar("Please first write something");
//       return;
//     }
//     this.setState({ updateLoading: true });
//     let aboutData = {
//       about: this.state.about,
//     };
//     axios
//       .patch(
//         "/user/update/about/" + this.props.userId + "/" + this.state.about,
//         aboutData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             authorization: "Bearer " + this.props.token,
//           },
//         }
//       )
//       .then((result) => {
//         console.log(result);
//         this.firstTimeFetchingDetails();
//         this.setState({ updateLoading: false });
//         this.setState({ showInput: false });
//       })
//       .catch((err) => {
//         console.log(err);
//         this.setState({ updateLoading: false });
//       });
//   }
//   render() {
//     let redirect = null;
//     if (!this.props.userId) {
//       redirect = <Redirect to="/statements" />;
//     }
//     let skeleton = null;
//     if (this.state.details === "") {
//       skeleton = (
//         <div className={classes.NestedSkeleton}>
//           {/* <Skeleton variant="text" />
//           <Skeleton variant="circle" width={40} height={40} /> */}
//           <Skeleton variant="rect" width={550} height={550} />
//         </div>
//       );
//     }
//     let drop = null;
//     if (this.state.length === "") {
//       drop = (
//         <div>
//           <Backdrop loading={this.state.loading} />
//         </div>
//       );
//     }
//     if (this.state.details !== "") {
//       redirect = (
//         <div className={classes.profileDivManage}>
//           <MetaTags>
//             <title>
//               {"Profile - " +
//                 this.state.details.fName +
//                 " " +
//                 this.state.details.lName}
//             </title>
//             <meta
//               id="meta-description"
//               name="description"
//               content={
//                 "Profile - " +
//                 this.state.details.fName +
//                 " " +
//                 this.state.details.lName
//               }
//             />
//             <meta
//               id="og-title"
//               property="og:title"
//               content={"Problemspotter user"}
//             />
//             <meta
//               id="og-image"
//               property="og:image"
//               content={
//                 "https://my-server-problemspotter.herokuapp.com/image/image/" +
//                 this.state.profileImage
//               }
//             />
//           </MetaTags>
//           <div className={classes.FirstNestedDiv}>
//             <Grid container spacing={1} direction="row">
//               <Grid item xs={12} lg={12} md={12} xl={12}>
//                 <div>
//                   <img
//                     src={
//                       this.state.profileImage
//                         ? "https://my-server-problemspotter.herokuapp.com/image/image/" +
//                           this.state.profileImage
//                         : "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
//                     }
//                     alt="profile"
//                   />
//                 </div>

//                 <div>
//                   <h3>
//                     {this.state.details.fName + " " + this.state.details.lName}{" "}
//                     {this.props.authType === "Admin" && (
//                       <i className="fas fa-chalkboard-teacher"></i>
//                     )}
//                     {this.props.authType === "Student" && (
//                       <i className="fas fa-user-graduate"></i>
//                     )}
//                     {this.props.authType === "Identifier" && (
//                       <i className="fas fa-hard-hat"></i>
//                     )}
//                   </h3>
//                 </div>
//                 <p className={classes.aboutInfoHandle}>
//                   <About textObject={this.state.details.about} />
//                   <p>
//                     To update your about section and many more things you can
//                     visit
//                     <Link to={`/user/details/${this.props.userId}`}> here</Link>
//                   </p>
//                 </p>
//                 {this.state.showInput && (
//                   <div style={{ width: "100%", paddingRight: "10px" }}>
//                     <TextField
//                       id="outlined-full-width"
//                       label="About"
//                       style={{ margin: 8 }}
//                       helperText="What describes you."
//                       fullWidth
//                       margin="normal"
//                       value={this.state.about}
//                       placeholder={"Write something that describe you."}
//                       onChange={(e) => this.aboutChangeHandler(e)}
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       variant="outlined"
//                     />

//                     <ButtonToggle
//                       onClick={() => this.saveAboutInfo()}
//                       color="success"
//                     >
//                       Update
//                     </ButtonToggle>
//                     <span></span>
//                     {this.state.updateLoading && <CircularProgress />}
//                   </div>
//                 )}
//               </Grid>
//             </Grid>
//           </div>
//           <hr style={{ width: "80%" }} />
//           <div className={classes.secondNestedDiv}>
//             <h2>Account Details</h2>
//           </div>
//           <div className={classes.thirdNestedDiv}>
//             <Grid container>
//               <Grid item xs={12} lg={12} md={12} xl={12}>
//                 <h6>
//                   Creation Details!{"  "}
//                   <i className="fas fa-calendar-week"></i>
//                 </h6>
//               </Grid>
//               <Grid item xs={6} lg={6} md={6} xl={6}>
//                 <p>
//                   Account Creation Time:
//                   <strong>{this.state.details.creationTime}</strong>
//                 </p>
//               </Grid>
//               <Grid item xs={6} lg={6} md={6} xl={6}>
//                 <p>
//                   Account Creation Date:
//                   <strong>{this.state.details.creationDate}</strong>
//                 </p>
//               </Grid>
//             </Grid>
//             <hr style={{ width: "75%" }} />
//             <div>
//               <Grid container>
//                 <Grid item xs={12} lg={12} md={12} xl={12}>
//                   <h6>Activities Through This Account</h6>
//                 </Grid>
//                 <Grid item xs={12} lg={12} md={12} xl={12}>
//                   <p>
//                     Saved Statements:
//                     <strong>{this.state.length}</strong>
//                   </p>
//                 </Grid>
//                 <hr />
//                 <Grid item xs={6} lg={6} md={6} xl={6}>
//                   <h6>Base:</h6>
//                 </Grid>
//                 <Grid item xs={6} lg={6} md={6} xl={6}>
//                   <p>
//                     <strong>{this.state.details.authType}</strong>
//                   </p>
//                 </Grid>
//               </Grid>
//             </div>
//             <hr style={{ width: "75%" }} />
//           </div>
//         </div>
//       );
//     }
//     return (
//       <div className={classes.mainDiv}>
//         {redirect}
//         {skeleton}
//         {drop}
//       </div>
//     );
//   }
// }
// function mapStateToProps(state) {
//   return {
//     userId: state.user.userId,
//     token: state.user.token,
//     authType: state.user.authType,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {};
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withSnackbar(ProfileDetails));
