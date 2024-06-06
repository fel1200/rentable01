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
//Styled text
import MyAppText from "../components/componentStyles/MyAppText";
//Hooks
import useApp from "../hooks/useApp";
//API
import { getPromoInfo } from "../api/connections";
//Component Anuncio = Promo
import Promo from "../components/Promo";
//SearchBar component
import { SearchBar } from "@rneui/themed";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

export default function PromoScreen({ navigation }) {
  //Method to go to the next screen
  //Context global vars
  const { platform, clientActive, CPSActive, setPromoActive } = useApp();

  //Vars to manage loading promos
  const [promos, setPromos] = useState([]); //Number of CPS[0
  const [loadingPromos, setLoadingPromos] = useState(false);
  const [errorLoadingPromos, setErrorLoadingPromos] = useState("");

  const [filteredPromos, setFilteredPromos] = useState([]);
  console.log("CPS activo", CPSActive);

  const cpsActiveId = CPSActive?.fieldData?.CPS_ID_CPS;
  console.log("CPS active id", cpsActiveId);
  // CPS_RK_Cliente: "75FB97E9-90E4-4930-95AD-953EBCF20E53",

  //Useeffect to get token
  useEffect(() => {
    (async () => {
      setLoadingPromos(true);
      setErrorLoadingPromos("");
      try {
        //Creating object to consult info of a hardcoded object
        const promoObject = {
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

        const promoResponse = await getPromoInfo(promoObject);
        console.log("pomoResponse", promoResponse?.data);
        setLoadingPromos(false);
        if (promoResponse !== null && promoResponse !== undefined) {
          setPromos(promoResponse?.data);
          setFilteredPromos(promoResponse?.data);
        } else {
          console.log("Error getting info from Promos");
          throw new Error("Error al obtener información de Promos");
        }
      } catch (error) {
        console.log(error);
        setLoadingPromos(false);
        setErrorLoadingPromos(`Error: ${error.message}`);
      }
    })();
  }, [CPSActive]);

  //Vars to manage searchBar
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
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

  //Method to go an specific CPS
  const goToWorks = (item) => {
    setPromoActive(item);
    navigation.navigate("Works");
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
          <Text style={styles.textTitle}>Anuncios</Text>
          <Pressable
            style={styles.buttonUser}
            onPress={() => navigation.goBack()}
          >
            <Icon name="user" size={30} color={COLORS.primary1} />
          </Pressable>
        </View>
        <View style={styles.searchBarSection}>
          <SearchBar
            autoCorrect={false}
            placeholder="Buscar anuncios..."
            onChangeText={updateSearch}
            value={search}
            platform={platform ? platform : "android"}
            containerStyle={styles.inputContainerSearcher}
            inputContainerStyle={{ backgroundColor: COLORS.disabled4 }}
            inputStyle={{ backgroundColor: COLORS.disabled4 }}
            leftIconContainerStyle={{ color: "black" }}
          />
        </View>
        {loadingPromos && (
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`Cargando anuncios activos ...`}
            </Text>
          </View>
        )}
        {!loadingPromos && (
          <View>
            <View style={styles.sumarizeResults}>
              <Text style={styles.textSumarizeResults} typeFont="Regular">
                {`${filteredPromos.length} Anuncios encontrados`}
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
                    key={item?.fieldData?.CPSD_ID_Anuncio}
                    onPressGoToWorks={() => goToWorks(item)}
                  />
                ))}
            </ScrollView>
          </View>
        )}
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
