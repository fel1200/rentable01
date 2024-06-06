//React imports
import { View, StyleSheet, Text, Pressable } from "react-native";
import React from "react";

//Colors
import { COLORS } from "../utils/constants.js";

export default function CPS(props) {
  const { item, onPressGoToPromos } = props;
  const cps_id_cps = item?.fieldData?.CPS_ID_CPS;
  const cps_cliente = item?.fieldData?.CPS_Cliente;
  const cps_agencia = item?.fieldData?.CPS_Agencia;
  const cps_estatus = item?.fieldData?.CPS_Estatus;
  const cps_ejecutivo = item?.fieldData?.CPS_Ejecutivo;
  const cps_campania = item?.fieldData["CPS_Campania(1)"];
  //console.log("item", item);
  return (
    <View style={styles.bg}>
      <Pressable style={styles.mainContainer} onPress={onPressGoToPromos}>
        <View style={styles.leftSection}>
          <View style={styles.leftSectionSquare}>
            <Text style={styles.textClient} numberOfLines={3}>
              {cps_cliente}
            </Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.textNumberCPS}>{`CPS: ${cps_id_cps}`}</Text>
          <Text style={styles.textGenericCPS}>{`Agencia: ${cps_agencia}`}</Text>
          <Text style={styles.textGenericCPS}>{`Estatus: ${cps_estatus}`}</Text>
          <Text
            style={styles.textGenericCPS}
          >{`Campaña: ${cps_campania}`}</Text>
          <Text
            style={styles.textGenericCPS}
          >{`Ejecutivo:${cps_ejecutivo}`}</Text>
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
    marginTop: 4,
    backgroundColor: COLORS.disabled4,
    borderRadius: 8,
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
    fontSize: 16,
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
