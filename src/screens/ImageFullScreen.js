import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
//colors constants
import { COLORS } from "../utils/constants";
//Hooks
import useApp from "../hooks/useApp";
//API
import { getWorkInfo } from "../api/connections";
//Component Anuncio = Promo
import Work from "../components/Work";
//SearchBar component
import { SearchBar } from "@rneui/themed";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const ImageFullScreen = ({ navigation }) => {
  const { imageURLActive } = useApp();
  console.log("imageURLActive", imageURLActive);

  return (
    <KeyboardAvoidingView style={styles.bg}>
      <View style={styles.mainContainer}>
        <View style={styles.titleScreen}>
          <Pressable
            style={styles.backPressable}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrowleft" size={30} color={COLORS.primary1} />
          </Pressable>
          <Text style={styles.textTitle}>Evidencia</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imageURLActive,
            }}
            style={styles.imageWork}
            resizeMode="contain"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ImageFullScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 52,
    flexDirection: "column",
    backgroundColor: COLORS.neutral,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
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
  imageContainer: {
    height: 400,
    marginTop: 64,
  },
  imageWork: {
    //Place image in the center of the screen
    width: deviceWidth,
    height: "75%",
    resizeMode: "contain",
  },
});
