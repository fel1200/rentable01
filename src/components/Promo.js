//React imports
import { View, StyleSheet, Text, Pressable } from "react-native";
import React from "react";

//Colors
import { COLORS } from "../utils/constants.js";

export default function Promo(props) {
  const { item, onPressGoToWorks } = props;
  const cpsd_id_anuncio = item?.fieldData?.CPSD_ID_Anuncio;
  const cpsd_campana = item?.fieldData?.CPSD_Campana;
  //const cps_agencia = item?.fieldData?.CPSD_Agencia;
  const cpsd_ubicacion = item?.fieldData?.CPSD_Ubicacion;
  const cpsd_referencia = item?.fieldData?.CPSD_Referencia;
  const cpsd_delegacion = item?.fieldData?.CPSD_Delegacion;
  //const cps_campania = item?.fieldData["CPS_Campania(1)"];
  //console.log("item", item);
  return (
    <View style={styles.bg}>
      <Pressable style={styles.mainContainer} onPress={onPressGoToWorks}>
        <View style={styles.leftSection}>
          <View style={styles.leftSectionSquare}>
            <Text style={styles.textClient} numberOfLines={7}>
              {cpsd_campana}
            </Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text
            style={styles.textNumberCPS}
          >{`Anuncio: ${cpsd_id_anuncio}`}</Text>
          <Text
            style={styles.textGenericCPS}
          >{`Campaña: ${cpsd_campana}`}</Text>
          <Text
            style={styles.textGenericCPS}
          >{`Ubicación: ${cpsd_ubicacion}`}</Text>
          <Text
            style={styles.textGenericCPS}
          >{`Campaña: ${cpsd_referencia}`}</Text>
          <Text
            style={styles.textGenericCPS}
          >{`Delegación:${cpsd_delegacion}`}</Text>
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
    height: 190,
    flex: 1,
    flexDirection: "row",
  },
  leftSection: {
    flex: 3,
  },
  leftSectionSquare: {
    margin: 8,
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
