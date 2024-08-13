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
  //Para el tabBar
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
//Para el tabBar
import { TabView, SceneMap } from "react-native-tab-view";
//colors constants
import { COLORS } from "../utils/constants";
//Handler for errors
import { getErrorMessage } from "../utils/errorHandler";
//Styled text
import MyAppText from "../components/componentStyles/MyAppText";
//Hooks
import useApp from "../hooks/useApp";
//API
import { getWorkInfo } from "../api/connections";
//Component Work en espectaculares
import Work from "../components/Work";
//Component Work en vallas
import WorkFences from "../components/WorkFences";
//SearchBar component
import { SearchBar } from "@rneui/themed";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

const BillboardsWorks = ({ route }) => {
  //Method to go to the next screen
  //Context global vars
  const {
    platform,
    clientActive,
    CPSActive,
    promoActive,
    setImageURLActive,
    userActive,
  } = useApp();

  const typeOfElement = route.key;

  const navigation = route.navigation;

  //Vars to manage loading works
  const [works, setWorks] = useState([]); //Number of
  const [loadingWorks, setLoadingWorks] = useState(false);
  const [errorLoadingWorks, setErrorLoadingWorks] = useState("");
  const [filteredWorks, setFilteredWorks] = useState([]);

  //Vars to manage loading works fences
  const [worksFences, setWorksFences] = useState([]); //Number of
  const [loadingWorksFences, setLoadingWorksFences] = useState(false);
  const [errorLoadingWorksFences, setErrorLoadingWorksFences] = useState("");
  const [filteredWorksFences, setFilteredWorksFences] = useState([]);

  console.log("CPS activo", CPSActive);

  let cpsActiveId = "";
  let promoActiveIdAnuncio = "";
  if (typeOfElement === "billboards") {
    cpsActiveId = CPSActive?.fieldData?.CPS_ID_CPS;
    promoActiveIdAnuncio = promoActive?.fieldData?.CPSD_ID_Anuncio;
  } else {
    cpsActiveId = CPSActive?.fieldData["ID Contrato"];
    promoActiveIdAnuncio = promoActive?.fieldData["ID Anuncio Rentable"];
  }
  console.log("CPS active id", cpsActiveId);

  console.log("Anuncio activo", promoActive);

  console.log("promo active id", promoActiveIdAnuncio);

  const promoActivePedido = promoActive?.fieldData?.CPSD_ID_CPS;
  console.log("promo active pedido/CPS id", promoActivePedido);

  //Useeffect to get token
  useEffect(() => {
    (async () => {
      if (typeOfElement === "billboards") {
        setLoadingWorks(true);
        setErrorLoadingWorks("");
      } else {
        setLoadingWorksFences(true);
        setErrorLoadingWorksFences("");
      }
      try {
        //Creating object to consult info of a hardcoded object
        let workResponse;
        let elementObject;
        if (typeOfElement === "billboards") {
          elementObject = {
            query: [
              {
                PedidoId: promoActivePedido,
                ClaveAnuncio: promoActiveIdAnuncio,
                TipoInstalacionDescripcion: "Instalación",
                Estatus: "Realizado",
              },
            ],
            sort: [
              {
                fieldName: "ClaveAnuncio",
                sortOrder: "ascend",
              },
            ],
            limit: "200",
          };
          workResponse = await getWorkInfo(elementObject, typeOfElement);
        } else {
          elementObject = {
            query: [
              {
                // "ID CPS": cpsActiveId,
                // "ID Inventario": promoActiveIdAnuncio,
                "ID CPS": 3151,
                "ID Inventario": "01078-V03",
              },
            ],
            sort: [
              {
                fieldName: "ID Inventario",
                sortOrder: "ascend",
              },
            ],
            limit: "200",
          };
          workResponse = await getWorkInfo(elementObject, typeOfElement);
        }

        // console.log("workResponse", workResponse?.data);
        console.log("Type of element", typeOfElement);
        if (typeOfElement === "billboards") {
          setLoadingWorks(false);
        } else {
          setLoadingWorksFences(false);
        }
        if (workResponse !== null && workResponse !== undefined) {
          if (typeOfElement === "billboards") {
            console.log("Work response espectaculares", workResponse?.data);
            setWorks(workResponse?.data);
            setFilteredWorks(workResponse?.data);
          } else {
            console.log("Work response vallas", workResponse?.data);
            setWorksFences(workResponse?.data);
            setFilteredWorksFences(workResponse?.data);
          }
        } else {
          console.log("Error getting info from Trabajos");
          throw new Error("Error al obtener información de Trabajos");
        }
      } catch (error) {
        console.log(error);
        if (typeOfElement === "billboards") {
          setLoadingWorks(false);
          setErrorLoadingWorks(`${getErrorMessage(error.message, "Work")}`);
        } else {
          setLoadingWorksFences(false);
          setErrorLoadingWorksFences(
            `${getErrorMessage(error.message, "Work")}`
          );
        }
      }
    })();
  }, [promoActive]);

  //Vars to manage searchBar
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  const [searchFences, setSearchFences] = useState("");
  const updateSearchFences = (search) => {
    setSearchFences(search);
  };

  //search filtered elements
  useEffect(() => {
    //console.log("CPS before", cps);
    const searchedWorks = works.filter(
      (workItem) =>
        workItem.fieldData?.ID_OTrabajo?.toString().includes(search) ||
        workItem.fieldData?.TrabajoId?.toString().includes(search) ||
        workItem.fieldData?.Exhibicion?.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        workItem.fieldData?.fieldData["Fecha OK Trabajo"]
          .toLowerCase()
          .includes(search.toLowerCase())
    );
    //console.log("searchedCPS", searchedCPS);
    setFilteredWorks(searchedWorks);
    //console.log("After", filteredCPS);
  }, [search, works]);

  //search filtered elements
  useEffect(() => {
    //console.log("CPS before", cps);
    const searchedWorksFences = worksFences.filter(
      (workItemFence) =>
        workItemFence.fieldData["ID Orden de Trabajo"]
          .toString()
          .includes(searchFences) ||
        workItemFence.fieldData["ID Orden de Servicio"]
          .toString()
          .includes(searchFences) ||
        workItemFence.fieldData["Estatus Realizado"]
          .toLowerCase()
          .includes(searchFences.toLowerCase()) ||
        workItemFence.fieldData?.fieldData["Fecha Realizado"]
          .toLowerCase()
          .includes(searchFences.toLowerCase())
    );
    //console.log("searchedCPS", searchedCPS);
    setFilteredWorks(searchedWorksFences);
    //console.log("After", filteredCPS);
  }, [searchFences, worksFences]);

  //function to to to info of CPS of a client
  const goToImageFullScreen = (item) => {
    setImageURLActive(item?.fieldData?.URL_Foto);
    navigation.navigate("ImageFullScreen");
  };

  return (
    <View style={styles.scene}>
      <View style={styles.searchBarSection}>
        <SearchBar
          autoCorrect={false}
          placeholder="Buscar trabajos..."
          onChangeText={
            typeOfElement === "billboards" ? updateSearch : updateSearchFences
          }
          value={typeOfElement === "billboards" ? search : searchFences}
          platform={platform ? platform : "android"}
          containerStyle={styles.inputContainerSearcher}
          inputContainerStyle={{ backgroundColor: COLORS.disabled4 }}
          inputStyle={{ backgroundColor: COLORS.disabled4 }}
          leftIconContainerStyle={{ color: "black" }}
        />
      </View>
      {loadingWorks && typeOfElement !== "fences" && (
        <View style={styles.sumarizeResults}>
          <Text style={styles.textSumarizeResults} typeFont="Regular">
            {`Cargando trabajos de espectaculares...`}
          </Text>
        </View>
      )}
      {loadingWorksFences && typeOfElement === "fences" && (
        <View style={styles.sumarizeResults}>
          <Text style={styles.textSumarizeResults} typeFont="Regular">
            {`Cargando trabajos de vallas...`}
          </Text>
        </View>
      )}
      {!loadingWorks && typeOfElement !== "fences" && (
        <View>
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`${filteredWorks.length} trabajos encontrados`}
            </Text>
          </View>
          <View style={styles.line} />

          <ScrollView
            contentContainerStyle={styles.grow}
            style={styles.scrollView}
          >
            {errorLoadingWorks && (
              <Text style={styles.error} typeFont="Regular">
                {errorLoadingWorks}
              </Text>
            )}
            {!errorLoadingWorks &&
              filteredWorks?.map((item, index) => (
                <Work
                  item={item}
                  key={item?.recordId}
                  onPressOpenImageFullScreen={() => goToImageFullScreen(item)}
                />
              ))}
          </ScrollView>
        </View>
      )}
      {!loadingWorksFences && typeOfElement === "fences" && (
        <View>
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`${filteredWorksFences.length} trabajos encontrados`}
            </Text>
          </View>
          <View style={styles.line} />

          <ScrollView
            contentContainerStyle={styles.grow}
            style={styles.scrollView}
          >
            {errorLoadingWorksFences && (
              <Text style={styles.error} typeFont="Regular">
                {errorLoadingWorksFences}
              </Text>
            )}
            {!errorLoadingWorksFences &&
              filteredWorksFences?.map((item, index) => (
                <WorkFences
                  item={item}
                  key={item?.recordId}
                  onPressOpenImageFullScreen={() => goToImageFullScreen(item)}
                />
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default function WorksScreen({ navigation, route }) {
  const { modeActive, setModeActive } = useApp();

  const typeCPS = route.params?.type;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "billboards", title: "Espectaculares", navigation: navigation },
    { key: "fences", title: "Vallas", navigation: navigation },
  ]);

  useEffect(() => {
    if (modeActive === "billboards") {
      setIndex(0);
    } else {
      setIndex(1);
    }
  }, [modeActive]);

  const _handleIndexChange = (index) => setIndex(index);
  const _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          // return (
          //   <TouchableOpacity
          //     style={styles.tabItem}
          //     onPress={() => setIndex(i)}
          //   >
          //     <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
          //   </TouchableOpacity>
          // );
        })}
      </View>
    );
  };
  const _renderScene = SceneMap({
    billboards: BillboardsWorks,
    fences: BillboardsWorks,
  });

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
          <Text style={styles.textTitle}>{`Trabajos`} </Text>
          <Text style={styles.textSubtitle}>
            {`${modeActive === "billboards" ? "Espectaculares" : "Vallas"}`}{" "}
          </Text>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={_renderScene}
          renderTabBar={_renderTabBar}
          onIndexChange={_handleIndexChange}
          // navigation={navigation}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

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
    backgroundColor: COLORS.neutral,
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

  textSubtitle: {
    width: 300,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "regular",
    fontSize: 16,
  },

  scene: {
    flex: 1,
  },
  inputContainerSearcher: {
    width: "80%",
    height: 50,
    borderRadius: 16,
  },
  searchBarSection: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSearcher: {
    // backgroundColor: "rgba(245, 247, 249, 0.0)",
  },

  buttonUser: {},

  error: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    color: COLORS.secondary1,
    textAlign: "center",
  },

  sumarizeResults: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    color: COLORS.secondary1,
    textAlign: "center",
  },

  textSumarizeResults: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.secondary1,
    textAlign: "center",
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  textError: {
    textAlign: "center",
    margin: 16,
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.error2,
  },
  line: {
    height: 0.8,
    width: "98%",
    marginTop: 4,
    marginLeft: 4,
    marginRight: 4,
    zIndex: 1,
    backgroundColor: COLORS.disabled3,
  },

  scrollView: {
    width: "97%",
    alignSelf: "center",
    borderRadius: 16,
    marginTop: 8,
  },
  grow: { flexGrow: 1, paddingBottom: 28, backgroundColor: COLORS.white },
});
