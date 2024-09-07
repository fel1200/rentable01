import React, { useState, createContext, Platform, useEffect } from "react";
//import for expo secure storage
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [userActive, setUserActive] = useState(undefined);

  const [typeOfUser, setTypeOfUser] = useState(undefined);

  const [modeActive, setModeActive] = useState("light");

  const [tokensOpened, setTokensOpened] = useState([]);

  console.log("isSignedIn", isSignedIn);
  //get and set isSignedIn from storage
  useEffect(() => {
    AsyncStorage.getItem("isSignedIn").then((value) => {
      setIsSignedIn(value);
    });
  }, []);

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
    isSignedIn,
    setIsSignedIn,
    userActive,
    setUserActive,
    typeOfUser,
    setTypeOfUser,
    modeActive,
    setModeActive,
  };
  return (
    <AppContext.Provider value={valueContext}>{children}</AppContext.Provider>
  );
}
