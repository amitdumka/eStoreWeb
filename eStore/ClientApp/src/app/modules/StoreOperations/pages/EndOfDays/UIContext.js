import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//endOfDay
//EndOfDay
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

  const initEndOfDay = {
    endOfDayId: 0,
    endOfDayedLocationId: 0,
    location: null,
    endOfDayType: 0,
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
    initEndOfDay,
    newEndOfDayButtonClick: UIEvents.newEndOfDayButtonClick,
    openEditEndOfDayDialog: UIEvents.openEditEndOfDayDialog,
    openDeleteEndOfDayDialog: UIEvents.openDeleteEndOfDayDialog,
    openDeleteEndOfDaysDialog: UIEvents.openDeleteEndOfDaysDialog,
    openFetchEndOfDaysDialog: UIEvents.openFetchEndOfDaysDialog,
    openUpdateEndOfDaysStatusDialog: UIEvents.openUpdateEndOfDaysStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
