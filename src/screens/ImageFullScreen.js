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
  Modal,
  Share,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
//colors constants
import { COLORS } from "../utils/constants";
//Hooks
import useApp from "../hooks/useApp";
//FileSystem
import * as FileSystem from "expo-file-system";

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
  const { imageURLActive, clientActive, CPSActive, promoActive } = useApp();
  console.log("imageURLActive", imageURLActive);
  console.log("clientActive", clientActive);
  console.log("CPSActive", CPSActive);
  console.log("promoActive", promoActive);

  const [loadingIndicatorCreateFile, setLoadingIndicatorCreateFile] =
    useState(false);

  const [modalVisibleCreateFile, setModalVisibleCreateFile] = useState(false);
  // const createFileAsync = async () => {
  //   //Create file with records using expo-file-system
  //   //first get fileUri to save file incluiding date in the name

  //   const fileUri = FileSystem.documentDirectory + "image.jpg";
  //   //in a same var we save records and results to share through txt
  //   //first we save records

  //   await FileSystem.writeAsStringAsync(fileUri, imageURLActive);
  //   // //then get file
  //   const file = await FileSystem.readAsStringAsync(fileUri);
  //   //Then share it, hide modal when share is finished
  //   const shareResponse = await Share.share({
  //     message: file,
  //     title: "Imagen rentable",
  //     url: fileUri,
  //   });
  //   setLoadingIndicatorCreateFile(false);
  //   setModalVisibleCreateFile(false);
  // };

  //Method to create a file from imageURLActive and share it
  const createFileAsync = async () => {
    //Create file with image using expo-file-system
    //first get fileUri to save file incluiding the extension of the original file

    let extension = "jpg";
    try {
      extension = imageURLActive.split(".").pop();
    } catch (error) {
      extension = "jpg";
    }

    const nameFile = `evidencia.${extension}`;

    const fileUri = FileSystem.documentDirectory + nameFile;

    //Saving file from imageURLActive
    await FileSystem.downloadAsync(imageURLActive, fileUri);

    //Then share it, hide modal when share is finished
    const shareResponse = await Share.share({
      title: "Imagen rentable",
      url: fileUri,
    });
    setLoadingIndicatorCreateFile(false);
    setModalVisibleCreateFile(false);
  };

  const shareFile = () => {
    setModalVisibleCreateFile(true);
    setLoadingIndicatorCreateFile(true);
    createFileAsync();
  };

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
          <Pressable style={styles.sharePressable} onPress={() => shareFile()}>
            <Icon name="upload" size={25} color={COLORS.primary1} />
          </Pressable>
        </View>
        {loadingIndicatorCreateFile && (
          //Modal to show loading indicator while sending records
          <View style={styles.centeredView}>
            <Modal
              animationType="shrink"
              transparent={true}
              visible={modalVisibleCreateFile}
              onRequestClose={() => {
                setModalVisibleCreateFile(!modalVisibleCreateFile);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <ActivityIndicator size="large" color={COLORS.secondary2} />
                  <Text style={styles.modalText} typeFont="Bold">
                    Compartiendo imagen...
                  </Text>
                  {/* <Text style={styles.modalText} typeFont="Regular">
                    Obteniendo registros
                  </Text> */}
                </View>
              </View>
            </Modal>
          </View>
        )}
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
  sharePressable: {
    alignSelf: "flex-end",
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
  centeredView: {
    position: "absolute",
    left: deviceWidth / 2 - 120,
    top: deviceHeight / 2 - 150,

    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 28,
    },
    shadowOpacity: 0.28,
    shadowRadius: 28,
    elevation: 28,
  },
  modalText: {
    marginBottom: 28,
    textAlign: "center",
  },
});
