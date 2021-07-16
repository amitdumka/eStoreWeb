import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//SaleTax
//saleTax
//SaleTaxes
//saleTaxes

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

  const initSaleTax = {
    saleTaxTypeId: 0,
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
    initSaleTax,
    newSaleTaxButtonClick: UIEvents.newSaleTaxButtonClick,
    openEditSaleTaxDialog: UIEvents.openEditSaleTaxDialog,
    openDeleteSaleTaxDialog: UIEvents.openDeleteSaleTaxDialog,
    openDeleteSaleTaxesDialog: UIEvents.openDeleteSaleTaxesDialog,
    openFetchSaleTaxesDialog: UIEvents.openFetchSaleTaxesDialog,
    openUpdateSaleTaxesStatusDialog: UIEvents.openUpdateSaleTaxesStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
