//React imports
import { useState } from "react";

//To save securely
import * as SecureStore from "expo-secure-store";

//Service login
import { loginService } from "../api/connections";
import { set } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Hook to manage user
import useApp from "./useApp";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const { userActive, setUserActive } = useApp();

  const [userApp, setUserApp] = useState(null);
  //Definimos un estado para saber si está cargando
  const [stateUser, setStateUser] = useState({
    loading: false,
    error: false,
    logged: false,
  });

  //fix the error of await in the function

  //Función de login async
  const login = async ({ loginObject }) => {
    //method to refresh the state
    setStateUser({ loading: true, error: false, logged: false });

    try {
      // console.log("username", username);
      // console.log("password", password);

      console.log("loginObject", loginObject);
      const response = await loginService({ loginObject });
      console.log("responseLogin", response);
      // if (!response.token) {
      //   throw new Error("Error en login");
      // }
      if (
        response !== null &&
        response !== undefined &&
        response.data !== null
      ) {
        //Save user in state
        console.log("Login correcto en useUser response", response);
        setUser(response?.data);
        setUserActive(response?.data);
        const sessionData = {
          user: response?.data,
          typeOfUser:
            response?.data?.fieldData?.Soc_AppOption === 0
              ? "rentable"
              : "client",
          dateSession: new Date(),
        };
        //Save in storage
        AsyncStorage.setItem("sessionData", JSON.stringify(sessionData));
        // await SecureStore.setItemAsync(
        //   "sessionData",
        //   JSON.stringify(sessionData)
        // );

        //Show if the sessionData is saved
        const sessionDataSaved = await AsyncStorage.getItem("sessionData");
        console.log("sessionDataSaved", sessionDataSaved);

        setStateUser({ loading: false, error: false, logged: true });
        //Creating object to store session data in storage
        return response;
      } else {
        setStateUser({ loading: false, error: true, logged: false });
        throw new Error("");
      }

      // setToken(response.token);
      // await SecureStore.setItemAsync("token", response.token);

      // console.log("token", token);
    } catch (e) {
      setStateUser({ loading: false, error: true, logged: false });
      throw new Error(e);
    }
  };

  return {
    isLogged: stateUser.logged,
    isLoginLoading: stateUser.loading,
    hasLoginError: stateUser.error,
    login,
    user,
    setUser,
    //include method to refresh
  };
}
