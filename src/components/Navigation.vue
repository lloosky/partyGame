<template>
  <div class="nav-container">
    <div class="logo">
      <p>partygame</p>
    </div>
    <div class="buttons-container">
      <div class="game-buttons">
        <button @click="startNewGame" id="new_game" v-if="!showNameInput">nowa gra</button>
        <transition-group name="opacityTransition" mode="out-in" class="name_button_container">
          <input
            type="text"
            placeholder="wpisz swoje imię"
            v-if="showNameInput"
            v-model="username"
            @keydown.enter="confirmNewGame"
            key="inputNewGameName"
          />
          <button
            class="button-normal"
            v-if="showNameInput"
            key="button"
            @click="confirmNewGame"
          >Dalej</button>
        </transition-group>
        <button @click="showPinInput = !showPinInput" v-if="!showPinInput">dołącz do gry</button>
        <transition-group name="opacityTransition" mode="out-in" class="name_pin_button_container">
          <input
            type="text"
            placeholder="wpisz kod pin"
            v-if="showPinInput"
            key="inputPin"
            v-model="pinValue"
          />
          <input
            type="text"
            placeholder="wpisz swoje imię"
            v-if="showPinInput"
            v-model="username"
            key="inputLoadGameName"
            @keydown.enter="confirmLoadGame"
          />
          <button class="button-normal" v-if="showPinInput" key="button" @click="confirmLoadGame">Dalej</button>
        </transition-group>
        <button>opcje</button>
      </div>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: io("http://localhost:3000"),
      showPinInput: false,
      showNameInput: false,
      username: "",
      displayStyle: '',
      pinValue: '',
      checkPin: ''
    };
  },
  methods: {
    startNewGame() {
      this.showNameInput = true;
      this.socket.emit("CREATE_PIN", this.createdPin);
      localStorage.setItem("newGamePin", this.createdPin);
    },
    confirmNewGame() { 
      this.socket.emit("newUser", this.username);
      this.player.push(this.username)
      this.$router.push(`/game/${this.username}`)
      this.username = ""; 
    },
    confirmLoadGame() {
      this.socket.emit('createdPin', Number(this.pinValue))
      this.socket.on('pinIsCorrect', data => {
        this.checkPin = data
      })
      if (this.checkPin === true) {
        this.confirmNewGame()
      } else {
        alert('Błędny PIN')
      }
    }
  },
  computed: {
    createdPin() {
      let arr = [];
      arr.push(Math.floor(Math.random() * 9999));
      return arr[0];
    },
    player() {
      return this.$store.state.player
    }
  },
  mounted () {
      this.socket.on('DISABLED_NEWGAME', (data) => {
          document.getElementById('new_game').style.display = data
      })  
  }
};
</script>
<style scoped>
.name_button_container,
.name_pin_button_container {
  display: grid;
  grid-template-columns: 60% 30%;
  grid-gap: 10px;
  width: 100%;
  justify-content: center;
}
.name_pin_button_container {
  grid-template-columns: 30% 30% 30%;
}
.button-normal {
  margin-top: 10px;
}
input {
  width: 100%;
  border-radius: 25px;
  border: 1px solid #afafaf;
  margin-top: 10px;
  padding: 0.4rem;
  background-color: #ffffff29;
  text-align: center;
  color: white;
}
.logo {
  width: 50vw;
  display: grid;
  justify-content: center;
  align-content: center;
}
.logo > p {
  font-size: 6rem;
  font-family: "Monoton", cursive;
  border-top: 1px solid #ffeb62;
  border-bottom: 1px solid white;
}
.nav-container {
  display: grid;
  justify-items: center;
}
.buttons-container {
  width: 70%;
}
.game-buttons {
  box-shadow: none;
  background-color: transparent;
  width: 100%;
  display: block;
}
.game-buttons > button {
  width: 100%;
  margin-top: 10px;
}
.opacityTransition-enter-active {
  animation: opacityTransition-in 0.3s ease-out;
}
.opacityTransition-leave-active {
  animation: opacityTransition-out 0.3s ease-out;
}
@keyframes opacityTransition-in {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes opacityTransition-out {
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(-50px);
  }
}
@media (max-width:768px) {
  .buttons-container {
    width: 80vw !important;
  }
}
</style>
