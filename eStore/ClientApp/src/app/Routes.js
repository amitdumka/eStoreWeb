/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector ,useDispatch} from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
/////import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import { useState, useEffect } from "react";

import { useOktaAuth } from "@okta/okta-react";
import CustomLoginComponent from "./modules/okta/Login";
import {  LoginCallback } from "@okta/okta-react";
import  * as LoginActions from "./modules/Auth/_redux/authRedux";

// import Messages from "./modules/okta/Messages";
export function Routes() {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  //const { isAuthorizedFor, user } = myAuth;
  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
      //user=null;
    } else {
      authService.getUser().then((info) => {
        dispatch(LoginActions.actions.setUser(info));//.then(() => setUserInfo(info));
        setUserInfo(info);
       // user=info;
        //isAuthorizedFor=authState.isAuthenticated; 
        //console.log(info);
      });
    }
  }, [authState, authService,dispatch]); // Update if authState changes

  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: authState.isAuthenticated, //auth.user != null,
      userInfo: userInfo,
    }),
    shallowEqual
  );
  

  const logout = async () => {
    authService.logout("/");
  };

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
         <CustomLoginComponent />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/login" to="/" />
      )}
      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={logout} />
      <Route path="/implicit/callback" component={LoginCallback} />
      <Route path="/login" component={CustomLoginComponent} />
      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/login" />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}
