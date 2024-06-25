import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Data from context to check if is signed in
import useApp from "../hooks/useApp";

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
import TabScreenExample from "../screens/TabScreenExample";

const Stack = createNativeStackNavigator();

//Navigation screens
export default function Navigation() {
  //Getting data from context
  const { isSignedIn } = useApp();
  console.log("isSignedIn", isSignedIn);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isSignedIn ? (
        <>
          {/* <Stack.Screen name="Tab" component={TabScreenExample} /> */}
          <Stack.Screen name="Clients" component={ClientsScreen} />
          <Stack.Screen name="CPS" component={CPSScreen} />
          <Stack.Screen name="Promo" component={PromoScreen} />
          <Stack.Screen name="Works" component={WorksScreen} />
          <Stack.Screen name="ImageFullScreen" component={ImageFullScreen} />
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
        </>
      )}
    </Stack.Navigator>
  );
}
