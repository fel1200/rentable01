import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Dimensions,
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
  const goMediumScreen = () => {
    navigation.navigate("Login");
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
      <Image
        source={require("../assets/splashImage.png")}
        style={{
          width: 317,
          height: 384,
          marginTop: marginTopDependingScreen(),
        }}
      />
      <Text style={styles.textMain} typeFont="Medium">
        Somos Rentable
      </Text>
      <Text style={styles.textSubMain} typeFont="Medium">
        Tu marca en los mejores lugares
      </Text>

      <Pressable style={styles.buttonStart} onPress={goMediumScreen}>
        <Text style={styles.textButton}>Iniciar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.neutral,
    alignItems: "center",
  },
  textMain: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primary1,
    marginTop: 16,
  },
  textSubMain: {
    marginTop: 8,
    fontSize: 24,
    color: COLORS.secondary2,
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
});
