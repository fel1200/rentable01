import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

import React, { useEffect } from "react";
//For gradient
import { LinearGradient } from "expo-linear-gradient";
//for text gradient
import MaskedView from "@react-native-masked-view/masked-view";
//Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//colors constants
import { COLORS } from "../utils/constants";
//Styled text
import MyAppText from "../components/componentStyles/MyAppText";
//Hooks
import useApp from "../hooks/useApp";

export default function SplashScreen({ navigation }) {
  //Context global vars
  const { platform, userActive, setUserActive } = useApp();

  //Get data from async storage convert from json and then pass to the context
  useEffect(() => {
    const getUserFromStorage = async () => {
      const user = await AsyncStorage.getItem("userActive");
      console.log("user in main screen", user);
      if (user) {
        const userJson = JSON.parse(user);
        console.log("userJson", userJson);
        setUserActive(userJson);
      }
    };
    getUserFromStorage();
  }, []);

  console.log("userActive", userActive);

  //Method to go to the next screen
  const goClientsScreen = () => {
    navigation.navigate("ClientsScreen");
  };
  //Method to style the height of image depending the screen size
  const marginTopDependingScreen = () => {
    //Var to calculate the height of the window
    const windowHeight = Dimensions.get("window").height;
    if (windowHeight > 800) {
      return 120;
    } else if (windowHeight > 700) {
      return 100;
    } else if (windowHeight > 600) {
      return 90;
    } else if (windowHeight > 500) {
      return 80;
    } else {
      return 80;
    }
  };

  return (
    <View style={styles.bg}>
      <LinearGradient
        colors={[COLORS.white, COLORS.white]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          source={require("../assets/welcomeTopBar.png")}
          style={{
            width: "100%",
            height: 150,
            top: 100,
            left: 0,
            position: "absolute",
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            top: 180,
            left: 40,
            position: "absolute",
            fontSize: 32,
            color: COLORS.neutral,
          }}
          typeFont="Medium"
        >
          Bienvenido
        </Text>

        <View style={styles.mainContainer}>
          <MaskedView
            style={{ flexDirection: "row", height: 80 }}
            maskElement={
              <View
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 28, fontWeight: 600 }}>
                  Fernando Gómez Sánchez
                </Text>
              </View>
            }
          >
            <LinearGradient
              colors={["#1168C0", "#031426", "#192f6a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <View style={styles.line} />
          <Text style={styles.textSubSub}>Módulos disponibles</Text>

          <Pressable style={styles.buttonStart} onPress={goClientsScreen}>
            <Text style={styles.textButton}>Clientes</Text>
          </Pressable>
        </View>

        <Image
          source={require("../assets/rentableSmallCom.png")}
          style={{
            width: 177,
            height: 64,
            bottom: 70,
            right: 0,
            marginTop: marginTopDependingScreen(),
            position: "absolute",
          }}
          resizeMode="contain"
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,

    //
  },

  mainContainer: {
    marginTop: 270,
    width: "85%",
    marginLeft: 20,
  },
  imageBuilding: {
    width: 200,
    height: 100,
    marginTop: 50,
  },

  textMain: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary1,
    marginTop: 16,
  },
  textSubMainGradient: {
    fontSize: 28,
    fontWeight: "bold",
    //gradient text
  },
  textSubSub: {
    fontSize: 16,
    color: COLORS.disabled0,
    marginTop: 8,
    paddingRight: 90,
    alignSelf: "center",
  },

  line: {
    width: "100%",
    height: 0.3,
    backgroundColor: COLORS.disabled0,
    marginTop: 16,
  },

  buttonStart: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    width: 140,
    height: 140,
    marginRight: 20,
    //gradient button
    backgroundColor: COLORS.primary1,
    borderRadius: 8,
  },

  textButton: {
    fontSize: 24,
    color: COLORS.white,
    textAlign: "center",
  },
});
