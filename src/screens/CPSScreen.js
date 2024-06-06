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
import { getCPSInfo, getNewToken } from "../api/connections";
//Component CPS
import CPS from "../components/CPS";
//SearchBar component
import { SearchBar } from "@rneui/themed";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

export default function CPSScreen({ navigation }) {
  //Method to go to the next screen
  //Context global vars
  const { platform, clientActive, setCPSActive } = useApp();

  //Vars to manage loading CPS
  const [cps, setCPS] = useState([]); //Number of CPS[0
  const [loadingCPS, setLoadingCPS] = useState(false);
  const [errorLoadingCPS, setErrorLoadingCPS] = useState("");

  const [filteredCPS, setFilteredCPS] = useState([]);
  console.log("Cliente activo", clientActive);

  const clientActivePK = clientActive?.fieldData?.Soc_PK;
  console.log("Client active PK", clientActivePK);
  // CPS_RK_Cliente: "75FB97E9-90E4-4930-95AD-953EBCF20E53",

  //Useeffect to get token
  useEffect(() => {
    (async () => {
      setLoadingCPS(true);
      setErrorLoadingCPS("");
      try {
        //Creating object to consult info of a hardcoded object
        const cpsObject = {
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

        const cpsResponse = await getCPSInfo(cpsObject);
        console.log("cpsResponse", cpsResponse);
        setLoadingCPS(false);
        if (cpsResponse !== null && cpsResponse !== undefined) {
          setCPS(cpsResponse?.data);
          setFilteredCPS(cpsResponse?.data);
        } else {
          console.log("Error getting info from CPS");
          throw new Error("Error al obtener información de CPS");
        }
      } catch (error) {
        console.log(error);
        setLoadingCPS(false);
        setErrorLoadingCPS(`Error: ${error.message}`);
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
    const searchedCPS = cps.filter(
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
    setFilteredCPS(searchedCPS);
    //console.log("After", filteredCPS);
  }, [search, cps]);

  //Method to go an specific CPS
  const goToPromos = (item) => {
    setCPSActive(item);
    navigation.navigate("Promos");
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
          <Text style={styles.textTitle}>CPS</Text>
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
        {loadingCPS && (
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`Cargando CPS activos ...`}
            </Text>
          </View>
        )}
        {!loadingCPS && (
          <View>
            <View style={styles.sumarizeResults}>
              <Text style={styles.textSumarizeResults} typeFont="Regular">
                {`${filteredCPS.length} CPS encontrados`}
              </Text>
            </View>
            <View style={styles.line} />

            <ScrollView
              contentContainerStyle={styles.grow}
              style={styles.scrollView}
            >
              {errorLoadingCPS && (
                <Text style={styles.error} typeFont="Regular">
                  {errorLoadingCPS}
                </Text>
              )}
              {!errorLoadingCPS &&
                filteredCPS?.map((item, index) => (
                  <CPS
                    item={item}
                    key={item?.fieldData?.CPS_ID_CPS}
                    onPressGoToPromos={() => goToPromos(item)}
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
