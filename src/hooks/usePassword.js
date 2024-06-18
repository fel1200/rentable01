//React imports
import { useState } from "react";

//To save securely
import * as SecureStore from "expo-secure-store";

//Service login
import { registerService } from "../api/connections";

export default function useUser() {
  const [password, setPassword] = useState([]);
  const [token, setToken] = useState(null);
  //Definimos un estado para saber si está cargando
  const [statePassword, setStatePassword] = useState({
    loading: false,
    error: false,
    registered: false,
  });

  //fix the error of await in the function

  //Función de login async
  const register = async ({ username, password }) => {
    try {
      setStatePassword({ loading: true, error: false, registered: true });

      console.log("username", username);
      console.log("password", password);
      const response = await registerService({ username, password });
      console.log("responseLogin", response);
      if (!response || response?.token.length <= 0) {
        throw new Error("Error en login");
      }
      setToken(response.token);
      await SecureStore.setItemAsync("token", response.token);
      setStatePassword({ loading: false, error: false, registered: true });
    } catch (e) {
      console.log("Error en login", e);
      setStatePassword({ loading: false, error: true, registered: false });
    }
  };

  return {
    isRegistered: statePassword.registered,
    isRegisterLoading: statePassword.loading,
    hasLoginError: statePassword.error,
    register,
  };
}
