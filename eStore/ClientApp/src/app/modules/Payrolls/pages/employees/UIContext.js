import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

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

  const initEmployee = {
    employeeId: 0,
    firstName: "",
    lastName: "",
    staffName: "",
    mobileNo: "",
    joiningDate: new Date(),
    leavingDate: null,
    isWorking: false,
    category: 0,
    isTailors: false,
    eMail: "",
    dateOfBirth: new Date(),
    adharNumber: "",
    panNo: "",
    otherIdDetails: "",
    address: "",
    city: "",
    state: "J",
    fatherName: "",
    highestQualification: "",
    salesmen: null,
    attendances: null,
    user: null,
    storeId: 1,
    store: null,
    userId: "WenUI",
    entryStatus: 0,
    isReadOnly: false,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initEmployee,
    newEmployeeButtonClick: UIEvents.newEmployeeButtonClick,
    openEditEmployeeDialog: UIEvents.openEditEmployeeDialog,
    openDeleteEmployeeDialog: UIEvents.openDeleteEmployeeDialog,
    openDeleteEmployeesDialog: UIEvents.openDeleteEmployeesDialog,
    openFetchEmployeesDialog: UIEvents.openFetchEmployeesDialog,
    openUpdateEmployeesStatusDialog: UIEvents.openUpdateEmployeesStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
