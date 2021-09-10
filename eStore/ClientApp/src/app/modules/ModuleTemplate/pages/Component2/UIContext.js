import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//RentedLocation
//rentedLocation

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

  const initRentedLocation = {
    rentedLocationId: 0,
    placeName: "",
    address: "",
    onDate: new Date(),
    vacatedDate:"",
    city: "",
    ownerName: "",
    mobileNo: "",
    rentAmount: 0.0,
    advanceAmount: 0.0,
    isRented: false,
    rentType: 0,
    storeId: 1,
    store: null,
    userId: "WebUI",
    isReadOnly: false,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initRentedLocation,
    newRentedLocationButtonClick: UIEvents.newRentedLocationButtonClick,
    openEditRentedLocationDialog: UIEvents.openEditRentedLocationDialog,
    openDeleteRentedLocationDialog: UIEvents.openDeleteRentedLocationDialog,
    openDeleteRentedLocationsDialog: UIEvents.openDeleteRentedLocationsDialog,
    openFetchRentedLocationsDialog: UIEvents.openFetchRentedLocationsDialog,
    openUpdateRentedLocationsStatusDialog:
      UIEvents.openUpdateRentedLocationsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
