import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//Connection
//connection

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}0${date}T00:00:00`;
}

export const UIConsumer = UIContext.Consumer;

export function UIProvider({ UIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initConnection = {
    electricityConnectionId: 0,
    locationName: "",
    connectioName: "",
    city: "",
    state: "",
    pinCode: "",
    consumerNumber: "",
    conusumerId: "",
    connection: 0,
    connectinDate: new Date(),
    disconnectionDate: null,
    kvLoad: 0,
    ownedMetter: false,
    totalConnectionCharges: 0,
    securityDeposit: 0,
    remarks: "",
    storeId: 1,
    store: null,
    userId: "WebUI",
    isReadOnly: false,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initConnection,
    newConnectionButtonClick: UIEvents.newConnectionButtonClick,
    openEditConnectionDialog: UIEvents.openEditConnectionDialog,
    openDeleteConnectionDialog: UIEvents.openDeleteConnectionDialog,
    openDeleteConnectionsDialog: UIEvents.openDeleteConnectionsDialog,
    openFetchConnectionsDialog: UIEvents.openFetchConnectionsDialog,
    openUpdateConnectionsStatusDialog:
      UIEvents.openUpdateConnectionsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
