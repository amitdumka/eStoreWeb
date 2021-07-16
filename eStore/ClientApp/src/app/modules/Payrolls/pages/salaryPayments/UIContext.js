import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//SalaryPayment
//salaryPayment

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

  const initSalaryPayment = {
    salaryPaymentId: 0,
    employeeId: 0,
    employee: null,
    salaryMonth: "",
    salaryComponet: 0,
    paymentDate: new Date(),
    amount: 0.0,
    payMode: 0,
    details: "",
    partyId: null,
    party: null,
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
    initSalaryPayment,
    newSalaryPaymentButtonClick: UIEvents.newSalaryPaymentButtonClick,
    openEditSalaryPaymentDialog: UIEvents.openEditSalaryPaymentDialog,
    openDeleteSalaryPaymentDialog: UIEvents.openDeleteSalaryPaymentDialog,
    openDeleteSalaryPaymentsDialog: UIEvents.openDeleteSalaryPaymentsDialog,
    openFetchSalaryPaymentsDialog: UIEvents.openFetchSalaryPaymentsDialog,
    openUpdateSalaryPaymentsStatusDialog:
      UIEvents.openUpdateSalaryPaymentsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
