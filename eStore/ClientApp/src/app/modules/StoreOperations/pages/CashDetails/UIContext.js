import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//cashDetail
//CashDetail
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

  const initCashDetail = {
    cashDetailId: 0,
    cashDetailedLocationId: 0,
    location: null,
    cashDetailType: 0,
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
    initCashDetail,
    newCashDetailButtonClick: UIEvents.newCashDetailButtonClick,
    openEditCashDetailDialog: UIEvents.openEditCashDetailDialog,
    openDeleteCashDetailDialog: UIEvents.openDeleteCashDetailDialog,
    openDeleteCashDetailsDialog: UIEvents.openDeleteCashDetailsDialog,
    openFetchCashDetailsDialog: UIEvents.openFetchCashDetailsDialog,
    openUpdateCashDetailsStatusDialog: UIEvents.openUpdateCashDetailsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
