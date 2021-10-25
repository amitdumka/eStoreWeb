/**
 * Entry application component used to compose providers and render Routes.
 * Removing okta and adding firebase auth.
 */

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "../app/RoutesV3";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
import { AuthProvider } from "./modules/FireAuth/AuthContext";
//Okta Addition
//import { Security } from '@okta/okta-react';
//import config from '../config';
export default function App({ store, persistor, basename }) {
  //Okta Addition
  // const history = useHistory(); // example from react-router

  //  const customAuthHandler = () => {
  //    // Redirect to the /login page that has a CustomLoginComponent
  //    history.push('/login');
  //  };

  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            <MaterialThemeProvider>
              {/* Provide `react-intl` context synchronized with Redux state.  */}
              <I18nProvider>
                <AuthProvider>
                  <Routes />
                </AuthProvider>
              </I18nProvider>
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
