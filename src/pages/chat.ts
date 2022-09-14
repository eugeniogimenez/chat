import { state } from "../state";

type Message = {
  from: string;
  message: string;
};

class ChatPage extends HTMLElement {
  messages: Message[] = [];

  connectedCallback() {
    state.subscribe(() => {
      const currentState = state.getState();
      this.messages = currentState.messages;

      //este this.render() se activa cada vez que reinicia
      //es decir, después de ingresar una nueva palabra/frase al chat.
      this.render();
      console.log("render del subscribe");

      const messages = this.querySelector(".messages");
      messages.scrollTop = messages.scrollHeight;
    });

    //este this.render() se activa al iniciar
    this.render();
    console.log("render del connectedCallback");

    const messages = this.querySelector(".messages");
    messages.scrollTop = messages.scrollHeight;
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
                  return `<div class="message" mensajeDe='${cadaMensaje.from}'>${cadaMensaje.message}</div>`;
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
        *{
          margin: 0;
          padding: 0; 
          box-sizing: border-box;
        }

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
        }
  
        .form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          
        }
  
        .h1 {
          font-size: 52px;
          margin: 0 0 20px;
        }

        .messages{
          margin: 0 auto;
          width: 100%;
          height: 370px;
          overflow: auto;
          overflow-x: hidden;
          overflow-y: hidden;
        }

        .mensajes-sent {
          display: flex;
          max-width: 75%;
          margin: 2px 0 2px auto;

          background-color: #B9E97C;
          font-size: 18px;
          padding: 10px;
          margin-bottom: 12px;
          min-height: 20px;
          border-radius: 20px 20px 20px 20px;
        }

        .mensajes-received {
          display: flex;
          max-width: 75%;

          background-color: #D8D8D8;
          font-size: 18px;
          padding: 10px;
          margin-bottom: 12px;
          min-height: 20px;
          border-radius: 20px 20px 20px 20px;
          
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

    //  chequeamos autor
    const messages = this.querySelectorAll(".message");
    const currentUser = currentState.nombre;

    messages.forEach((message) => {
      const autor = message.getAttribute("mensajeDe");

      if (autor == currentUser) {
        message.classList.add("mensajes-sent"); //activado
      } else if (autor !== currentUser) {
        message.classList.add("mensajes-received");
      }
    });
  }
}

customElements.define("chat-page", ChatPage);
