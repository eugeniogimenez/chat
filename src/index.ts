//Import CustomElements
import "./pages/index";
import "./pages/chat";

//import router
import "./router";

//import state
import { state } from "./state";

(function () {
  console.log("soy main");

  state.init();
})();
