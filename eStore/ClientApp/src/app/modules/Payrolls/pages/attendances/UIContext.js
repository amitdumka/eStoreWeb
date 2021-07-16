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

  const initAttendance = {
    attendanceId: 0,
    employeeId: 0,
    employee: null,
    attDate: new Date(),
    entryTime: "",
    status: 0,
    remarks: "",
    isTailoring: false,
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
    initAttendance,
    newAttendanceButtonClick: UIEvents.newAttendanceButtonClick,
    openEditAttendanceDialog: UIEvents.openEditAttendanceDialog,
    openDeleteAttendanceDialog: UIEvents.openDeleteAttendanceDialog,
    openDeleteAttendancesDialog: UIEvents.openDeleteAttendancesDialog,
    openFetchAttendancesDialog: UIEvents.openFetchAttendancesDialog,
    openUpdateAttendancesStatusDialog:
      UIEvents.openUpdateAttendancesStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
