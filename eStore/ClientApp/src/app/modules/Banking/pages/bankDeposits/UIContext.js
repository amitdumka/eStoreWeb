import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//BankDeposit
//bankDeposit

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

  const initBankDeposit = {
    bankDepositId: 0,
    bankAccountId: 1,
    chequeNo: null,
    onDate: new Date(),
    inNameOf: "",
    payMode: 0,
    remarks: "Testing",
    isTailoring: false,
    storeId: 1,
    amount:0.0, 
    details:"",
    isInHouse:false

  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initBankDeposit,
    newBankDepositButtonClick: UIEvents.newBankDepositButtonClick,
    openEditBankDepositDialog: UIEvents.openEditBankDepositDialog,
    openDeleteBankDepositDialog: UIEvents.openDeleteBankDepositDialog,
    openDeleteBankDepositsDialog: UIEvents.openDeleteBankDepositsDialog,
    openFetchBankDepositsDialog: UIEvents.openFetchBankDepositsDialog,
    openUpdateBankDepositsStatusDialog:
      UIEvents.openUpdateBankDepositsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
