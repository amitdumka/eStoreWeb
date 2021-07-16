import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//rent
//Rent
const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
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

  const initRent = {
    rentId: 0,
    rentedLocationId: 0,
    location: null,
    rentType: 0,
    onDate: new Date(),
    period: "",
    amount: 0.0,
    mode: 0,
    paymentDetails: "",
    remarks: "",
    storeId: 1,
    store: null,
    userId: "WebUI",
    entryStatus: 0,
    isReadOnly: false,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initRent,
    newRentButtonClick: UIEvents.newRentButtonClick,
    openEditRentDialog: UIEvents.openEditRentDialog,
    openDeleteRentDialog: UIEvents.openDeleteRentDialog,
    openDeleteRentsDialog: UIEvents.openDeleteRentsDialog,
    openFetchRentsDialog: UIEvents.openFetchRentsDialog,
    openUpdateRentsStatusDialog: UIEvents.openUpdateRentsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
