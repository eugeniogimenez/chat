import { Router } from "@vaadin/router"; //El router usa una libreria

const router = new Router(document.querySelector(".root")); //le digo en que parte de mi html montar y desmontar
router.setRoutes([
  //le doy las rutas de los custom elements
  { path: "/", component: "home-page" },
  { path: "/chat", component: "chat-page" },
]);
