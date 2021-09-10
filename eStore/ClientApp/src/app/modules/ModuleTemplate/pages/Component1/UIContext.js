//Note : No Changes are required in this function.
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter, initDataModel } from "./UIHelpers";

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

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initDataModel,
    newButtonClick: UIEvents.newButtonClick,
    openEditDialog: UIEvents.openEditDialog,
    openDeleteDialog: UIEvents.openDeleteDialog,
    openDeletesDialog: UIEvents.openDeletesDialog,
    openFetchDialog: UIEvents.openFetchDialog,
    openUpdateStatusDialog: UIEvents.openUpdateStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
