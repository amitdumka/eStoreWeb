import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./StoreUIHelpers";

const StoresUIContext = createContext();

export function useStoresUIContext() {
  return useContext(StoresUIContext);
}
export function getCurrentDate(separator=''){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}0${date}T00:00:00`
  }
export const StoreUIConsumer = StoresUIContext.Consumer;

export function StoresUIProvider({ storesUIEvents, children }) {
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
  
  const initStore = {
    storeId: 0,
    storeCode: "",
    storeName: "",
    address: "",
    city: "",
    pinCode: "",
    phoneNo: "",
    storeManagerName: "",
    storeManagerPhoneNo: "",
    panNo: "",
    gstno: "",
    noOfEmployees: 0,
    openingDate: null,
    closingDate: null,
    status: false,
    companyId: null,
    company: null,
    userId: null,
    entryStatus: 0,
    isReadOnly: false,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initStore,
    newStoreButtonClick: storesUIEvents.newStoreButtonClick,
    openEditStoreDialog: storesUIEvents.openEditStoreDialog,
    openDeleteStoreDialog: storesUIEvents.openDeleteStoreDialog,
    openDeleteStoresDialog: storesUIEvents.openDeleteStoreDialog,
    openFetchStoreDialog: storesUIEvents.openFetchStoreDialog,
    openUpdateStoreStatusDialog:
      storesUIEvents.openUpdateStoreStatusDialog,
  };

  return (
    <StoresUIContext.Provider value={value}>
      {children}
    </StoresUIContext.Provider>
  );
}
