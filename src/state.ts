import { rtdb } from "./rtdb";
import map from "lodash";

const API_BASE_URL = "http://localhost:3000";

// type Message = {
//   from: string; //quien manda el mensaje
//   message: string;
// };

const state = {
  data: {
    nombre: "",
    messages: [],
  },

  listeners: [],

  //avisa los cambios en la rtdb
  init() {
    console.log("Soy state.init()");

    const chatroomsRef = rtdb.ref("/chatrooms/general"); //en /chatrooms/general van a estar todos los mensajes de las personas que participen
    const currentState = this.getState();
    //al ser realtime tenemos la "foto" del momento = snapshot
    //la vamos a escuchar cada vez que cambie el valor('value')

    //esto lo vamos a enchufar al State para que le avise a los Components
    //escuchamos si hay algun cambio en el chat.
    chatroomsRef.on("value", (snapshot) => {
      const messageFromServer = snapshot.val();
      console.log("messageFromServer: ", messageFromServer);
      console.log(
        "messageFromServer.messages.message: ",
        messageFromServer.messages.message
      );

      // console.log(
      //   "messageFromServer.general desde State.init(): ",
      //   messageFromServer.general
      // );
      //Cada vez que en el Server haya un cambio en .general
      //actualizamos el state

      const messagesList = map(messageFromServer.messages);
      currentState.messages = messagesList;

      console.log("currentState: ", currentState);
      this.setState(currentState);
    });
  },

  getState() {
    return this.data;
  },

  ///agrego
  setNombre(nombre: string) {
    console.log(
      "Soy state.setNombre(nombre), y el nombre recibido es: ",
      nombre
    );

    const currentState = this.getState(); // = data
    currentState.nombre = nombre; // = data.nombre

    //piso el nombre que tenía con el nombre recibido
    this.setState(currentState);
  },

  //Le manda al Backend el mensaje nuevo
  //La rtdb
  //Mezclo un dato nuevo, el message, con un dato que tenia: nombre.
  pushMessage(message: string) {
    console.log("soy state.pushMessage(message), y mi mensaje es: ", message);

    const nombreQueGuardeEnElState = this.data.nombre;
    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: nombreQueGuardeEnElState,
        message: message,
      }),
    });
  },
  ///

  setState(newState) {
    this.data = newState;

    for (const i of this.listeners) {
      i();
    }

    console.log("Soy state.setState(newState) y mi newState es: ", newState);
  },

  subscribe(callback: (any) => any) {
    console.log("soy state.subscribe()");

    this.listeners.push(callback);
  },
};

export { state };