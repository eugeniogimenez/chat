//FRONTEND/CLIENT:
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
})();
