import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//CashPayment
//cashPayment

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

  const initCashPayment = {
    cashPaymentId: 0,
    paymentDate: new Date(),
    transcationModeId: 0,
    mode: null,
    paidTo: "",
    amount: 0.0,
    slipNo: "",
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
    initCashPayment,
    newCashPaymentButtonClick: UIEvents.newCashPaymentButtonClick,
    openEditCashPaymentDialog: UIEvents.openEditCashPaymentDialog,
    openDeleteCashPaymentDialog: UIEvents.openDeleteCashPaymentDialog,
    openDeleteCashPaymentsDialog: UIEvents.openDeleteCashPaymentsDialog,
    openFetchCashPaymentsDialog: UIEvents.openFetchCashPaymentsDialog,
    openUpdateCashPaymentsStatusDialog:
      UIEvents.openUpdateCashPaymentsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
