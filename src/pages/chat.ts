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

      this.render();
      console.log("render del subscribe");
    });

    this.render();
    console.log("render del connectedCallback");
  }

  addListener() {
    console.log("EN EL chat.addListener()");

    const form = this.querySelector(".submit-message");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;

      //como la clase es -
      //se la paso entre []
      state.pushMessage(target["new-message"].value);
    });
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

    this.appendChild(style);

    //cada vez que se redibuje toda la pantalla vuelvo a escuchar
    //los listeners
    this.addListener();
  }
}

customElements.define("chat-page", ChatPage);
