export function getErrorMessage(error, screen) {
  console.log("Entró a getErrorMessage", error, screen);
  const errorLower = error.toLowerCase();
  let messageReturn = "";
  if (errorLower.includes("no records match the request")) {
    //Check the screen to return the correct message
    if (screen === "Login") {
      messageReturn = "Usuario o contraseña incorrectos";
    } else if (screen === "Clients") {
      messageReturn = "No se encontraron clientes";
    } else if (screen === "CPS") {
      messageReturn = "No se encontraron Contratos de Prestación de Servicios";
    } else if (screen === "Promo") {
      messageReturn = "No se encontraron anuncios";
    } else if (screen === "Work") {
      messageReturn = "No se encontraron trabajos";
    }
  } else {
    messageReturn = `${error}`;
  }
  return messageReturn;
}
