import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import React, { useEffect, useState } from "react";
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
  const { platform, userActive, setUserActive, clientActive, setClientActive } =
    useApp();

  const [textButtonModule, setTextButtonModule] = useState("");
  //Get data from async storage convert from json and then pass to the context
  // useEffect(() => {
  //   const getUserFromStorage = async () => {
  //     //const user = await AsyncStorage.getItem("userActive");
  //     console.log("user in main screen", userActive);
  //     // if (user) {
  //     //   const userJson = JSON.parse(user);
  //     //   console.log("userJson", userJson);
  //     //   setUserActive(userJson);
  //     // }
  //   };
  //   getUserFromStorage();
  // }, [userActive]);

  // console.log("userActive", userActive);
  console.log("userActive", userActive);

  //Method to go to the next screen
  const goNextScreen = () => {
    if (userActive !== null && userActive !== undefined) {
      if (userActive[0]?.fieldData?.Soc_AppOption === 0) {
        navigation.navigate("ClientsScreen");
      } else if (userActive[0]?.fieldData?.Soc_AppOption === 1) {
        //Create an object to store clientActive and pass to context
        const clientActiveToContext = {
          fieldData: {
            Soc_PK: userActive[0]?.fieldData?.Soc_PK,
            Soc_Denominacion: userActive[0]?.fieldData?.Soc_Denominacion,
          },
        };
        setClientActive(clientActiveToContext);
        navigation.navigate("CPS");
      } else {
        navigation.navigate("CPS");
      }
    }
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

  //Method to get the text of the button depending the user
  useEffect(() => {
    const textForModule = getTextButton();
    setTextButtonModule(textForModule);
  }, [userActive]);

  const getTextButton = () => {
    if (userActive !== null && userActive !== undefined) {
      console.log("Entró a consultar el texto de userActive");
      if (userActive[0]?.fieldData?.Soc_AppOption === 0) {
        return "Clientes";
      } else if (userActive[0]?.fieldData?.Soc_AppOption === 1) {
        return "Contratos de Prestación de Servicios";
      } else {
        return "Contratos de Prestación de Servicios";
      }
    }
    return "";
  };

  const logout = () => {
    if (userActive !== null && userActive !== undefined) {
      // navigation.goBack();
      navigation.navigate("Login");
    } else {
      navigation.navigate("Login");
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
          <View style={styles.userInfo}>
            <MaskedView
              style={{ flexDirection: "row", height: 80 }}
              maskElement={
                <View
                  style={{
                    backgroundColor: "transparent",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: 600 }}>
                    {userActive
                      ? userActive[0]?.fieldData?.Soc_Denominacion
                      : "Usuario"}
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
          </View>
          <View style={styles.logoutSection}>
            <Pressable style={styles.boxTitleLogin} onPress={() => logout()}>
              <View style={styles.leftSideBoxTitleLogin}>
                <Image
                  source={require("../assets/logout.png")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
              <View style={styles.rightSideBoxTitleLogin}>
                <Text style={styles.textSubMain} typeFont="Medium">
                  Cerrar sesión
                </Text>
              </View>
            </Pressable>
          </View>

          <View style={styles.line} />
          <Text style={styles.textSubSub}>Módulos disponibles</Text>

          <ScrollView style={styles.scroll}>
            <View style={styles.modules}>
              <Pressable style={styles.cardClients} onPress={goNextScreen}>
                <Text style={styles.textButton}>{textButtonModule}</Text>
              </Pressable>
            </View>
          </ScrollView>
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
  textSubMain: {
    fontSize: 12,
    color: COLORS.disabled0,
    marginRight: 28,
  },

  textSubMainGradient: {
    fontSize: 28,
    fontWeight: "bold",
    //gradient text
  },
  textSubSub: {
    width: "100%",
    fontSize: 20,

    color: COLORS.secondary3,
    marginTop: 8,
    textAlign: "center",
  },
  line: {
    width: "100%",
    height: 0.3,
    backgroundColor: COLORS.disabled0,
    marginTop: 16,
  },

  cardClients: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    width: 140,
    height: 140,
    //gradient button
    backgroundColor: COLORS.primary23,
    borderRadius: 8,
  },

  textButton: {
    fontSize: 20,
    color: COLORS.primary1,
    textAlign: "center",
  },
  logoutSection: {
    flexDirection: "row",
    marginTop: -40,
    marginRight: 4,
    justifyContent: "flex-start",
  },

  boxTitleLogin: {
    height: 40,
    borderRadius: 4,
    backgroundColor: COLORS.neutral,
    width: 150,
    flexDirection: "row",
  },

  leftSideBoxTitleLogin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  rightSideBoxTitleLogin: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    marginTop: 16,
    height: 200,
  },
  modules: {
    flexDirection: "row",
    justifyContent: "center",
  },

  imageLogin: {
    alignItems: "center",
    marginTop: 32,
    zIndex: -1,
  },
});
