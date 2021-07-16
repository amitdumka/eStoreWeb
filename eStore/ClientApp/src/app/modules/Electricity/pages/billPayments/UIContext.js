import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//billPayment
//BillPayment
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

  const initBillPayment = {
    eBillPaymentId: 0,
    eletricityBillId: 0,
    bill: null,
    paymentDate: new Date(),
    amount: 0,
    mode: 0,
    paymentDetails: "",
    remarks: "",
    isPartialPayment: false,
    isBillCleared: false,
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
    initBillPayment,
    newBillPaymentButtonClick: UIEvents.newBillPaymentButtonClick,
    openEditBillPaymentDialog: UIEvents.openEditBillPaymentDialog,
    openDeleteBillPaymentDialog: UIEvents.openDeleteBillPaymentDialog,
    openDeleteBillPaymentsDialog: UIEvents.openDeleteBillPaymentsDialog,
    openFetchBillPaymentsDialog: UIEvents.openFetchBillPaymentsDialog,
    openUpdateBillPaymentsStatusDialog:
      UIEvents.openUpdateBillPaymentsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
