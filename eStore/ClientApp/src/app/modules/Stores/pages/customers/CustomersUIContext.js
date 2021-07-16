import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CustomersUIHelpers";

const CustomersUIContext = createContext();

export function useCustomersUIContext() {
  return useContext(CustomersUIContext);
}
export function getCurrentDate(separator=''){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}0${date}T00:00:00`
  }
export const CustomersUIConsumer = CustomersUIContext.Consumer;

export function CustomersUIProvider({ customersUIEvents, children }) {
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
  
  const initCustomer = {
      customerId: 0,
      firstName: "Demo",
      lastName: "Demo",
      age: 18,
      dateOfBirth: "2020-10-21T00:00:00",
      city: "Dumka",
      mobileNo: "Demo",
      gender: 0,
      noOfBills: 0,
      totalAmount: 0.0000,
      createdDate: getCurrentDate("-"),
      fullName: "Demo Demo",
      invoices: null
    
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCustomer,
    newCustomerButtonClick: customersUIEvents.newCustomerButtonClick,
    openEditCustomerDialog: customersUIEvents.openEditCustomerDialog,
    openDeleteCustomerDialog: customersUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: customersUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: customersUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog:
      customersUIEvents.openUpdateCustomersStatusDialog,
  };

  return (
    <CustomersUIContext.Provider value={value}>
      {children}
    </CustomersUIContext.Provider>
  );
}
