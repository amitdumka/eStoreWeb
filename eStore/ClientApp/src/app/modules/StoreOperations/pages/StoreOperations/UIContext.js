import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//StoreOperation

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export const UIConsumer = UIContext.Consumer;

export function UIProvider({ UIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const [idHs, setIdHs] = useState([]);
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

  const initOpen = {
    storeOpenId: 0,
    storeId: 1,
    remarks: "",
    OpenningTime: new Date(),
    store: null,
    userId: "WebUI",
    isReadOnly: false,
  };
  const initClose = {
    storeCloseId: 0,
    storeId: 1,
    remarks: "",
    closingDate: new Date(),
    store: null,
    userId: "WebUI",
    isReadOnly: false,
  };

  const initHoliday = {
    storeHolidayId: 0,
    userId: "WebUI",
    storeId: 1,
    store: null,
    entryStatus: 0,
    isReadOnly: false,
    onDate: new Date(),
    reason: 0,
    remark: "",
    approvedBY: "",
  };

  const initData = {
    storeHolidayId: 0,
    userId: "WebUI",
    entryStatus: 0,
    isReadOnly: false,
    storeId: 1,
    onDate: new Date(),
    reason: 0,
    remarks: "",
    approvedBy: "",
    endDate: null,
    nDays: false,
  };

  const initStoreClosed = {
    storeHolidayId: 0,
    userId: "WebUI",
    entryStatus: 0,
    isReadOnly: false,
    storeId: 1,
    onDate: new Date(),
    reason: 0,
    remarks: "",
    approvedBy: "",
  };

  const initNHolidays = {
    holiday: null,
    endDate: null,
  };
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    idHs,
    setIdHs,
    setQueryParams,
    initNHolidays,
    initStoreClosed,
    initData,
    initOpen,
    initClose,
    initHoliday,
    newButtonOpenClick: UIEvents.newButtonOpenClick,
    openEditOpenDialog: UIEvents.openEditOpenDialog,
    openDeleteOpenDialog: UIEvents.openDeleteOpenDialog,
    openDeleteOpensDialog: UIEvents.openDeleteOpensDialog,
    openFetchOpenDialog: UIEvents.openFetchOpenDialog,
    openUpdateOpenStatusDialog: UIEvents.openUpdateOpenStatusDialog,

    newButtonCloseClick: UIEvents.newButtonCloseClick,
    openEditCloseDialog: UIEvents.openEditCloseDialog,
    openDeleteCloseDialog: UIEvents.openDeleteCloseDialog,
    openDeleteClosesDialog: UIEvents.openDeleteClosesDialog,
    openFetchCloseDialog: UIEvents.openFetchCloseDialog,
    openUpdateCloseStatusDialog: UIEvents.openUpdateCloseStatusDialog,

    newButtonHolidayClick: UIEvents.newButtonHolidayClick,
    openEditHolidayDialog: UIEvents.openEditHolidayDialog,
    openDeleteHolidayDialog: UIEvents.openDeleteHolidayDialog,
    openDeleteHolidaysDialog: UIEvents.openDeleteHolidaysDialog,
    openFetchHolidayDialog: UIEvents.openFetchHolidayDialog,
    openUpdateHolidayStatusDialog: UIEvents.openUpdateHolidayStatusDialog,

    newButtonStoreClosedClick: UIEvents.newButtonStoreClosedClick,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
