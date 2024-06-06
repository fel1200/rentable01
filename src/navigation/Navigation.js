import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Screens to navigate to
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import ClientsScreen from "../screens/ClientsScreen";
import CPSScreen from "../screens/CPSScreen";
import PromoScreen from "../screens/PromoScreen";
import WorksScreen from "../screens/WorksScreen";
import ImageFullScreen from "../screens/ImageFullScreen";

const Stack = createNativeStackNavigator();

//Navigation screens
export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Start"
        component={SplashScreen}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Clients" component={ClientsScreen} />
      <Stack.Screen name="CPS" component={CPSScreen} />
      <Stack.Screen name="Promos" component={PromoScreen} />
      <Stack.Screen name="Works" component={WorksScreen} />
      <Stack.Screen name="ImageFullScreen" component={ImageFullScreen} />
    </Stack.Navigator>
  );
}
