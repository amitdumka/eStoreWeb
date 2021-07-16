import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UIHelpers";

//contact
//Contact
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

  const initContact = {
    contactId: 0,
    firstName: "",
    lastName: "",
    mobileNo: "",
    phoneNo: null,
    eMailAddress: null,
    remarks: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initContact,
    newContactButtonClick: UIEvents.newContactButtonClick,
    openEditContactDialog: UIEvents.openEditContactDialog,
    openDeleteContactDialog: UIEvents.openDeleteContactDialog,
    openDeleteContactsDialog: UIEvents.openDeleteContactsDialog,
    openFetchContactsDialog: UIEvents.openFetchContactsDialog,
    openUpdateContactsStatusDialog: UIEvents.openUpdateContactsStatusDialog,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
