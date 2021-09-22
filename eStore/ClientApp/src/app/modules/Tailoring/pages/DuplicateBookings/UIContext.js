import React, { createContext, useContext, useState } from "react";


const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

//Booking

export const UIConsumer = UIContext.Consumer;

export function UIProvider({ UIEvents, children }) {
  const [ids, setIds] = useState([]);


  const value = {
    ids,
    setIds,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
