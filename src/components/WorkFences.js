//React imports
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";

//Colors
import { COLORS } from "../utils/constants.js";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default function WorkFences(props) {
  const { item, onPressOpenImageFullScreen } = props;
  const orden_trabajo = item?.fieldData["ID Orden de Trabajo"];
  const orden_servicio = item?.fieldData["ID Orden de Servicio"];
  //const cps_agencia = item?.fieldData?.CPSD_Agencia;
  // const exhibicion = item?.fieldData?.Exhibicion;
  const fecha_ok_trabajo = item?.fieldData["Fecha Realizado"];
  const estatus = item?.fieldData["Estatus Realizado"];
  const pictureURL = item?.fieldData?.url;
  // const pictureURL = item?.fieldData["Fotos_Comprobatorias Trabajos::Foto 1"];

  //const cps_campania = item?.fieldData["CPS_Campania(1)"];
  //const pictureURL = undefined;
  console.log("trabajo de valla", item);
  console.log(`URL de la imagen: ${pictureURL}`);

  console.log("Entró a work fences");

  //console.log("URL", pictureURL);

  return (
    <View style={styles.bg}>
      <Pressable style={styles.mainContainer} onPress={() => {}}>
        <View style={styles.leftSection}>
          <View style={styles.leftSectionSquare}>
            {pictureURL && (
              <TouchableOpacity onPress={onPressOpenImageFullScreen}>
                <Image
                  source={{
                    uri: pictureURL,
                  }}
                  style={styles.imageWork}
                />
              </TouchableOpacity>
            )}
            {!pictureURL && (
              <Text style={styles.textNoImage} numberOfLines={7}>
                {"Sin imagen"}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text
            style={styles.textNumberCPS}
          >{`Orden de trabajo: ${orden_trabajo}`}</Text>
          <Text
            style={styles.textGenericCPS}
          >{`Orden de servicio: ${orden_servicio}`}</Text>
          {/* <Text
            style={styles.textGenericCPS}
          >{`Exhibición: ${exhibicion}`}</Text> */}
          <Text
            style={styles.textGenericCPS}
          >{`Fecha realizado: ${fecha_ok_trabajo}`}</Text>
          <Text style={styles.textGenericCPS}>{`Estatus:${estatus}`}</Text>
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
    height: 180,
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

  imageWork: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },

  textClient: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.secondary1,
  },
  textNoImage: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.disabled1,
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
