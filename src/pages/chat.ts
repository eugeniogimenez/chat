//importo state

import { state } from "../state";

type Message = {
  from: string;
  message: string;
};

class ChatPage extends HTMLElement {
  messages: Message[] = [];
  connectedCallback() {
    console.log("CHAAAAAATTTTT");

    state.subscribe(() => {
      const currentState = state.getState();
      this.messages = currentState.messages;

      //este this.render() se activa cada vez que reinicia
      //es decir, después de ingresar una nueva palabra/frase al chat.
      this.render();
      console.log("render del subscribe");
    });

    //este this.render() se activa al iniciar
    this.render();
    console.log("render del connectedCallback");
  }

  addListener() {
    console.log("EN EL chat.addListener()");

    const form = this.querySelector(".submit-message");
    const messages = this.querySelector(".messages");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;

      //como la clase es -
      //se la paso entre []
      state.pushMessage(target["new-message"].value);
    });

    messages.scrollTop = messages.scrollHeight;
  }

  render() {
    const currentState = state.getState();
    this.messages = currentState.messages;

    const style = document.createElement("style");
    this.className = "chat";

    this.innerHTML = `
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
              <input type="text" name='new-message' class='input'>
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
          padding: 10px;
        }
  
        .home_form{
          border: solid;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0 auto;
          width: 100%;
        }
  
        .home_header {
          background-color: #FF8282;
          height: 60px;
          width: 100%;
          border:solid;
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
          width: 100%;
          height: 300px;
          overflow: auto;
        }

        .submit-message{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 10px auto;
        }
  
        input {
          width: 75%;
          height: 55px;
          
          margin-bottom: 16px;
        }
  
        button {
          width: 75%;
          height: 55px;
          background-color: #9CBBE9;
        }
      `;

    this.appendChild(style);

    //cada vez que se redibuje toda la pantalla vuelvo a escuchar
    //los listeners
    this.addListener();
  }
}

customElements.define("chat-page", ChatPage);
