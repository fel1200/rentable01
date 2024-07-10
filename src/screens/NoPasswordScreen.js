import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
//colors constants
import { COLORS } from "../utils/constants";
//Styled text
import MyAppText from "../components/componentStyles/MyAppText";
//Hooks
import useApp from "../hooks/useApp";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

export default function SplashScreen({ navigation }) {
  //Context global vars
  const { platform } = useApp();

  //Method to go to the next screen
  const goCreatePasswordScreen = () => {
    navigation.navigate("CreatePassword");
  };

  const goSplashScreen = () => {
    navigation.navigate("Splash");
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
      <Pressable
        style={styles.backPressable}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrowleft" size={30} color={COLORS.primary1} />
      </Pressable>

      <Image
        source={require("../assets/rentableSmallCom.png")}
        style={{
          width: 197,
          height: 74,
          marginLeft: 16,
          marginTop: marginTopDependingScreen(),
          alignSelf: "center",
        }}
      />
      <Image
        source={require("../assets/noPassword.png")}
        style={{
          width: 137,
          height: 174,
          marginTop: marginTopDependingScreen(),
          alignSelf: "center",
        }}
      />
      <View style={styles.line} />
      <ScrollView contentContainerStyle={styles.grow} style={styles.scrollView}>
        <View style={styles.contentScroll}>
          <View style={styles.contentScrollCenter}>
            <Text style={styles.textWelcomeBold} typeFont="Medium">
              Registro y recuperación
            </Text>
            <Text style={styles.textWelcomeLight} typeFont="Medium">
              Instrucciones
            </Text>
            <Text style={styles.textInstructions} typeFont="Medium">
              Si aún no estás registrado o tu contraseña no funciona, favor de
              contactar al administrador de filemaker para realizar el registro
              reestablecimiento de la contraseña
            </Text>
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
    alignItems: "center",
    paddingTop: StatusBar.currentHeight + 52,
    backgroundColor: COLORS.neutral,
  },
  backPressable: {
    alignSelf: "flex-start",
    marginLeft: 8,
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
    justifyContent: "center",
  },

  textWelcomeBold: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary1,
    marginTop: 16,
    textAlign: "center",
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
    marginTop: 32,
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
    height: 80,
  },

  grow: {
    marginTop: 8,
    flexGrow: 1,
  },
});
