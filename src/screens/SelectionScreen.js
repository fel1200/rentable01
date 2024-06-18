import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
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
  const goCreatePasswordScreen = () => {
    navigation.navigate("CreatePassword");
  };

  //Method to go to the next screen
  const goLoginScreen = () => {
    navigation.navigate("Login");
  };

  //Method to style the height of image depending the screen size
  const marginTopDependingScreen = () => {
    //Var to calculate the height of the window
    const windowHeight = Dimensions.get("window").height;
    console.log("windowHeight", windowHeight);
    if (windowHeight > 800) {
      return 50;
    } else if (windowHeight > 700) {
      return 40;
    } else if (windowHeight > 600) {
      return 30;
    } else if (windowHeight > 500) {
      return 30;
    } else {
      return 30;
    }
  };

  return (
    <View style={styles.bg}>
      <Image
        source={require("../assets/rentableSmallCom.png")}
        style={{
          width: 117,
          height: 44,
          marginLeft: 16,
          marginTop: marginTopDependingScreen(),
          alignSelf: "left",
        }}
      />
      <Image
        source={require("../assets/buildings.png")}
        style={{
          width: 217,
          height: 144,
          marginTop: marginTopDependingScreen(),
          alignSelf: "center",
        }}
      />
      <View style={styles.line} />
      <ScrollView contentContainerStyle={styles.grow} style={styles.scrollView}>
        <View style={styles.contentScroll}>
          <View style={styles.contentScrollCenter}>
            <Text style={styles.textWelcomeBold} typeFont="Medium">
              Hola
            </Text>
            <Text style={styles.textWelcomeLight} typeFont="Medium">
              Bienvenido a Rentable management
            </Text>
            <Text style={styles.textInstructions} typeFont="Medium">
              Para usar la app, necesitas estar registrado previamente en el
              sistema filemaker y después crear la contraseña de la app aquí
            </Text>

            <Pressable
              style={styles.buttonCreatePassword}
              onPress={goCreatePasswordScreen}
            >
              <View style={styles.boxTitleLogin}>
                <View style={styles.leftSideBoxTitleLogin}>
                  <Image
                    source={require("../assets/passwordGenericBlue.png")}
                    style={{
                      width: 34,
                      height: 34,
                    }}
                  />
                </View>
                <View style={styles.rightSideBoxTitleLogin}>
                  <Text style={styles.textSubMain}>Crea tu contraseña</Text>
                </View>
              </View>
            </Pressable>

            <Text
              //create style specific of marginTop and from styles.textInstructions
              style={[styles.textInstructions, { marginTop: 32 }]}
              typeFont="Medium"
            >
              Después inicia sesión
            </Text>
            <Pressable onPress={goLoginScreen}>
              <View
                style={[
                  { backgroundColor: COLORS.primary1 },
                  styles.boxTitleLogin,
                ]}
              >
                <View style={styles.leftSideBoxTitleLogin}>
                  <Image
                    source={require("../assets/userGeneric.png")}
                    style={{
                      width: 34,
                      height: 34,
                    }}
                  />
                </View>
                <View style={styles.rightSideBoxTitleLogin}>
                  <Text style={styles.textButtonLogin}> Iniciar sesión </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.neutral,
    alignItems: "center",
  },
  line: {
    width: "85%",
    height: 0.5,
    backgroundColor: COLORS.disabled2,
    marginTop: 16,
  },

  contentScroll: {
    width: "100%",
    alignItems: "center",
  },

  contentScrollCenter: {
    width: "80%",
    alignItems: "center",
  },

  textWelcomeBold: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.secondary2,
    marginTop: 16,
  },

  textWelcomeLight: {
    marginTop: 8,
    fontSize: 16,
    color: COLORS.disabled0,
    textAlign: "center",
  },

  textInstructions: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.disabled0,
    textAlign: "center",
  },
  boxTitleLogin: {
    marginTop: 16,
    width: 250,
    height: 60,
    borderRadius: 12,
    flexDirection: "row",
    borderColor: COLORS.primary1,
    borderWidth: 2,
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

  textSubMain: {
    fontSize: 16,
    color: COLORS.primary1,
    marginRight: 28,
  },

  buttonLogin: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 48,
    borderRadius: 8,
    borderColor: COLORS.primary1,
    borderWidth: 1,
    //Color of the text in button
    backgroundColor: COLORS.primary1,
  },

  textButtonLogin: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },

  textMain: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primary1,
    marginTop: 16,
  },

  buttonStart: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary1,
  },

  textButton: {
    fontSize: 24,
    color: COLORS.white,
    textAlign: "center",
  },

  scrollView: {
    flex: 1,
    width: "100%",
  },

  grow: {
    marginTop: 8,
    flexGrow: 1,
  },
});
