import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Data from context to check if is signed in
import useApp from "../hooks/useApp";

import AsyncStorage from "@react-native-async-storage/async-storage";

//Screens to navigate to
import SplashScreen from "../screens/SplashScreen";
import SelectionScreen from "../screens/SelectionScreen";
import CreatePasswordScreen from "../screens/CreatePasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import ClientsScreen from "../screens/ClientsScreen";
import CPSScreen from "../screens/CPSScreen";
import PromoScreen from "../screens/PromoScreen";
import WorksScreen from "../screens/WorksScreen";
import ImageFullScreen from "../screens/ImageFullScreen";
import NoPasswordScreen from "../screens/NoPasswordScreen";
import MainScreen from "../screens/MainScreen";
import { set } from "react-hook-form";

const Stack = createNativeStackNavigator();

//Navigation screens
export default function Navigation() {
  //Getting data from context
  //const { isSignedIn } = useApp();
  //Best having from storage because useApp has a delay
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userActive, setUserActive, typeOfUser, setTypeOfUser } = useApp();

  useEffect(() => {
    AsyncStorage.getItem("isSignedIn").then((value) => {
      console.log("value isSignedIn", value);
      setIsSignedIn(value === "true");
      if (value !== null && value === "true") {
        //Then check if there is a sesion in storage
        AsyncStorage.getItem("sessionData").then((valueSession) => {
          console.log("valueSession", valueSession);
          if (valueSession !== null) {
            const valueSessionJson = JSON.parse(valueSession);
            //Check if the date is more than 2 days, then close the session
            const dateSession = new Date(valueSessionJson.dateSession);
            const dateNow = new Date();
            const diffTime = Math.abs(dateNow - dateSession);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log("diffTime", diffTime);
            console.log("diffDays", diffDays);
            if (diffDays > 2) {
              // if (diffTime > 1000) {   //Just for testing signout automatically
              AsyncStorage.removeItem("sessionData");
              setUserActive(null);
              setTypeOfUser("");
              setIsSignedIn(false);
              setLoading(false);
              return;
            }
            console.log("valueSessionJson", valueSessionJson);
            setUserActive(JSON.parse(valueSession).user);
            setTypeOfUser(JSON.parse(valueSession).typeOfUser);
            setLoading(false);
          } else {
            setUserActive(null);
            setTypeOfUser("");
            setIsSignedIn(false);
            setLoading(false);
          }
        });
      } else {
        setUserActive(null);
        setTypeOfUser("");
        setIsSignedIn(false);
        setLoading(false);
      }
    });
  }, []);

  // console.log("isSignedIn", isSignedIn);
  // console.log("loading", loading);

  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isSignedIn ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="ClientsScreen" component={ClientsScreen} />

            <Stack.Screen name="CPS" component={CPSScreen} />
            <Stack.Screen name="Promo" component={PromoScreen} />
            <Stack.Screen name="Works" component={WorksScreen} />
            <Stack.Screen name="ImageFullScreen" component={ImageFullScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Selection" component={SelectionScreen} />
            <Stack.Screen
              name="CreatePassword"
              component={CreatePasswordScreen}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="NoPassword" component={NoPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Selection" component={SelectionScreen} />
            <Stack.Screen
              name="CreatePassword"
              component={CreatePasswordScreen}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="NoPassword" component={NoPasswordScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="ClientsScreen" component={ClientsScreen} />
            <Stack.Screen name="CPS" component={CPSScreen} />
            <Stack.Screen name="Promo" component={PromoScreen} />
            <Stack.Screen name="Works" component={WorksScreen} />
            <Stack.Screen name="ImageFullScreen" component={ImageFullScreen} />
          </>
        )}
      </Stack.Navigator>
    );
  }
}
