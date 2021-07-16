import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//Payment
//payment

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

  const initPayment = {
    paymentId: 0,
    partyName: "",
    paymentSlipNo: "",
    onDate: new Date(),
    payMode: 0,
    bankAccountId: null,
    fromAccount: null,
    paymentDetails: "",
    amount: 0.0,
    remarks: "",
    partyId: null,
    ledgerEnteryId: null,
    isCash: false,
    isOn: false,
    isDyn: false,
    party: null,
    ledgerEntry: null,
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
    initPayment,
    newPaymentButtonClick: UIEvents.newPaymentButtonClick,
    openEditPaymentDialog: UIEvents.openEditPaymentDialog,
    openDeletePaymentDialog: UIEvents.openDeletePaymentDialog,
    openDeletePaymentsDialog: UIEvents.openDeletePaymentsDialog,
    openFetchPaymentsDialog: UIEvents.openFetchPaymentsDialog,
    openUpdatePaymentsStatusDialog: UIEvents.openUpdatePaymentsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
