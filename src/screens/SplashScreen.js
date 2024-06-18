import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

import React from "react";
//For gradient
import { LinearGradient } from "expo-linear-gradient";
//for text gradient
import MaskedView from "@react-native-masked-view/masked-view";
//colors constants
import { COLORS } from "../utils/constants";
//Styled text
import MyAppText from "../components/componentStyles/MyAppText";
//Hooks
import useApp from "../hooks/useApp";

export default function SplashScreen({ navigation }) {
  //Context global vars
  const { platform } = useApp();

  //Method to go to the next screen
  const goMediumScreen = () => {
    navigation.navigate("Selection");
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
        colors={[COLORS.white, COLORS.primary4]}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/rentableOnly.png")}
          style={{
            width: 147,
            height: 64,
            top: 0,
            left: 20,
            marginTop: marginTopDependingScreen(),
            position: "absolute",
          }}
          resizeMode="contain"
        />

        <Image
          source={require("../assets/cubo1.png")}
          style={{
            width: 177,
            height: 64,
            top: 0,
            right: -60,
            marginTop: marginTopDependingScreen(),
            position: "absolute",
          }}
          resizeMode="contain"
        />
        <View style={styles.mainContainer}>
          <Image
            source={require("../assets/buildings2.png")}
            style={styles.imageBuilding}
          />

          <Text style={styles.textMain} typeFont="Medium">
            Bienvenido
          </Text>

          <MaskedView
            style={{ flexDirection: "row", height: 80 }}
            maskElement={
              <View
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 32, fontWeight: 600 }}>Rentable</Text>
                <Text style={{ fontSize: 32, fontWeight: 600 }}>
                  Management
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

          <Text style={styles.textSubSub}>
            Administración de espectaculares y vallas contratadas
          </Text>

          <Pressable style={styles.buttonStart} onPress={goMediumScreen}>
            <Text style={styles.textButton}>Iniciar</Text>
          </Pressable>
        </View>

        <Image
          source={require("../assets/cubo2.png")}
          style={{
            width: 177,
            height: 64,
            bottom: 70,
            left: 0,
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
    alignItems: "center",
    //
  },

  mainContainer: {
    marginTop: 250,
    width: "85%",
  },
  imageBuilding: {
    width: 200,
    height: 100,
    marginTop: 50,
  },

  textMain: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary1,
    marginTop: 16,
  },
  textSubMainGradient: {
    fontSize: 32,
    fontWeight: "bold",
    //gradient text
  },
  textSubSub: {
    fontSize: 16,
    color: COLORS.disabled0,
    marginTop: 8,
    paddingRight: 90,
  },

  buttonStart: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    width: 140,
    height: 140,
    borderRadius: 100,
    marginRight: 20,
    backgroundColor: COLORS.primary1,
  },

  textButton: {
    fontSize: 24,
    color: COLORS.white,
    textAlign: "center",
  },
});
