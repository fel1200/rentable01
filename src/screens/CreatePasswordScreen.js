import {
  View,
  Image,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

// import AsyncStorage from "@react-native-async-storage/async-storage";

//We use dropdown picker for lists
// import DropDownPicker from "react-native-dropdown-picker";
//Global context
import useApp from "../hooks/useApp";
//Constants for the colors
import { COLORS } from "../utils/constants";
//Components
import CreatePasswordForm from "../components/CreatePasswordForm";

//Customized text
import MyAppText from "../components/componentStyles/MyAppText";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

export default function CreatePasswordScreen({ navigation }) {
  //Getting data from context
  const {} = useApp();

  //Handling errors in api
  const [errorApi, setErrorApi] = useState(undefined);

  //Var to check if there is internet connection
  const [isConnected, setIsConnected] = useState();

  //Check if there is internet connection
  useEffect(() => {
    (async () => {
      const isConnectedCheck = await checkInternetConnection();
      //setIsConnected(isConnectedCheck);
    })();
  }, []);

  //Method to check internet connection
  const checkInternetConnection = async () => {
    try {
      const response = await fetch("https://www.google.com");
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const goToMainScreen = () => {
    navigation.navigate("Main");
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
    <KeyboardAvoidingView style={styles.bg} behavior="padding">
      <View style={styles.titleScreen}>
        <Pressable
          style={styles.backPressable}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowleft" size={30} color={COLORS.primary1} />
        </Pressable>
        {/* <Text style={styles.textTitle}>Inicia sesión</Text> */}
      </View>
      <View style={styles.titleLogin}>
        <View style={styles.boxTitleLogin}>
          <View style={styles.leftSideBoxTitleLogin}>
            <Image
              source={require("../assets/passwordGenericWhite.png")}
              style={{
                width: 34,
                height: 34,
              }}
            />
          </View>
          <View style={styles.rightSideBoxTitleLogin}>
            <Text style={styles.textSubMain} typeFont="Medium">
              Crea tu contraseña
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.imageLogin}>
          <Image
            source={require("../assets/passwordImage.png")}
            style={{
              width: 146,
              height: 160,
            }}
            resizeMethod="contain"
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.grow}
          style={styles.scrollView}
        >
          <CreatePasswordForm nav={navigation} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 52,
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  mainContainer: {
    marginTop: 12,
    alignItems: "center",
    alignSelf: "center",
    width: "85%",
    height: 600,
    backgroundColor: COLORS.disabled4,
    //effects shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  titleScreen: {
    flexDirection: "row",
    height: 40,
    width: "100%",
  },
  backPressable: {
    alignSelf: "flex-start",
    marginLeft: 8,
  },

  titleLogin: {
    alignItems: "center",
    height: 60,
    width: "100%",
  },
  boxTitleLogin: {
    width: 250,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.primary1,
    flexDirection: "row",
    // borderWidth: 2,
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

  imageLogin: {
    alignItems: "center",
    marginTop: 32,
    height: 171,
    zIndex: -1,
  },

  headContainer: {
    flex: 2,
    marginTop: StatusBar.currentHeight + 86,
    alignItems: "center",
    justifyContent: "center",
  },
  selectUserContainer: {
    flex: 6,
    marginTop: 8,
    alignItems: "center",
  },
  textSubMain: {
    fontSize: 18,
    color: COLORS.white,
    marginRight: 22,
  },

  scrollView: {
    //effects
  },

  grow: {
    marginTop: 8,
    flexGrow: 1,
  },
});
