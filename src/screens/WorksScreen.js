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
import { getWorkInfo } from "../api/connections";
//Component Anuncio = Promo
import Work from "../components/Work";
//SearchBar component
import { SearchBar } from "@rneui/themed";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

export default function WorksScreen({ navigation }) {
  //Method to go to the next screen
  //Context global vars
  const { platform, clientActive, CPSActive, promoActive, setImageURLActive } =
    useApp();

  //Vars to manage loading works
  const [works, setWorks] = useState([]); //Number of
  const [loadingWorks, setLoadingWorks] = useState(false);
  const [errorLoadingWorks, setErrorLoadingWorks] = useState("");

  const [filteredWorks, setFilteredWorks] = useState([]);
  console.log("Anuncio activo", promoActive);

  const promoActiveIdAnuncio = promoActive?.fieldData?.CPSD_ID_Anuncio;
  console.log("promo active id", promoActiveIdAnuncio);

  const promoActivePedido = promoActive?.fieldData?.CPSD_ID_CPS;
  console.log("promo active pedido/CPS id", promoActivePedido);

  //Useeffect to get token
  useEffect(() => {
    (async () => {
      setLoadingWorks(true);
      setErrorLoadingWorks("");
      try {
        //Creating object to consult info of a hardcoded object
        const workObject = {
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
          limit: "20",
        };

        const workResponse = await getWorkInfo(workObject);
        console.log("workResponse", workResponse?.data);
        setLoadingWorks(false);
        if (workResponse !== null && workResponse !== undefined) {
          setWorks(workResponse?.data);
          setFilteredWorks(workResponse?.data);
          console.log("Works", works);
          console.log("FilteredWorks", filteredWorks);
        } else {
          console.log("Error getting info from Trabajos");
          throw new Error("Error al obtener información de Trabajos");
        }
      } catch (error) {
        console.log(error);
        setLoadingWorks(false);
        setErrorLoadingWorks(`Error: ${error.message}`);
      }
    })();
  }, [promoActive]);

  //Vars to manage searchBar
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
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

  //function to to to info of CPS of a client
  const goToImageFullScreen = (item) => {
    setImageURLActive(item?.fieldData?.URL_Foto);
    navigation.navigate("ImageFullScreen");
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
          <Text style={styles.textTitle}>Trabajos</Text>
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
            placeholder="Buscar trabajos..."
            onChangeText={updateSearch}
            value={search}
            platform={platform ? platform : "android"}
            containerStyle={styles.inputContainerSearcher}
            inputContainerStyle={{ backgroundColor: COLORS.disabled4 }}
            inputStyle={{ backgroundColor: COLORS.disabled4 }}
            leftIconContainerStyle={{ color: "black" }}
          />
        </View>
        {loadingWorks && (
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`Cargando trabajos ...`}
            </Text>
          </View>
        )}
        {!loadingWorks && (
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
