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
  ViewComponent,
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
import { getPromoInfo } from "../api/connections";
//Component Anuncio en espectaculares = Promo
import Promo from "../components/Promo";
//Component Anuncio en vallas = PromoFences
import PromoFences from "../components/PromoFences";
//SearchBar component
import { SearchBar } from "@rneui/themed";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

const BillboardsPromo = ({ route }) => {
  //method to render both Espectaculares and Vallas
  //depending on the type of CPS selected it renders the corresponding CPS
  //Method to go to the next screen
  //Context global vars
  const { platform, clientActive, CPSActive, setPromoActive, userActive } =
    useApp();

  const typeOfElement = route.key;
  const navigation = route.navigation;

  //Vars to manage loading promos
  const [promos, setPromos] = useState([]); //Number of CPS[0
  const [loadingPromos, setLoadingPromos] = useState(false);
  const [errorLoadingPromos, setErrorLoadingPromos] = useState("");

  const [filteredPromos, setFilteredPromos] = useState([]);

  const [promosFences, setPromosFences] = useState([]); //Number of CPS[0
  const [loadingPromosFences, setLoadingPromosFences] = useState(false);
  const [errorLoadingPromosFences, setErrorLoadingPromosFences] = useState("");

  const [filteredPromosFences, setFilteredPromosFences] = useState([]);

  console.log("CPS activo", CPSActive);

  let cpsActiveId = "";
  if (typeOfElement === "billboards") {
    cpsActiveId = CPSActive?.fieldData?.CPS_ID_CPS;
  } else {
    cpsActiveId = CPSActive?.fieldData["ID Contrato"];
  }
  // const cpsActiveId = CPSActive?.fieldData?.CPS_ID_CPS;
  console.log("CPS active id", cpsActiveId);
  // CPS_RK_Cliente: "75FB97E9-90E4-4930-95AD-953EBCF20E53",

  //Useeffect to get token
  useEffect(() => {
    (async () => {
      if (typeOfElement === "billboards") {
        setLoadingPromos(true);
        setErrorLoadingPromos("");
      } else {
        setLoadingPromosFences(true);
        setErrorLoadingPromosFences("");
      }
      try {
        //Creating object to consult info of a hardcoded object
        let response;
        let elementObject;
        if (typeOfElement === "billboards") {
          elementObject = {
            query: [
              {
                CPSD_ID_CPS: cpsActiveId,
                CPSD_Exhibicion: "ESTATICO",
              },
            ],
            sort: [
              {
                fieldName: "CPSD_ID_Anuncio",
                sortOrder: "ascend",
              },
            ],
            limit: "2000",
          };
          response = await getPromoInfo(elementObject, typeOfElement);
        } else {
          elementObject = {
            query: [
              {
                "ID Contrato": cpsActiveId,
                // "ID Contrato": 3151,  //For testing
              },
            ],
            sort: [
              {
                fieldName: "ID Anuncio Rentable",
                sortOrder: "ascend",
              },
            ],
            limit: "2000",
          };
          response = await getPromoInfo(elementObject, typeOfElement);
        }

        if (typeOfElement === "billboards") {
          setLoadingPromos(false);
        } else {
          setLoadingPromosFences(false);
        }
        if (response !== null && response !== undefined) {
          if (typeOfElement === "billboards") {
            // console.log("promoResponse billboards", response?.data);
            setPromos(response?.data);
            setFilteredPromos(response?.data);
          } else {
            // console.log("promoResponse vallas", response?.data);
            setPromosFences(response?.data);
            setFilteredPromosFences(response?.data);
          }
        } else {
          console.log(`Error getting info from ${typeOfElement} `);
          throw new Error("Error al obtener información de Promos");
        }
      } catch (error) {
        console.log(error);
        if (typeOfElement === "billboards") {
          setLoadingPromos(false);
          setErrorLoadingPromos(`${getErrorMessage(error.message, "Promo")}`);
        } else {
          setLoadingPromosFences(false);
          setErrorLoadingPromosFences(
            `${getErrorMessage(error.message, "Promo")}`
          );
        }
      }
    })();
  }, [CPSActive]);

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
    const searchedPromos = promos.filter(
      (promoItem) =>
        promoItem.fieldData?.CPSD_ID_Anuncio?.toString().includes(search) ||
        promoItem.fieldData?.CPSD_Campana?.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        promoItem.fieldData?.CPSD_Ubicacion?.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        //Next one accesing with square bracket, because has (1) in atrribute's name
        promoItem.fieldData?.CPSD_Referencia?.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        //Next one accesing with square bracket, because has (1) in atrribute's name
        promoItem.fieldData?.CPSD_Delegacion?.toLowerCase().includes(
          search.toLowerCase()
        )
    );
    //console.log("searchedCPS", searchedCPS);
    setFilteredPromos(searchedPromos);
    //console.log("After", filteredCPS);
  }, [search, promos]);

  //search filtered fences
  useEffect(() => {
    //console.log("CPS before", cps);
    const searchedPromosFences = promosFences.filter(
      (promoItemFence) =>
        promoItemFence.fieldData?.["ID Anuncio Rentable"]
          .toString()
          .includes(searchFences) ||
        promoItemFence.fieldData?.CPSD_Campania?.toLowerCase().includes(
          searchFences.toLowerCase()
        ) ||
        promoItemFence.fieldData?.["Ubicación"]
          .toLowerCase()
          .includes(searchFences.toLowerCase()) ||
        //Next one accesing with square bracket, because has (1) in atrribute's name
        promoItemFence.fieldData?.CPSD_Referencia?.toLowerCase().includes(
          searchFences.toLowerCase()
          // ) ||
          // //Next one accesing with square bracket, because has (1) in atrribute's name
          // promoItemFence.fieldData?.CPSD_Delegacion?.toLowerCase().includes(
          //   searchFences.toLowerCase()
        )
    );
    //console.log("searchedCPS", searchedCPS);
    setFilteredPromosFences(searchedPromosFences);
    //console.log("After", filteredCPS);
  }, [searchFences, promosFences]);

  //Method to go an specific CPS
  const goToWorks = (item) => {
    setPromoActive(item);
    navigation.navigate("Works");
  };

  return (
    <View style={styles.scene}>
      <View style={styles.searchBarSection}>
        <SearchBar
          autoCorrect={false}
          placeholder="Buscar anuncios..."
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
      {loadingPromos && typeOfElement !== "fences" && (
        <View style={styles.sumarizeResults}>
          <Text style={styles.textSumarizeResults} typeFont="Regular">
            {`Cargando anuncios de espectaculares...`}
          </Text>
        </View>
      )}
      {loadingPromosFences && typeOfElement === "fences" && (
        <View style={styles.sumarizeResults}>
          <Text style={styles.textSumarizeResults} typeFont="Regular">
            {`Cargando anuncios de vallas ...`}
          </Text>
        </View>
      )}
      {!loadingPromos && typeOfElement !== "fences" && (
        <View>
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`${filteredPromos.length} anuncios de espectaculares encontrados`}
            </Text>
          </View>
          <View style={styles.line} />

          <ScrollView
            contentContainerStyle={styles.grow}
            style={styles.scrollView}
          >
            {errorLoadingPromos && (
              <Text style={styles.error} typeFont="Regular">
                {errorLoadingPromos}
              </Text>
            )}
            {!errorLoadingPromos &&
              filteredPromos?.map((item, index) => (
                <Promo
                  item={item}
                  key={`Billboards-${item?.fieldData?.CPSD_ID_Anuncio}-${item?.fieldData?.CPSD_PK}`}
                  onPressGoToWorks={() => goToWorks(item)}
                />
              ))}
          </ScrollView>
        </View>
      )}
      {!loadingPromosFences && typeOfElement === "fences" && (
        <View>
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`${filteredPromosFences.length} anuncios de vallas encontrados`}
            </Text>
          </View>
          <View style={styles.line} />

          <ScrollView
            contentContainerStyle={styles.grow}
            style={styles.scrollView}
          >
            {errorLoadingPromosFences && (
              <Text style={styles.error} typeFont="Regular">
                {errorLoadingPromosFences}
              </Text>
            )}
            {!errorLoadingPromosFences &&
              filteredPromosFences?.map((item, index) => (
                <PromoFences
                  item={item}
                  key={`Fences-${item?.fieldData?.["ID Anuncio Rentable"]}`}
                  onPressGoToWorks={() => goToWorks(item)}
                />
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default function PromoScreen({ navigation, route }) {
  const { modeActive, setModeActive } = useApp();
  const typeCPS = route.params?.type;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "billboards", title: "Espectaculares", navigation: navigation },
    { key: "fences", title: "Vallas", navigation: navigation },
  ]);

  //Depending the modeActive, we select tab to show
  // If modeActive === "billboards" then we show billboards
  // If modeActive === "fences" then we show fences
  useEffect(() => {
    if (modeActive === "billboards") {
      setIndex(0);
    } else {
      setIndex(1);
    }
  }, [modeActive]);

  console.log("index", index);
  console.log("modeActive", modeActive);

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
    billboards: BillboardsPromo,
    fences: BillboardsPromo,
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
          <Text style={styles.textTitle}>{`Anuncios`} </Text>
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
  grow: { flexGrow: 1, paddingBottom: 110, backgroundColor: COLORS.white },
});
