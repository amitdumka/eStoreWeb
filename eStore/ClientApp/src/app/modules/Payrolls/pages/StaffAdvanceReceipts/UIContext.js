import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//StaffAdvanceReceipt
//staffAdvanceReceipt

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

  const initStaffAdvanceReceipt = {
    userId: "string",
    entryStatus: 0,
    isReadOnly: true,
    storeId: 1,
    store: null,
    staffAdvanceReceiptId: 0,
    employeeId: 0,
    employee: null,
    receiptDate: "2021-05-25",
    amount: 0,
    payMode: 0,
    details: "string",
    partyId: 0,
    party: null,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initStaffAdvanceReceipt,
    newStaffAdvanceReceiptButtonClick:
      UIEvents.newStaffAdvanceReceiptButtonClick,
    openEditStaffAdvanceReceiptDialog:
      UIEvents.openEditStaffAdvanceReceiptDialog,
    openDeleteStaffAdvanceReceiptDialog:
      UIEvents.openDeleteStaffAdvanceReceiptDialog,
    openDeleteStaffAdvanceReceiptsDialog:
      UIEvents.openDeleteStaffAdvanceReceiptsDialog,
    openFetchStaffAdvanceReceiptsDialog:
      UIEvents.openFetchStaffAdvanceReceiptsDialog,
    openUpdateStaffAdvanceReceiptsStatusDialog:
      UIEvents.openUpdateStaffAdvanceReceiptsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
