import React, { useState, createContext, Platform } from "react";

export const AppContext = createContext({
  //General data to be used in the app
  //   stateApp: undefined,
  //   municipalityApp: undefined,
  //   clinicApp: undefined,
  //   userApp: undefined,
  // Default android
  platform: "",
});

export function AppProvider(props) {
  const { children } = props;
  //"global" data
  const [clientActive, setClientActive] = useState(undefined);
  const [CPSActive, setCPSActive] = useState(undefined);
  const [promoActive, setPromoActive] = useState(undefined);
  const [imageURLActive, setImageURLActive] = useState(undefined);

  const [platform, setPlatform] = useState("iOS");
  const valueContext = {
    clientActive,
    setClientActive,
    CPSActive,
    setCPSActive,
    promoActive,
    setPromoActive,
    imageURLActive,
    setImageURLActive,
  };
  return (
    <AppContext.Provider value={valueContext}>{children}</AppContext.Provider>
  );
}
