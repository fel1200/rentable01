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
//Styled text
import MyAppText from "../components/componentStyles/MyAppText";
//Hooks
import useApp from "../hooks/useApp";
//API
import { getCPSInfo, getNewToken } from "../api/connections";
//Component CPS
import CPS from "../components/CPS";
//Component CPSFences
import CPSFences from "../components/CPSFences";
//SearchBar component
import { SearchBar } from "@rneui/themed";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

const Billboards = ({ route }) => {
  const { platform, clientActive, setCPSActive, userActive } = useApp();

  //console.log("route", route);
  //method to render both Espectaculares and Vallas
  //depending on the type of CPS selected it renders the corresponding CPS
  //Espectaculares
  const typeOfElement = route.key;

  const navigation = route.navigation;
  //console.log("navigation", navigation);

  //Vars to manage loading data it could be billboards or fences
  const [elements, setElements] = useState([]);
  const [loadingElements, setLoadingElements] = useState(false);
  const [errorLoadingElements, setErrorLoadingElements] = useState("");

  const [filteredElements, setFilteredElements] = useState([]);

  const [elementsFences, setElementsFences] = useState([]);
  const [loadingElementsFences, setLoadingElementsFences] = useState(false);
  const [errorLoadingElementsFences, setErrorLoadingElementsFences] =
    useState("");
  const [filteredElementsFences, setFilteredElementsFences] = useState([]);

  //console.log("Cliente activo", clientActive);

  const clientActivePK = clientActive?.fieldData?.Soc_PK;
  // console.log("Client active PK", clientActivePK);
  // CPS_RK_Cliente: "75FB97E9-90E4-4930-95AD-953EBCF20E53",

  //Useeffect to get token
  useEffect(() => {
    (async () => {
      if (typeOfElement === "billboards") {
        setLoadingElements(true);
        setErrorLoadingElements("");
      } else {
        setLoadingElementsFences(true);
        setErrorLoadingElementsFences("");
      }
      try {
        //Creating object to consult info of a hardcoded object
        //first with generic, then with billboards or fences

        //depending on the type of element it will be billboards or fences
        let response;
        let elementObject;
        if (typeOfElement === "billboards") {
          elementObject = {
            query: [
              {
                CPS_RK_Cliente: clientActivePK,
                CPS_Estatus: "AUTORIZADA",
              },
            ],
            sort: [
              {
                fieldName: "CPS_ID_CPS",
                sortOrder: "ascend",
              },
            ],
            limit: "200",
          };
          response = await getCPSInfo(elementObject, typeOfElement);
        } else {
          elementObject = {
            query: [
              {
                "ID Cliente": clientActivePK,
                // "ID Cliente": "5A3454D4-4588-4D33-8132-F58363AC88C6",
              },
            ],
            sort: [
              {
                fieldName: "ID CONTRATO",
                sortOrder: "ascend",
              },
            ],
            limit: "200",
          };
          //While it is not implemented, it will be a empty array
          response = await getCPSInfo(elementObject, typeOfElement);
        }

        //console.log(` ${typeOfElement} response`, response);
        if (typeOfElement === "billboards") {
          setLoadingElements(false);
        } else {
          setLoadingElementsFences(false);
        }
        if (response !== null && response !== undefined) {
          if (typeOfElement === "billboards") {
            setElements(response?.data);
            setFilteredElements(response?.data);
            console.log(` ${typeOfElement} elements`, filteredElements);
          } else {
            setElementsFences(response?.data);
            setFilteredElementsFences(response?.data);
            console.log(` ${typeOfElement} elements`, filteredElementsFences);
          }
        } else {
          console.log(`Error getting info from ${typeOfElement}`);
          throw new Error(`Error al obtener información de ${typeOfElement}`);
        }
      } catch (error) {
        console.log(error);
        if (typeOfElement === "billboards") {
          setLoadingElements(false);
          setErrorLoadingElements(`Error: ${error.message}`);
        } else {
          setLoadingElementsFences(false);
          setErrorLoadingElementsFences(`Error: ${error.message}`);
        }
      }
    })();
  }, [clientActivePK]);

  //Vars to manage searchBar
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  //search filtered elements
  useEffect(() => {
    //console.log("CPS before", cps);
    const searchedElements = elements?.filter(
      (cpsItem) =>
        cpsItem.fieldData?.CPS_ID_CPS?.toString().includes(search) ||
        cpsItem.fieldData?.CPS_Agencia?.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        cpsItem.fieldData?.CPS_Cliente?.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        //Next one accesing with square bracket, because has (1) in atrribute's name
        cpsItem.fieldData["CPS_Campania(1)"]
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
    //console.log("searchedCPS", searchedCPS);
    setFilteredElements(searchedElements);
    //console.log("After", filteredCPS);
  }, [search, elements]);

  //Method to go an specific CPS
  const goToPromos = (item) => {
    setCPSActive(item);
    //navigation to promos
    navigation.navigate("Promo");
  };

  return (
    <View style={styles.scene}>
      <View style={styles.searchBarSection}>
        <SearchBar
          autoCorrect={false}
          placeholder="Buscar contratos..."
          onChangeText={updateSearch}
          value={search}
          platform={platform ? platform : "android"}
          containerStyle={styles.inputContainerSearcher}
          inputContainerStyle={{ backgroundColor: COLORS.disabled4 }}
          inputStyle={{ backgroundColor: COLORS.disabled4 }}
          leftIconContainerStyle={{ color: "black" }}
        />
      </View>
      {loadingElements && typeOfElement !== "fences" && (
        <View style={styles.sumarizeResults}>
          <Text style={styles.textSumarizeResults} typeFont="Regular">
            {`Cargando CPS de espectaculares ...`}
          </Text>
        </View>
      )}
      {loadingElementsFences && typeOfElement === "fences" && (
        <View style={styles.sumarizeResults}>
          <Text style={styles.textSumarizeResults} typeFont="Regular">
            {`Cargando CPS de vallas ...`}
          </Text>
        </View>
      )}

      {!loadingElementsFences && typeOfElement !== "fences" && (
        <View>
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`${filteredElements?.length} CPS encontrados`}
            </Text>
          </View>
          <View style={styles.line} />

          <ScrollView
            contentContainerStyle={styles.grow}
            style={styles.scrollView}
          >
            {errorLoadingElements && (
              <Text style={styles.error} typeFont="Regular">
                {errorLoadingElements}
              </Text>
            )}
            {!errorLoadingElements &&
              filteredElements?.map((item, index) => (
                <CPS
                  item={item}
                  key={item?.fieldData?.CPS_ID_CPS}
                  onPressGoToPromos={() => goToPromos(item)}
                />
              ))}
          </ScrollView>
        </View>
      )}
      {!loadingElements && typeOfElement === "fences" && (
        // <View style={styles.sumarizeResults}>
        //   <Text style={styles.textSumarizeResults} typeFont="Regular">
        //     {`Pantalla de vallas se encuentra en construcción...`}
        //   </Text>
        // </View>
        <View>
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`${filteredElementsFences?.length} CPS encontrados`}
            </Text>
          </View>
          <View style={styles.line} />

          <ScrollView
            contentContainerStyle={styles.grow}
            style={styles.scrollView}
          >
            {errorLoadingElements && (
              <Text style={styles.error} typeFont="Regular">
                {errorLoadingElements}
              </Text>
            )}
            {!errorLoadingElements &&
              filteredElementsFences?.map((item, index) => (
                <CPSFences
                  item={item}
                  key={item?.fieldData["Id Contrato"]}
                  onPressGoToPromos={() => goToPromos(item)}
                />
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default function CPSScreen({ navigation, route }) {
  const typeCPS = route.params?.type;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "billboards", title: "Espectaculares", navigation: navigation },
    { key: "fences", title: "Vallas", navigation: navigation },
  ]);

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

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const _renderScene = SceneMap({
    billboards: Billboards,
    fences: Billboards,
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
          <Text style={styles.textTitle}>{`CPS`} </Text>
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

  sumarizeResults: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    color: COLORS.secondary1,
    textAlign: "center",
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
  scrollView: {
    width: "97%",
    alignSelf: "center",
    borderRadius: 16,
    marginTop: 8,
  },
  grow: { flexGrow: 1, paddingBottom: 28, backgroundColor: COLORS.white },
});
