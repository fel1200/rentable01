//React imports
import { View, StyleSheet, Text, Pressable } from "react-native";
import React from "react";

//Colors
import { COLORS } from "../utils/constants.js";

export default function Client(props) {
  const { item, onPressGoToCPS } = props;

  const recordId = item?.recordId;
  const Soc_Denominacion = item?.fieldData?.Soc_Denominacion;
  const Soc_Telefono1 = item?.fieldData?.Soc_Telefono1;

  //console.log("item", item);
  return (
    <View style={styles.bg}>
      <Pressable style={styles.mainContainer} onPress={onPressGoToCPS}>
        <View style={styles.leftSection}>
          <View style={styles.leftSectionSquare}>
            <Text style={styles.textClient} numberOfLines={5}>
              {Soc_Denominacion}
            </Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.textNumberCPS}>{`Número: ${recordId}`}</Text>
          <Text
            style={styles.textGenericCPS}
          >{`Teléfono: ${Soc_Telefono1}`}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "95%",
    alignSelf: "center",
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: COLORS.disabled4,
    borderRadius: 8,
    shadowColor: COLORS.primary21,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,

    elevation: 2,
  },
  mainContainer: {
    width: "100%",
    height: 140,
    flex: 1,
    flexDirection: "row",
  },
  leftSection: {
    flex: 3,
  },
  leftSectionSquare: {
    margin: 6,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 4,
  },

  textClient: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.secondary1,
  },
  rightSection: {
    marginTop: 8,
    marginLeft: 6,
    flex: 5,
    marginBottom: 4,
    //backgroundColor: COLORS.secondary1,
  },
  textNumberCPS: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary1,
  },
  textGenericCPS: {
    marginTop: 2,
    marginBottom: 2,
    fontSize: 12,
    fontWeight: "regular",
    color: COLORS.secondary1,
  },
});
