//imports from constants
import {
  API_HOST,
  API_HOST_VALIDATE,
  API_HOST_LOGIN,
  API_HOST_SIGNUP,
} from "../utils/constants";

import useApp from "../hooks/useApp";

//To import secure-store
import * as SecureStore from "expo-secure-store";

//Import axios
import axios from "axios";

//Method to get the information from CPS given an object of CPS_RK_Cliente
export async function getCPSInfo(cpsObject, typeOfElement) {
  try {
    let URL;
    let token;
    let database;
    console.log(`Starting getting CPS info ${typeOfElement}`);
    if (typeOfElement === "billboards") {
      URL = `${API_HOST}Rentable_08_Servicios/layouts/API_CPS/_find`;
      token = await getNewToken("Rentable_08_Servicios", "CPS-billboards");
      database = "Rentable_08_Servicios";
    } else if (typeOfElement === "fences") {
      URL = `${API_HOST}EasySoft%20Data/layouts/API_Contratos/_find`;
      token = await getNewToken("EasySoft%20Data", "CPS-fences");
      database = "EasySoft%20Data";
    }

    //First check if last token is still valid
    console.log(`url ${typeOfElement}`, URL);
    //First call to get the token
    //const token = await getNewToken();
    if (token !== null) {
      console.log(`token ${typeOfElement}`, token);
      console.log(`${typeOfElement}Object`, cpsObject);
      //Second call to get the info
      // const response = await fetch(
      //   `${API_HOST}Rentable_08_Servicios/layouts/API_CPS/_find`,

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cpsObject),
      });
      const responseJson = await response.json();
      const responseCloseToken = await closeToken(token, database, "CPS");
      console.log("responseJson", responseJson);
      if (
        responseJson?.messages[0]?.code === "0" &&
        responseJson?.messages[0]?.message === "OK"
      ) {
        return responseJson?.response;
      } else if (
        //error message
        responseJson?.messages[0]?.code !== "0"
      ) {
        console.log(
          "Response json message",
          responseJson?.messages[0]?.message
        );
        throw new Error(
          `Error al obtener información de CPS,
          ${responseJson?.messages[0]?.message}`
        );
      } else {
        throw new Error(`Error al obtener token`);
      }
    }
  } catch (error) {
    throw error;
  }
}

//Method to get the information from CPS given an object of CPS_RK_Cliente
export async function getClientsInfo(clientsObject) {
  try {
    //First check if last token is still valid

    //First call to get the token
    const token = await getToken("Rentable_06_Socios");
    //const token = await getNewToken("Rentable_06_Socios");
    if (token !== null) {
      console.log("token", token);
      console.log("clientObject", clientsObject);
      //Second call to get the info of clients
      console.log(
        "URL api host",
        `${API_HOST}Rentable_06_Socios/layouts/API_Socios/_find`
      );
      //url: 'https://rentable.site/fmi/data/vLatest/databases/Rentable_06_Socios/layouts/API_Socios/_find',
      //After this fetch finishes we close the token with "then" and we return the response
      //Initial time to measure how many time it takes to get a token
      // const initialTime = new Date().getTime();

      const initialTime = performance.now();
      const response = await fetch(
        `${API_HOST}Rentable_06_Socios/layouts/API_Socios/_find`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(clientsObject),
        }
      );
      // const finalTime = new Date().getTime();

      // const responseJson = await axios.post(
      //   `${API_HOST}Rentable_06_Socios/layouts/API_Socios/_find`,
      //   clientsObject,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      const finalTime = performance.now();
      console.log(
        "Time to get clients in seconds",
        (finalTime - initialTime) / 1000
      );

      const responseJson = await response.json();

      const responseCloseToken = await closeToken(
        token,
        "Rentable_06_Socios",
        "Clients"
      );

      console.log("responseJson getclientsinfo", responseJson);
      if (
        responseJson?.messages[0]?.code === "0" &&
        responseJson?.messages[0]?.message === "OK"
      ) {
        //console.log("responseJson data", responseJson?.response?.data);
        return responseJson?.response;
      } else if (
        //error message
        responseJson?.messages[0]?.code !== "0"
      ) {
        console.log(
          "Response json message",
          responseJson?.messages[0]?.message
        );
        throw new Error(
          `Error al obtener información de clientes:
          ${responseJson?.messages[0]?.message}`
        );
      } else {
        return null;
      }
    }
  } catch (error) {
    throw error;
  }
}

//Method to get the information from Promo given an object of CPS_RK_Cliente
export async function getPromoInfo(promoObject, typeOfElement) {
  try {
    //First check if last token is still valid

    //First call to get the token
    //const token = await getNewToken();
    let URL;
    let token;
    let database;
    console.log(`Starting getting Promo info ${typeOfElement}`);
    console.log(`promoObject ${typeOfElement}`, promoObject);
    if (typeOfElement === "billboards") {
      URL = `${API_HOST}Rentable_08_Servicios/layouts/API_CPSDetalle/_find`;
      token = await getNewToken("Rentable_08_Servicios", "Promo-billboards");
      database = "Rentable_08_Servicios";
    } else {
      URL = `${API_HOST}EasySoft%20Data/layouts/API_Medios/_find`;
      token = await getNewToken("EasySoft%20Data", "Promo-fences");
      database = "EasySoft%20Data";
    }
    if (token !== null) {
      console.log("token", token);
      console.log("promoObject", promoObject);
      //Second call to get the info of clients
      console.log(
        "URL api host promo",
        `${URL} typeOfElement ${typeOfElement}`
      );
      //url: 'https://rentable.site/fmi/data/vLatest/databases/Rentable_06_Socios/layouts/API_Socios/_find',
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(promoObject),
      });
      const responseJson = await response.json();
      const responseCloseToken = await closeToken(token, database, "Promo");

      //console.log("responseJson", responseJson);
      if (
        responseJson?.messages[0]?.code === "0" &&
        responseJson?.messages[0]?.message === "OK"
      ) {
        //console.log("responseJson data", responseJson?.response?.data);
        return responseJson?.response;
      } else if (
        //error message
        responseJson?.messages[0]?.code !== "0"
      ) {
        console.log(
          "Response json message",
          responseJson?.messages[0]?.message
        );
        throw new Error(
          `Error al obtener información de anuncios:
          ${responseJson?.messages[0]?.message}`
        );
      } else {
        return null;
      }
    }
  } catch (error) {
    throw error;
  }
}

//Method to get the information from Work given an object of promo
export async function getWorkInfo(workObject, typeOfElement) {
  try {
    //First check if last token is still valid

    //First call to get the token
    //const token = await getNewToken();
    let URL;
    let token;
    let database;
    console.log(`Starting getting Work info ${typeOfElement}, ${workObject}`);
    console.log(`workObject ${typeOfElement}`, workObject);
    if (typeOfElement === "billboards") {
      URL = `${API_HOST}DBR_Op_NC/layouts/API_Trabajos/_find`;
      token = await getNewToken("DBR_Op_NC", "Work-billboards");
      database = "DBR_Op_NC";
    } else {
      URL = `${API_HOST}EasySoft%20Data/layouts/API_Trabajos/_find`;
      token = await getNewToken("EasySoft%20Data", "Work-fences");
      database = "EasySoft%20Data";
    }
    if (token !== null) {
      console.log("token", token);
      console.log("workObject", typeOfElement, workObject);
      //Second call to get the info of clients
      console.log("URL api host", `${URL}`);
      //url: 'https://rentable.site/fmi/data/vLatest/databases/Rentable_06_Socios/layouts/API_Socios/_find',
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(workObject),
      });
      const responseJson = await response.json();
      console.log("responseJson work", responseJson);
      const responseCloseToken = await closeToken(token, database, "Work");
      //console.log("responseJson", responseJson);
      if (
        responseJson?.messages[0]?.code === "0" &&
        responseJson?.messages[0]?.message === "OK"
      ) {
        //console.log("responseJson data", responseJson?.response?.data);
        return responseJson?.response;
      } else if (
        //error message
        responseJson?.messages[0]?.code !== "0"
      ) {
        console.log(
          "Response json message",
          responseJson?.messages[0]?.message
        );
        throw new Error(
          `Error al obtener información de trabajos:
          ${responseJson?.messages[0]?.message}`
        );
      } else {
        return null;
      }
    }
  } catch (error) {
    throw error;
  }
}

//Method to get a new token
// export function getNewToken = async (database) => {
export const getNewToken = async (database, screen) => {
  try {
    console.log(`Starting getting new token ${database}`);
    //Initial time to measure how many time it takes to get a token
    const initialTime = new Date().getTime();
    const response = await fetch(`${API_HOST}${database}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic dXNlckFQSTpBcDFGMWwz",
      },
    });

    //Final time to measure how many time it takes to get a token
    const finalTime = new Date().getTime();
    console.log(
      `Time to get token in seconds ${database}`,
      (finalTime - initialTime) / 1000
    );
    const responseJson = await response.json();
    console.log(` responseJson ${database}`, responseJson);
    //console.log("responseJsonCode", responseJson?.messages[0].code);
    //console.log("responseJsonMessage", responseJson?.messages[0].message);
    console.log(
      "responseJsonToken",
      database,
      responseJson?.messages[0].message
    );

    if (
      responseJson?.messages[0]?.code === "0" &&
      responseJson?.messages[0]?.message === "OK"
    ) {
      //We save the token in secure store with token and databasename
      //replace special characters of the database to avoid errors in securestore
      const newDatabase = database.replace(/[^a-zA-Z0-9]/g, "");
      const tokenName = `token-${newDatabase}`;

      //const { tokensOpened, setTokensOpened } = useApp();

      const tokenOpened = {
        token: responseJson?.response?.token,
        database: database,
        screen: screen,
      };

      //setTokensOpened([...tokensOpened, tokenOpened]);

      //console.log("tokensOpened", tokensOpened);

      //get all the tokens saved in secure store
      const allTokens = await SecureStore.getItemAsync("tokensOpened5");

      //if there are no tokens, we save the first one
      if (allTokens === null) {
        await SecureStore.setItemAsync(
          "tokensOpened5",
          JSON.stringify([tokenOpened])
        );
      } else {
        //if there are tokens, we add the new one
        const newTokens = JSON.parse(allTokens);
        newTokens.push(tokenOpened);
        await SecureStore.setItemAsync(
          "tokensOpened5",
          JSON.stringify(newTokens)
        );
      }
      //await SecureStore.setItemAsync(tokenName, responseJson?.response?.token);

      //print after all tokens
      const allTokensAfter = await SecureStore.getItemAsync("tokensOpened5");
      console.log("allTokensAfter", allTokensAfter);

      console.log("responseJsonToken", responseJson?.response?.token);
      return responseJson?.response?.token;
    } else if (
      //error message
      responseJson?.messages[0]?.code !== "0"
    ) {
      console.log("Response json message", responseJson?.messages[0]?.message);
      throw new Error(
        `Error al obtener información de token:
        ${responseJson?.messages[0]?.message}`
      );
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

//Method to check the current token
export async function getToken(database) {
  try {
    //replace special characters of the database to avoid errors in securestore
    const newDatabase = database.replace(/[^a-zA-Z0-9]/g, "");
    //First we check if we have a token in secure store

    let tokenFromSecureStore = await SecureStore.getItemAsync(
      `token-${newDatabase}`
    );
    console.log("token from securestore", tokenFromSecureStore);
    tokenFromSecureStore = null;
    if (tokenFromSecureStore !== null && tokenFromSecureStore !== undefined) {
      //If we have a tokenFromSecureStore, we check if it is valid
      const tokenIsValid = await checkTokenIsValid(
        tokenFromSecureStore,
        database
      );
      if (tokenIsValid !== null) {
        //If token is valid, we return it
        return tokenFromSecureStore;
      } else {
        //If token is not valid, we get a new one
        const tokenNew = await getNewToken(database, "getToken");
        return tokenNew;
      }
    } else {
      //If we don't have a token, we get a new one
      const tokenNew = await getNewToken(database);
      return tokenNew;
    }
  } catch (error) {
    throw error;
  }
}

//Method to validate a token
export async function checkTokenIsValid(tokenToValidate, database) {
  try {
    console.log(
      "Checking if saved token is valid",
      `${API_HOST}${database}/validateSession`
    );
    const response = await fetch(`${API_HOST}${database}/validateSession`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenToValidate}`,
      },
    });
    const responseJson = await response.json();
    console.log("responseJson Validate Token", responseJson);
    //console.log("responseJsonCode", responseJson?.messages[0].code);
    //console.log("responseJsonMessage", responseJson?.messages[0].message);
    console.log(
      "responseJsonToken validate token",
      responseJson?.messages[0].message
    );

    if (
      responseJson?.messages[0]?.code === "0" &&
      responseJson?.messages[0]?.message === "OK"
    ) {
      //Now it has been validated, we return the value
      return tokenToValidate;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

//Method to close the token
export async function closeToken(tokenToClose, database, screen) {
  try {
    console.log(
      "Closing token",
      `${API_HOST}${database}/sessions/${tokenToClose}`
    );

    const response = await fetch(
      `${API_HOST}${database}/sessions/${tokenToClose}`,
      {
        method: "delete",
        maxBodyLength: "Infinity",
        headers: {
          // "Content-Type": "application/json",
          // Authorization: `Bearer ${tokenToClose}`,
        },
      }
    );
    const responseJson = await response.json();
    console.log("responseJson Close Token", screen, database, responseJson);
    //console.log("responseJsonCode", responseJson?.messages[0].code);
    //console.log("responseJsonMessage", responseJson?.messages[0].message);
    console.log(
      "responseJsonToken Close token",
      responseJson?.messages[0].message
    );

    if (
      responseJson?.messages[0]?.code === "0" &&
      responseJson?.messages[0]?.message === "OK"
    ) {
      //Now it has been closed, we return the value
      return responseJson?.messages[0].message;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function loginService({ loginObject }) {
  try {
    console.log("Checking loginObject", loginObject);

    const token = await getNewToken("Rentable_06_Socios");

    const response = await fetch(`${API_HOST_LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(loginObject),
    });

    const responseJson = await response.json();
    console.log("responseJsonLogin", responseJson);

    responseCloseToken = await closeToken(token, "Rentable_06_Socios");
    if (
      responseJson?.messages[0]?.code === "0" &&
      responseJson?.messages[0]?.message === "OK"
    ) {
      //We save the token in secure store
      //to-do: save user data in secure store
      return responseJson?.response;
    } else if (
      //error message
      responseJson?.messages[0]?.code !== "0"
    ) {
      console.log("Response json message", responseJson?.messages[0]?.message);
      throw new Error(`${responseJson?.messages[0]?.message}`);
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

// //Desarrollo que se hizo primero con un fake service
// export async function loginService({ username, password }) {
//   try {
//     console.log("Checking login, username, password", username, password);

//     const response = await fetch(`${API_HOST_LOGIN}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: username,
//         password: password,
//       }),
//     });
//     const responseJson = await response.json();
//     console.log("responseJsonLogin", responseJson);
//     if (responseJson?.token?.length > 0) {
//       return responseJson;
//     } else {
//       throw new Error("Usuario o contraseña incorrectos");
//     }
//   } catch (error) {
//     throw error;
//   }
// }

export async function registerService({ username, password }) {
  try {
    console.log("Checking register, username, password", username, password);
    const response = await fetch(`${API_HOST_SIGNUP}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });
    const responseJson = await response.json();
    console.log("responseJsonRegister", responseJson);
    if (responseJson?.token?.length > 0 && responseJson?.id > 0) {
      return responseJson;
    } else {
      throw new Error("Error en registro");
    }
  } catch (error) {
    throw error;
  }
}
