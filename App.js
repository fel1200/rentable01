import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation/Navigation";
//For context and get general data independent of the screen
import { AppProvider } from "./src/context/AppContext";

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Navigation />
      </AppProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
