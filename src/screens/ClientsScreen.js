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
import { getClientsInfo } from "../api/connections";
//Component Client
import Client from "../components/Client";
//SearchBar component
import { SearchBar } from "@rneui/themed";
//To import icons
import Icon from "react-native-vector-icons/AntDesign";

export default function ClientsScreen({ navigation }) {
  //Method to go to the next screen
  //Context global vars
  const { platform, setClientActive, isSignedIn, setIsSignedIn } = useApp();

  //Vars to manage loading CPS
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [errorLoadingClients, setErrorLoadingClients] = useState("");

  const [filteredClients, setFilteredClients] = useState([]);

  //Useeffect to get token
  useEffect(() => {
    (async () => {
      setLoadingClients(true);
      setErrorLoadingClients("");
      try {
        //Creating object to consult info of a hardcoded object
        const ClientsObject = {
          query: [
            {
              Soc_Rk_T: 2,
              Soc_AppOption: 1,
            },
          ],
          sort: [
            {
              fieldName: "Soc_PK",
              sortOrder: "ascend",
            },
          ],
          limit: "2000",
        };
        const clientsResponse = await getClientsInfo(ClientsObject);
        //console.log("ClientsResponse", clientsResponse);
        setLoadingClients(false);
        if (clientsResponse !== null && clientsResponse !== undefined) {
          setClients(clientsResponse?.data);
          setFilteredClients(clientsResponse?.data);
        } else {
          console.log("Error getting info from Clients");
          throw new Error("Error al obtener información de Clients");
        }
      } catch (error) {
        setLoadingClients(false);
        console.log(error);
        setErrorLoadingClients(`Error: ${error.message}`);
      }
    })();
  }, []);

  //Vars to manage searchBar
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  //search filtered elements
  useEffect(() => {
    //console.log("Client before", Clients);
    const searchedClient = clients.filter(
      (clientItem) =>
        clientItem.recordId?.includes(search) ||
        clientItem.fieldData?.Soc_Denominacion?.toLowerCase().includes(
          search.toLowerCase()
        )
    );
    //console.log("searchedCPS", searchedCPS);
    setFilteredClients(searchedClient);
    //console.log("After", filteredCPS);
  }, [search, clients]);

  //function to to to info of CPS of a client
  const goToCPS = (item) => {
    setClientActive(item);
    navigation.navigate("CPS");
  };

  //function to go to selection screen
  const goToSelection = () => {
    setIsSignedIn(false);
    // navigation.navigate("Selection");
  };

  return (
    <KeyboardAvoidingView style={styles.bg}>
      <View style={styles.mainContainer}>
        <View style={styles.titleScreen}>
          <Pressable
            style={styles.backPressable}
            onPress={() => goToSelection()}
          >
            <Icon name="arrowleft" size={30} color={COLORS.primary1} />
          </Pressable>
          <Text style={styles.textTitle}>Clientes</Text>
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
            placeholder="Buscar clientes..."
            onChangeText={updateSearch}
            value={search}
            platform={platform ? platform : "android"}
            containerStyle={styles.inputContainerSearcher}
            inputContainerStyle={{ backgroundColor: COLORS.disabled4 }}
            inputStyle={{ backgroundColor: COLORS.disabled4 }}
            leftIconContainerStyle={{ color: "black" }}
          />
        </View>
        {loadingClients && (
          <View style={styles.sumarizeResults}>
            <Text style={styles.textSumarizeResults} typeFont="Regular">
              {`Cargando clientes activos ...`}
            </Text>
          </View>
        )}
        {!loadingClients && (
          <View>
            <View style={styles.sumarizeResults}>
              <Text style={styles.textSumarizeResults} typeFont="Regular">
                {`${filteredClients.length} Clientes encontrados`}
              </Text>
            </View>
            <View style={styles.line} />

            <ScrollView
              contentContainerStyle={styles.grow}
              style={styles.scrollView}
            >
              {errorLoadingClients && (
                <Text style={styles.error} typeFont="Regular">
                  {errorLoadingClients}
                </Text>
              )}
              {!errorLoadingClients &&
                filteredClients?.map((item, index) => (
                  <Client
                    item={item}
                    key={item?.recordId}
                    onPressGoToCPS={() => goToCPS(item)}
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
