/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { useAuth } from "./modules/FireAuth/AuthContext";
import { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as LoginActions from "./modules/Auth/_redux/authRedux";
//import Login from "./modules/FireAuth/componets/pages/Login";
//import ForgotPassword from "./modules/FireAuth/componets/pages/ForgotPassword";
//import Signup from "./modules/FireAuth/componets/pages/Signup";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import UpdateProfile from "./modules/FireAuth/componets/pages/UpdateProfile";
import SecureRoute from "./modules/FireAuth/componets/SecureRoute";
import { AuthPage } from "./modules/Auth/pages/AuthPage";
import { useHistory } from "react-router-dom";

export function Routes() {
  const { currentUser, logout, isAuthenticated, getUser } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: currentUser != null,
      userInfo: currentUser,
    }),
    shallowEqual
  );
  const authUser = isAuthorized;
  const Logout = async () => {
    logout();
    history.push("/auth");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
      //user=null;
    } else {
      //console.log(isAuthenticated);
      var info = getUser();
      if (info != null) {
        dispatch(LoginActions.actions.setUser(info)); //.then(() => setUserInfo(info));
        setUserInfo(info);
        // user=info;
        //isAuthorizedFor=authState.isAuthenticated;
      }
    }
  }, [isAuthenticated, getUser, dispatch]); // Update if authState changes

  return (
    <Switch>
      {!authUser ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/auth/login" to="/" />
      )}
      <SecureRoute
        path="updateprofile"
        component={UpdateProfile}
        user={userInfo}
      />
      {/* <Route path="/login" component={Login} />  */}
      <Route path="/auth" component={AuthPage} />
      <Route path="/logout" component={Logout} />
      {/* <Route path="/signup" component={Signup} />
       <Route path="/forgot-password" component={ForgotPassword} /> */}
      <Route path="/error" component={ErrorsPage} />

      {!authUser ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth" />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}
