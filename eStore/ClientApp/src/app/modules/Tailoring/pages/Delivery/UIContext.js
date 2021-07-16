import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//Delivery
//delivery
//Deliveries
//deliveries

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
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

  const initDelivery = {
    talioringDeliveryId: 0,
    deliveryDate: new Date(),
    talioringBookingId: 0,
    booking: null,
    invNo: "",
    amount: 0.0,
    remarks: "",
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
    initDelivery,
    newDeliveryButtonClick: UIEvents.newDeliveryButtonClick,
    openEditDeliveryDialog: UIEvents.openEditDeliveryDialog,
    openDeleteDeliveryDialog: UIEvents.openDeleteDeliveryDialog,
    openDeleteDeliveriesDialog: UIEvents.openDeleteDeliveriesDialog,
    openFetchDeliveriesDialog: UIEvents.openFetchDeliveriesDialog,
    openUpdateDeliveriesStatusDialog: UIEvents.openUpdateDeliveriesStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
