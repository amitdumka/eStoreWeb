import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

//purchaseTax
//PurchaseTax

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

  const initPurchaseTax = {
    purchaseItemId: 0,
    taxName: "",
    taxType: 0,
    compositeRate: 0.0,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initPurchaseTax,
    newPurchaseTaxButtonClick: UIEvents.newPurchaseTaxButtonClick,
    openEditPurchaseTaxDialog: UIEvents.openEditPurchaseTaxDialog,
    openDeletePurchaseTaxDialog: UIEvents.openDeletePurchaseTaxDialog,
    openDeletePurchaseTaxesDialog: UIEvents.openDeletePurchaseTaxesDialog,
    openFetchPurchaseTaxesDialog: UIEvents.openFetchPurchaseTaxesDialog,
    openUpdatePurchaseTaxesStatusDialog:
      UIEvents.openUpdatePurchaseTaxesStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
