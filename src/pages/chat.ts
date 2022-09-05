//importo state

import { state } from "../state";

type Message = {
  from: string; //quien manda el mensaje
  message: string;
};

class ChatPage extends HTMLElement {
  //el contenido del elemento es renderizado (construido) en connectedCallback.
  //¿Por qué no en el Constructor?
  //porque cuando el Constructor es llamado, es aún demasiado pronto.
  //El elemento es creado, pero el navegador aún no procesó ni asignó atributos
  //en este estado, entonces las llamadas a getAttribute devolverían null.
  //Así que no podemos renderizar (construirlo) ahora.

  //creo una variable (array de objetos) para engancharme al state (los cambios)
  //cada vez que haya mensajes, los guardo acá, en el messages.
  // tiene que arrancar con un array vacio para que no falle.
  shadow: ShadowRoot;
  messages: Message[] = [];
  connectedCallback() {
    console.log("CHAAAAAATTTTT");

    this.shadow = this.attachShadow({ mode: "open" });
    // const currentState = state.getState();

    // //los mensajes del chat, van a ser los guardados en el state.
    // this.messages = currentState.messages;
    // console.log("currentState.messages: ", currentState.messages);

    //cuando ya tenemos los mensajes actualizados,
    //los renderizamos (construimos) again
    //pero esta vez, con datos actuailzados.

    // this.render();
    state.subscribe(() => {
      const currentState = state.getState();
      this.messages = currentState.messages;

      this.shadow.firstChild?.remove();
      // this.render();
      // console.log("render del subscribe");

      // if (this.shadow.firstChild) {
      //   this.shadow.firstChild.remove();
      // }
      this.render();
      console.log("render del subscribe");
    });

    this.shadow.firstChild?.remove();
    this.render();
    console.log("render del connectedCallback");
  }

  addListener() {
    console.log("EN EL chat.addListener()");

    const currentState = state.getState();

    const form = this.shadow.querySelector(".submit-message");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      //como la clase es -
      //se la paso entre []
      //en vez de e.target.new-message, le digo e.target['new-message']

      //   );
      //Le doy al state el mensaje del chat

      state.pushMessage(target["new-message"].value, () => {
        console.log("MENSAJE PUSHEADO");
        console.log("this.messages: ", this.messages);
        console.log("currentState.messages: ", currentState.messages);

        // if (this.messages.length == currentState.messages.length) {
        //   this.shadow.removeChild(this.shadow.children["new-message"]);
        // }

        this.shadow.firstChild?.remove();
        // this.render();
        // console.log("soy render del pushMessage");
      });
    });
  }
  //map() = devuelve la lista de elementos originales transformada
  render() {
    const currentState = state.getState();
    this.messages = currentState.messages;

    const div = document.createElement("div");
    const style = document.createElement("style");
    div.className = "chat";

    div.innerHTML = `
    <div class="home">

      <div class="home_header"></div>

      <div class="container">

      
        <div class="home_form">
          <h1 class='h1'>Chat</h1>

          <div class="messages">
              ${this.messages
                .map((cadaMensaje) => {
                  return `<div class="message">${cadaMensaje.from}:  ${cadaMensaje.message}</div>`;
                })
                .join("")}
          </div>

          <form class="submit-message">
              <input type="text" name='new-message'>
              <button>Enviar</button>
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
          margin: 0 auto;
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

        .messages{
          background-color: red;
          margin: 0 auto;
          // width: 100%;
          height: 300px;
          overflow: auto;
        }

        .submit-message{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          
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

    this.shadow.appendChild(div);
    this.shadow.appendChild(style);

    //cada vez que se redibuje toda la pantalla vuelvo a escuchar
    //los listeners
    this.addListener();
  }
}

customElements.define("chat-page", ChatPage);
