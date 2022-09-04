// Importo el ruter
import { Router } from "@vaadin/router";
import { state } from "../state";

class Home extends HTMLElement {
  //el contenido del elemento es renderizado (construido) en connectedCallback.
  //¿Por qué no en el constructor?
  //porque cuando el constructor es llamado, es aún demasiado pronto.
  //El elemento es creado, pero el navegador aún no procesó ni asignó atributos
  //en este estado, entonces las llamadas a getAttribute devolverían null.
  //Así que no podemos renderizar (construirlo) ahora.
  connectedCallback() {
    this.render();

    const form = this.shadowRoot.querySelector(".form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      console.log("e.target.nombre.value: ", target.nombre.value);

      //Le paso el nombre que ingresaron en el formulario
      state.setNombre(target.nombre.value);
      //go() es una funcion del Router para ir a...
      Router.go("/chat");
    });
  }

  render() {
    const shadow = this.attachShadow({ mode: "open" });

    // div
    const div = document.createElement("div");

    //style
    const style = document.createElement("style");

    div.innerHTML = `
    <div class="home">

      <div class="home_header"></div>

      <div class="container">

      
        <div class="home_form">
          <h1 class='h1'>Bienvenidos</h1>

          <form class="form">
              <div class="">
                  <label>Tu nombre</label>
              </div>
              <input type="text" name="nombre">
              <button>Comenzar</button>
          </form>
          
        </div>

      </div>

      
    </div>
      `;

    style.innerHTML = `
      .home {
        display: flex;
        flex-direction: column;
        
      }

      .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .home_form{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .home_header {
        background-color: #FF8282;
        height: 60px;
        width: 100%;
      }

      .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .h1 {
        font-size: 52px;
      }
      label{
        font-size: 24px;
      }

      input {
        width: 303px;
        height: 55px;
        margin-bottom: 16px;
      }

      button {
        width: 312px;
        height: 55px;
        background-color: #9CBBE9;
      }
    `;

    shadow.appendChild(div);
    shadow.appendChild(style);
  }
}

customElements.define("home-page", Home);
