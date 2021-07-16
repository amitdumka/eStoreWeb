import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//Party
//party
//Parties
//parties

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

  const initParty = {
    partyId: 0,
    partyName: "",
    openningDate: new Date(),
    openningBalance: 0.0,
    address: "",
    panNo: "",
    gstNo: "",
    ledgerTypeId: 0,
    ledgerType: null,
    ledgerMaster: null,
    ledgers: null,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initParty,
    newPartyButtonClick: UIEvents.newPartyButtonClick,
    openEditPartyDialog: UIEvents.openEditPartyDialog,
    openDeletePartyDialog: UIEvents.openDeletePartyDialog,
    openDeletePartiesDialog: UIEvents.openDeletePartiesDialog,
    openFetchPartiesDialog: UIEvents.openFetchPartiesDialog,
    openUpdatePartiesStatusDialog: UIEvents.openUpdatePartiesStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
