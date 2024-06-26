import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Switch,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

//To handle forms
import { useForm, Controller, set } from "react-hook-form";
import { Input, Button } from "react-native-elements";

//To async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//To get data from context
import useApp from "../hooks/useApp";

//service login
import { loginService } from "../api/connections";

//import useUser
import useUser from "../hooks/useUser";

//To import icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//Colors
import { COLORS } from "../utils/constants";

//method to escape symbols including @
const escapeSymbols = (string) => {
  return string.replace(/[-\/\\^$*+@?.()|[\]{}]/g, "\\$&");
};

const LoginForm = (props) => {
  //  Form control
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  //data from context
  const { isSignedIn, setIsSignedIn } = useApp();

  //Login hook
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser();

  //error login general, not specific
  const [errorLogin, setErrorLogin] = useState("");

  //show/hide password
  const [hidePassword, setHidePassword] = useState(true);

  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };

  //Var and method to switch
  const [remember, setRemember] = useState(true);

  const onSubmit = async () => {
    setErrorLogin("");
    const username = getValues("Username");
    const password = getValues("Password");

    //transform username for example @ to \"@\" and other symbols to avoid errors
    const transformedUsername = escapeSymbols(username);
    const transformedPassword = escapeSymbols(password);

    try {
      const loginObject = {
        query: [
          {
            Soc_AppUser: transformedUsername,
            Soc_AppPass: transformedPassword,
          },
        ],
        sort: [
          {
            fieldName: "Soc_AppUser",
            sortOrder: "ascend",
          },
        ],
        limit: "2000",
      };
      console.log("loginObject", loginObject);
      const response = await login({ loginObject });
      //with fake api
      //const response = await login({ username, password });

      //console.log("responseLogin", response);
    } catch (e) {
      console.log("error", e);
      setErrorLogin(e.message);
      //set errors with value in login
      //Check if exist error in errors.password if not create
    }
  };

  console.log("isLogged", isLogged);
  useEffect(() => {
    if (isLogged === true) {
      console.log("Entró a isLogged", isLogged);
      setIsSignedIn(true);
      //secure storage
      AsyncStorage.setItem("isSignedIn", "true");

      props.nav.navigate("ClientsScreen");
    }
  }, [isLogged, props.nav]);

  //

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  //Method to reset error while typing
  const resetError = (name) => {
    if (errors[name]) {
      errors[name] = null;
    }
  };

  console.log("errors", errors);
  return (
    <View style={styles.logincontainer}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="Usuario"
            placeholderTextColor={COLORS.disabled1}
            //Guardamos el valor del input
            //OnChangeText que resetea el error
            onChangeText={(value) => {
              setValue("Username", value);
              setErrorLogin("");
            }}
            value={value}
            inputContainerStyle={{
              borderBottomWidth: 0.3,
              borderBottomColor: { COLORS }.disabled3,
            }}
          />
        )}
        name="Username"
        rules={{
          required: { value: true, message: "El usuario es requerido" },
          pattern: {
            value: EMAIL_REGEX,
            message: "No es un correo válido",
          },
        }}
        defaultValue={""}
      />
      <View style={styles.errors}>
        {errors.Username && (
          <Text style={styles.textError}>{`${errors.Username.message}`}</Text>
        )}
      </View>

      <Controller
        control={control}
        //Define style of input

        render={({ onChange, onBlur, value }) => (
          <View style={{ flexDirection: "row" }}>
            <Input
              placeholder="Contraseña"
              placeholderTextColor={{ COLORS }.disabled1}
              onChangeText={(value) => {
                setValue("Password", value);
                setErrorLogin("");
              }}
              value={value}
              //hide/show password

              secureTextEntry={hidePassword}
              //set margin to 0

              style={{ marginBottom: 0 }}
              inputContainerStyle={{
                borderBottomWidth: 0.3,
                borderBottomColor: { COLORS }.disabled3,
              }}
            />
            <Icon
              name={hidePassword ? "eye-off" : "eye"}
              size={20}
              onPress={togglePassword}
              style={{
                position: "absolute",
                right: 16,
                top: 12,
                color: COLORS.disabled0,
              }}
            />
          </View>
        )}
        name="Password"
        rules={{
          required: { value: true, message: "La contraseña es requerida" },
        }}
        defaultValue={""}
      />
      <View style={styles.errors}>
        {errors.Password && (
          <Text style={styles.textError}>{`${errors.Password.message}`}</Text>
        )}
      </View>
      <View style={styles.errors}>
        {errorLogin && <Text style={styles.textError}>{`${errorLogin}`}</Text>}
      </View>

      <View style={styles.forgetAccount}>
        <Pressable onPress={() => props.nav.navigate("CreatePassword")}>
          <Text
            style={[
              styles.textForgetAccount,
              { color: COLORS.disabled0, fontSize: 14 },
            ]}
          >
            Olvidé mi contraseña
          </Text>
        </Pressable>
      </View>

      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={remember}
            onValueChange={setRemember}
            trackColor={{ true: COLORS.primary1, false: COLORS.disabled3 }}
            thumbColor={COLORS.neutral}
          />
          <Text style={styles.rememberText}>Recordar usuario</Text>
        </View>
      </View>

      <View style={styles.button}>
        <Button
          buttonStyle={{
            backgroundColor: COLORS.primary1,

            width: 200,
            marginTop: 28,
            marginBottom: 8,
          }}
          titleStyle={{
            color: COLORS.neutral,
          }}
          title="Iniciar sesión"
          onPress={handleSubmit(onSubmit)}
          loading={isLoginLoading}
        ></Button>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  logincontainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    paddingTop: 0,
    marginTop: 4,
    width: "95%",
    alignSelf: "center",
    zIndex: 1,
    gap: 0,
  },
  //Errors style with height depending if there is an error

  textError: {
    //fontWeight regular
    fontWeight: "600",
    fontSize: 12,
    color: COLORS.error2,
  },
  errors: {
    justifyContent: "center",
    alignItems: "center",
  },
  forgetAccount: {
    marginTop: 4,
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  textForgetAccount: {
    color: COLORS.primary1,
    fontSize: 14,
    marginLeft: 8,
    alignSelf: "right",
  },

  rememberView: {
    flexDirection: "row",
    marginTop: 8,
    width: "100%",
    justifyContent: "left",
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rememberText: {
    color: COLORS.disabled0,
    fontSize: 14,
    marginLeft: 8,
  },
});
