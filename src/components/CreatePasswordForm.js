import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useEffect, useState } from "react";

//To handle forms
import { useForm, Controller, set } from "react-hook-form";
import { Input, Button } from "react-native-elements";

//service login
import { login } from "../api/connections";

//import useUser
import useUser from "../hooks/usePassword";

//Colors
import { COLORS } from "../utils/constants";

const CreatePasswordForm = (props) => {
  //  Form control
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  //Login hook
  const { isRegisterLoading, hasLoginError, register, isRegistered } =
    useUser();

  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = async (data) => {
    const username = getValues("Username");
    const password = getValues("Password");
    try {
      const response = await register({ username, password });
      console.log("responseLogin", response);
      if (!response || response?.token.length <= 0) {
        throw new Error("Error en login");
      }
    } catch (e) {
      console.log("error", e.message);
    }
  };

  useEffect(() => {
    if (isRegistered === true) {
      setModalVisible(true);
      //After 3 seconds we go to the next screen
      setTimeout(() => {
        setModalVisible(false);
        props.nav.navigate("Login");
      }, 1000);
    }
  }, [isRegistered, props.nav]);

  const EMAIL_REGEX = /^[A-Z0-9._%+-]/i;

  //Regex for password minimum 8 characters, one uppercase, one lowercase, one number and one special character, the valid special char for password are !@#$%^&*()_+{}:"<>?[];',.
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  //Method to reset error while typing
  const resetError = (name) => {
    // if (errors[name]) {
    //   errors[name] = null;
    // }
  };

  console.log("errors", errors);
  return (
    <View style={styles.passwordcontainer}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="Usuario en filemaker           "
            placeholderTextColor={COLORS.disabled1}
            //Guardamos el valor del input
            //OnChangeText que resetea el error
            onChangeText={(value) => {
              resetError("Username");
              setValue("Username", value);
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
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="Contraseña"
            placeholderTextColor={{ COLORS }.disabled1}
            onChangeText={(value) => setValue("Password", value)}
            value={value}
            secureTextEntry
            inputContainerStyle={{
              borderBottomWidth: 0.3,
              borderBottomColor: { COLORS }.disabled3,
            }}
          />
        )}
        name="Password"
        rules={{
          //Validate also that the two passwords are the same

          required: { value: true, message: "La contraseña es requerida" },
          pattern: {
            value: PASSWORD_REGEX,
            message:
              "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial",
          },
        }}
        defaultValue={""}
      />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="Repetir contraseña"
            placeholderTextColor={{ COLORS }.disabled1}
            onChangeText={(value) => setValue("Password2", value)}
            value={value}
            secureTextEntry
            inputContainerStyle={{
              borderBottomWidth: 0.3,
              borderBottomColor: { COLORS }.disabled4,
            }}
          />
        )}
        name="Password2"
        rules={{
          required: {
            value: true,
            message: "La confirmación de contraseña es requerida",
          },
          validate: (value) =>
            value === getValues("Password") || "Las contraseñas no coinciden",
        }}
        defaultValue={""}
      />
      <View style={styles.errors}>
        {errors.Username && (
          <Text style={styles.textError}>{`${errors.Username.message}`}</Text>
        )}

        {errors.Password && (
          <Text style={styles.textError}>{`${errors.Password.message}`}</Text>
        )}
        {errors.Password2 && (
          <Text style={styles.textError}>{`${errors.Password2.message}`}</Text>
        )}
      </View>
      <View style={styles.button}>
        <Button
          buttonStyle={{
            backgroundColor: COLORS.primary1,

            width: 200,
            marginTop: 28,
          }}
          titleStyle={{
            color: COLORS.neutral,
          }}
          title="Registrar contraseña"
          onPress={handleSubmit(onSubmit)}
          loading={isRegisterLoading}
        ></Button>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Registro exitoso, abriendo pantalla de login
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreatePasswordForm;

const styles = StyleSheet.create({
  passwordcontainer: {
    flex: 1,
    alignItems: "center",
    width: 300,
    padding: 0,
    marginTop: 0,
  },
  textError: {
    //fontWeight regular
    fontWeight: "600",
    fontSize: 12,
    color: COLORS.error2,
  },
  //Modal styles
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "60%",
    backgroundColor: COLORS.neutral,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
