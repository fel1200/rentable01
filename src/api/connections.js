//imports from constants
import {
  API_HOST,
  API_HOST_VALIDATE,
  API_HOST_LOGIN,
  API_HOST_SIGNUP,
} from "../utils/constants";

//To import secure-store
import * as SecureStore from "expo-secure-store";

//Method to get the information from CPS given an object of CPS_RK_Cliente
export async function getCPSInfo(cpsObject) {
  try {
    //First check if last token is still valid

    //First call to get the token
    //const token = await getNewToken();
    const token = await getNewToken("Rentable_08_Servicios");
    if (token !== null) {
      console.log("token", token);
      console.log("cpsObject", cpsObject);
      //Second call to get the info
      const response = await fetch(
        `${API_HOST}Rentable_08_Servicios/layouts/API_CPS/_find`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cpsObject),
        }
      );
      const responseJson = await response.json();
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
        return null;
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
    //const token = await getNewToken();
    const token = await getNewToken("Rentable_06_Socios");
    if (token !== null) {
      console.log("token", token);
      console.log("clientObject", clientsObject);
      //Second call to get the info of clients
      console.log(
        "URL api host",
        `${API_HOST}Rentable_06_Socios/layouts/API_Socios/_find`
      );
      //url: 'https://rentable.site/fmi/data/vLatest/databases/Rentable_06_Socios/layouts/API_Socios/_find',
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
      const responseJson = await response.json();
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
export async function getPromoInfo(promoObject) {
  try {
    //First check if last token is still valid

    //First call to get the token
    //const token = await getNewToken();
    const token = await getNewToken("Rentable_08_Servicios");
    if (token !== null) {
      console.log("token", token);
      console.log("promoObject", promoObject);
      //Second call to get the info of clients
      console.log(
        "URL api host",
        `${API_HOST}Rentable_08_Servicios/layouts/API_CPSDetalle/_find`
      );
      //url: 'https://rentable.site/fmi/data/vLatest/databases/Rentable_06_Socios/layouts/API_Socios/_find',
      const response = await fetch(
        `${API_HOST}Rentable_08_Servicios/layouts/API_CPSDetalle/_find`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(promoObject),
        }
      );
      const responseJson = await response.json();
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
export async function getWorkInfo(workObject) {
  try {
    //First check if last token is still valid

    //First call to get the token
    //const token = await getNewToken();
    const token = await getNewToken("DBR_Op_NC");
    if (token !== null) {
      console.log("token", token);
      console.log("workObject", workObject);
      //Second call to get the info of clients
      console.log(
        "URL api host",
        `${API_HOST}DBR_Op_NC/layouts/API_Trabajos/_find`
      );
      //url: 'https://rentable.site/fmi/data/vLatest/databases/Rentable_06_Socios/layouts/API_Socios/_find',
      const response = await fetch(
        `${API_HOST}DBR_Op_NC/layouts/API_Trabajos/_find`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(workObject),
        }
      );
      const responseJson = await response.json();
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
export async function getNewToken(database) {
  try {
    console.log("starting get new token", `${API_HOST}${database}/sessions`);
    const response = await fetch(`${API_HOST}${database}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic dXNlckFQSTpBcDFGMWwz",
      },
    });
    const responseJson = await response.json();
    console.log("responseJson", responseJson);
    //console.log("responseJsonCode", responseJson?.messages[0].code);
    //console.log("responseJsonMessage", responseJson?.messages[0].message);
    console.log("responseJsonToken", responseJson?.messages[0].message);

    if (
      responseJson?.messages[0]?.code === "0" &&
      responseJson?.messages[0]?.message === "OK"
    ) {
      //We save the token in secure store
      await SecureStore.setItemAsync("token", responseJson?.response?.token);
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
}

//Method to check the current token
export async function getToken(database) {
  try {
    //First we check if we have a token in secure store
    const tokenFromSecureStore = await SecureStore.getItemAsync("token");
    console.log("token from securestore", tokenFromSecureStore);
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
        const tokenNew = await getNewToken(database);
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

export async function loginService({ username, password }) {
  try {
    console.log("Checking login, username, password", username, password);

    const response = await fetch(`${API_HOST_LOGIN}`, {
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
    console.log("responseJsonLogin", responseJson);
    if (responseJson?.token?.length > 0) {
      return responseJson;
    } else {
      throw new Error("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    throw error;
  }
}
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
