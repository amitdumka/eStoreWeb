import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

//booking
//Booking

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

  const initBooking = {
    talioringBookingId: 0,
    bookingDate: new Date(),
    custName: "",
    deliveryDate: new Date(),
    tryDate: new Date(),
    bookingSlipNo: "",
    totalAmount: 0.0,
    totalQty: 0,
    shirtQty: 0,
    shirtPrice: 0.0,
    pantQty: 0,
    pantPrice: 0.0,
    coatQty: 0,
    coatPrice: 0.0,
    kurtaQty: 0,
    kurtaPrice: 0.0,
    bundiQty: 0,
    bundiPrice: 0.0,
    others: 0,
    othersPrice: 0.0,
    isDelivered: false,
    deliveries: null,
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
    initBooking,
    newBookingButtonClick: UIEvents.newBookingButtonClick,
    openEditBookingDialog: UIEvents.openEditBookingDialog,
    openDeleteBookingDialog: UIEvents.openDeleteBookingDialog,
    openDeleteBookingsDialog: UIEvents.openDeleteBookingsDialog,
    openFetchBookingsDialog: UIEvents.openFetchBookingsDialog,
    openUpdateBookingsStatusDialog: UIEvents.openUpdateBookingsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
