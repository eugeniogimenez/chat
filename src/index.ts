//FRONTEND:
//Solo puede "escuchar"

//Importo los CustomElements
import "./pages/index";
import "./pages/chat";

//importo el router
import "./router";

//importo state
import { state } from "./state";

(function () {
  console.log("soy main");

  state.init();

  // const button = document.querySelector(".conectar");
  // button.addEventListener("click", conectarAlChatroom);
})();

// //CONEXIÓN CON LA DB
// import firebase from "firebase";
// const API_BASE_URL = "http://localhost:3000";

// const app = firebase.initializeApp({
//   apiKey: "md9MSYiAiNJZmxVju4H3tgfzfXT1g7qh9IvXhmbJ",
//   authDomain: "projectID.firebaseapp.com",
//   databaseURL: "https://apx-dwf-m6-elg-default-rtdb.firebaseio.com",
//   // projectID: "apx-dwf-m6-elg",
// });

// const database = firebase.database();

// function conectarAlChatroom() {
//   console.log("soy conectarAlChatroom");

//fetch le pide a la bd mediante: localhost:3000/chatroom usando "post" (crear)
//precisamente que "cree" un chatroom con un id
//(esto está en la funcion app.post)
//   fetch(API + "/chatroom", {
//     method: "post",
//   })
//     .then((res) => {
//       //una vez que lo crea, me da la respuesta en http
//       //asi que para leerlo lo extraigo con .json() para poder usarlo
//       console.log("soy el chatroom creado ", res);

//       return res.json();
//     })
//     .then((data) => {
//       console.log("soy el chatroom en Json: ", data);

//       //Hacemos "referencia" a la parte de la DB realtime
//       //dandole el ID del chat que acabamos de crear
//       const chatroomsRef = database.ref("/chatrooms/" + data.id);

//       //al ser realtime tenemos la "foto" del momento = snapshot
//       //la vamos a escuchar cada vez que cambie el valor('value')

//       //esto lo vamos a enchufar al State para que le avise a los Components
//       //escuchamos si hay algun cambio en el chat.
//       chatroomsRef.on("value", (snapshot) => {
//         const valor = snapshot.val();

//         document.querySelector(".id").innerHTML = JSON.stringify(data.id); //muestro el id
//         document.querySelector(".root").innerHTML = JSON.stringify(valor); //muestro el valor
//       });
//     });
// }
