import { StyleSheet, Text, View } from "react-native";
import React from "react";

//To handle forms
import { useForm, Controller } from "react-hook-form";
import { Input } from "react-native-elements";

//Colors
import { COLORS } from "../utils/constants";

const LoginForm = () => {
  //  Form control
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {};

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  return (
    <View style={styles.logincontainer}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="Usuario"
            placeholderTextColor={COLORS.disabled1}
            //Guardamos el valor del input
            onChangeText={(value) => setValue("Username", value)}
            value={value}
            inputContainerStyle={{
              borderBottomWidth: 1,
              borderColor: { COLORS }.disabled3,
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
      {errors.Username && <Text>{errors.Username.message}</Text>}
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  logincontainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginTop: 20,
  },
  textError: {
    color: "white",
  },
});
