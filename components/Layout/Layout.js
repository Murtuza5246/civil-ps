import React, { Component } from "react";
import NavigationItem from "../Navigation/NavigationItem/NavigationItem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from "../404Page/PageNotFound";
import Statements from "../Statements/Statements";
import IndivisualStatement from "../indivisualStatement/IndivisualStatement";
import classes from "./Layout.module.css";
import Login from "../user/login/Login";
import loadable from "@loadable/component";
import ApprovalAdmin from "../statement_approval/ApprovalAdmin";
import HomeStyle from "../HomeStyle/HomeStyle";
import Notification from "../Notiications/Notifications";
import otherLinkRedirect from "./otherLinkRedirect";

const QandA = loadable(() => import("../qAndA/QandA"));
const UserProfile = loadable(() => import("../UserProfile/UserProfile"));
const SavedStatements = loadable(() =>
  import("../savedStatements/SavedStatements")
);
const accountVerification = loadable(() =>
  import("../verification/Verification")
);
const ForgetPassword = loadable(() => import("../user/login/ForgetPassword"));
const ComposeStatements = loadable(() =>
  import("../ComposeStatements/ComposeStatements")
);
const Profile = loadable(() => import("../user/profile/Profile"));
const EmailVerification = loadable(() =>
  import("../EmailVerification/EmailVerification.js")
);
const ProfileDetails = loadable(() => import("../Profile/ProfileDetails"));
const SignUp = loadable(() => import("../user/signUp/SignUp"));
const ApprovedStatements = loadable(() =>
  import("../ApprovedStatements/ApprovedStatements")
);
const IdentifierDetails = loadable(() =>
  import("../identifierDetails/IdentifierDetails")
);
const PasswordReset = loadable(() => import("../PasswordReset/PasswordReset"));

const Chat = loadable(() => import("../chat/ChatMain"));

class Layout extends Component {
  render() {
    return (
      <div>
        {/* <Suspense fallback={Spinner}> */}
        <NavigationItem />
        <Notification />
        <div className={classes.bigScreenProblem}>
          <Switch>
            {/* <PlusButton />; */}
            <Route exact path="/" component={HomeStyle} />

            <Route exact path="/qanda" component={QandA} />
            {/* <Route exact path="/help" component={Help} /> */}
            <Route path="/saved-statements" component={SavedStatements} />
            <Route exact path="/statements" component={Statements} />
            <Route exact path="/compose" component={ComposeStatements} />
            <Route exact path="/account/profile" component={ProfileDetails} />
            <Route exact path="/live" component={Chat} />
            <Route
              exact
              path="/account/verification"
              component={accountVerification}
            />
            <Route exact path="/signup" component={SignUp} />
            <Route
              exact
              path="/user/statement/id/:statementId"
              component={IndivisualStatement}
            />
            <Route
              exact
              path="/new/pending/statements"
              component={ApprovalAdmin}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/account/profile" component={Profile} />
            <Route exact path="/user/details/:id" component={UserProfile} />
            <Route exact path="/user/forget" component={ForgetPassword} />
            <Route
              exact
              path="/user/statement/id/problemspotter.com/user/details/:id"
              component={otherLinkRedirect}
            />
            <Route
              exact
              path="/account/authentication/forget/:forgetKey"
              component={PasswordReset}
            />
            <Route
              exact
              path="/account/authentication/:id/:emailKey"
              component={EmailVerification}
            />
            <Route
              exact
              path="/activity/approved"
              component={ApprovedStatements}
            />
            <Route
              exact
              path="/identifier/details/:id"
              component={IdentifierDetails}
            />
            {/* <Route path="/saved" component={PageTransfer} /> */}
            {/* </Suspense> */}
            <Route path="" render={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Layout;
