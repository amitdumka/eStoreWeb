import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

//ledgerType
//LedgerType

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

  const initLedgerType = {
    ledgerTypeId: 0,
    ledgerNameType: "",
    category: 0,
    remark: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initLedgerType,
    newLedgerTypeButtonClick: UIEvents.newLedgerTypeButtonClick,
    openEditLedgerTypeDialog: UIEvents.openEditLedgerTypeDialog,
    openDeleteLedgerTypeDialog: UIEvents.openDeleteLedgerTypeDialog,
    openDeleteLedgerTypesDialog: UIEvents.openDeleteLedgerTypesDialog,
    openFetchLedgerTypesDialog: UIEvents.openFetchLedgerTypesDialog,
    openUpdateLedgerTypesStatusDialog:
      UIEvents.openUpdateLedgerTypesStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
