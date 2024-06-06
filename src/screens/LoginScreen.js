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
import LoginForm from "../components/LoginForm";

//Customized text
import MyAppText from "../components/componentStyles/MyAppText";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

export default function LoginScreen({ navigation }) {
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

  const onPressLogin = () => {
    let userComplete;
    //Checking textinputname, lastname and lastname2 are not empty
    if (
      inputName === "" ||
      inputLastName === "" ||
      inputLastName2 === "" ||
      inputName === undefined ||
      inputLastName === undefined ||
      inputLastName2 === undefined
    ) {
      setErrorSelectUserClinicApp("No se han ingresado datos del nombre");
      return;
    }
    //Create object user and save in context
    userComplete = {
      ...userComplete,
      name: inputName,
      lastName: inputLastName,
      lastName2: inputLastName2,
    };
    console.log("userComplete", userComplete);
    //Checking if userComplete is undefined
    if (userComplete === undefined) {
      setErrorSelectUserClinicApp("No se ha seleccionado el usuario");
      return;
    }

    //Now with data of state, municipality, clinic and user
    try {
      selectedStateObj &&
      selectedMunicipalityObj &&
      selectedClinicObj &&
      userComplete
        ? setStateApp(selectedStateObj) |
          setMunicipalityApp(selectedMunicipalityObj) |
          setClinicApp(selectedClinicObj) |
          setUserApp(userComplete)
        : (function () {
            throw "No se ha seleccionado el Estado, Municipio, Centro de Salud o usuario";
          })();
      //Save in local storage userApp
      AsyncStorage.setItem("userApp", JSON.stringify(userComplete));
      setErrorSelectUserClinicApp(undefined);
      //When finishing go to main screen
      goToMainScreen();
    } catch (error) {
      console.log(error);
      setErrorSelectUserClinicApp(
        "No se ha seleccionado el Estado, Municipio, Centro de Salud o usuario"
      );
    }
  };

  //Vars and methods to handle input for username and lastnames
  const [inputName, setInputName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputLastName2, setInputLastName2] = useState("");

  const onChangeNameInput = (value) => {
    setInputName(value);
  };
  const onChangeLastNameInput = (value) => {
    setInputLastName(value);
  };
  const onChangeLastNameInput2 = (value) => {
    setInputLastName2(value);
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
        <Text style={styles.textTitle}>Inicia sesión</Text>
      </View>
      <ScrollView contentContainerStyle={styles.grow} style={styles.scrollView}>
        <LoginForm nav={navigation} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 52,
    flexDirection: "column",
    backgroundColor: COLORS.neutral,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
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

  textTitle: {
    width: 300,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "regular",
    fontSize: 20,
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
    marginTop: 4,
    fontSize: 30,
    color: COLORS.secondary1,
  },

  pickerState: {
    marginTop: 16,
    width: 250,
    borderRadius: 12,
    borderColor: COLORS.backgroundApp,
    // borderWidth: 0.5,
    color: COLORS.white,
    backgroundColor: COLORS.white,
  },
  containerPicker: {
    width: 250,
  },
  dropDownContainerStyle: {
    marginTop: 16,
    backgroundColor: COLORS.white,
    borderWidth: 0,
  },

  error: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.primary2,
    textAlign: "center",
    width: 250,
  },

  textView: {
    marginTop: 16,
    width: 250,
    height: 50,
    borderRadius: 12,
    borderWidth: 1.0,
    borderColor: COLORS.backgroundApp,
    backgroundColor: COLORS.white,
  },

  textInputUser: {
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 14,
    borderRadius: 12,
    width: "90%",
    height: "90%",
    textAlign: "left",
    backgroundColor: COLORS.white,
  },

  buttonLogin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    width: 250,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.secondary2,
    marginBottom: 20,
  },

  textButton: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  grow: { flexGrow: 1, paddingBottom: 28, backgroundColor: COLORS.white },
});
