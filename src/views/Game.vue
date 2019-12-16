<template>
  <div>
    <transition name="opacityTransition" mode="out-in">
      <alert-box v-if="showAlertBox" @accept="confirmAlert" :title="title" :howIsNext="howIsNext"></alert-box>
    </transition>
    <div class="logo">
      <p>partygame</p>
    </div>
    <!-- <h2>Witaj {{player[0]}}</h2> -->
    <div class="players">
      <p>Aktualnie odpowiada: {{whoTurn}}</p>
      <p>
        <CountDown
          id="countdownTimer"
          ref="countdown"
          :time="1500"
          @onProgress="countDownProgress"
          @onFinish="countDownFinished"
        >Czas na odpowiedź {{countDownSeconds}}s</CountDown>
      </p>
      <p>PIN: {{generatedPinCode}}</p>
    </div>
    <div class="question-table">
      <div class="question-container">
        <div id="questionContent">
          <p>({{ question.points }} pkt)</p>
          <p>{{ question.question }}</p>
        </div>
      </div>
    </div>
    <div class="buttons-container">
      <div class="game-buttons">
        <button @click="nextQuestion">pomiń</button>
        <button @click="passedQuestion">zaliczone</button>
      </div>
    </div>
    <div class="players-table">
      <ul>
        <h4>Zawodnicy</h4>
        <li v-for="(player, index) in users" :key="player.index">
          {{player.name}}
          <span>{{player.points}} pkt</span>
        </li>
      </ul>
      <button id="restart" @click="restartGame">zacznij od nowa</button>
    </div>
  </div>
</template>
<script>
import CountDown from "vuejs-count-down";
import AlertBox from "./../components/AlertBox.vue";
import io from "socket.io-client";

export default {
  name: "game",
  data() {
    return {
      socket: io("http://192.168.0.104:3000"),
      players: this.$store.state.players,
      autoStart: false,
      showAlertBox: false,
      countDownSeconds: "",
      title: "",
      howIsNext: "",
      users: [],
      question: "",
      whoTurn: ""
    };
  },
  methods: {
    searchQuestion() {
      this.selectedQuestion = this.question[
        Math.floor(Math.random() * this.question.length)
      ];
    },
    addPoints() {
      this.socket.emit("ADD_POINTS", this.question.points, this.whoTurn);
    },
    subtractPoints() {
      this.socket.emit("SUBSTRACT_POINTS", this.question.points, this.whoTurn);
    },
    passedQuestion() {
      this.endOfTime(
        `${this.whoTurn} zdobywa ${this.question.points} pkt.`,
        this.nextPlayer
      );
      this.addPoints();
    },
    notPassedQuestion() {
      this.endOfTime(
        `Czas minął! Tracisz ${this.question.points} pkt.`,
        this.nextPlayer
      );
      this.subtractPoints();
    },
    nextQuestion() {
      this.subtractPoints();
      this.endOfTime(
        `${this.whoTurn} traci ${this.question.points} pkt.`,
        this.nextPlayer
      );
    },
    endOfTime(content, next) {
      this.title = content;
      this.howIsNext = next;
      this.$refs.countdown.$emit("stop");
      this.showAlertBox = true;
    },
    countDownProgress(time) {
      this.countDownSeconds = time;
    },
    countDownFinished() {
      // restart when countdown ends
      this.notPassedQuestion();
    },
    confirmAlert() {
      this.endOfTimeInfo = [];
      this.socket.emit("CHOSEN_PLAYER");
      this.$refs.countdown.$emit("restart");
      this.showAlertBox = false;
    },
    restartGame() {
      this.$refs.countdown.$emit("restart");
      this.socket.emit("RESTART_GAME", 0);
    }
  },
  computed: {
    player() {
      return this.$store.state.player;
    },
    nextPlayer() {
      let indexOfplayer = this.users
        .map(function(param) {
          return param.name;
        })
        .indexOf(this.whoTurn);
      let newIndex = indexOfplayer + 1;
      if (newIndex >= this.users.length) {
        newIndex = 0;
        return this.users[newIndex].name;
      }
      return this.users[newIndex].name;
    },
    generatedPinCode() {
      return localStorage.getItem("newGamePin");
    }
  },
  created() {
    this.autoStart = true;
    for (let x in this.players) {
      this.players[x].points = 0;
    }
    this.socket.emit("CHOSEN_PLAYER");
    this.socket.on("USERS", data => {
      this.users = data;
    });
  },
  mounted() {
    this.socket.on("USERS", data => {
      this.users = data;
    });
    this.socket.on("choseQuestion", data => {
      this.question = data;
    });
    this.socket.on("PICKED_PLAYER", data => {
      this.whoTurn = data;
      if (this.whoTurn === this.player[0]) {
        document.getElementById("questionContent").className = "visible";
        document.getElementById("countdownTimer").style.display = "grid";
        this.$refs.countdown.$emit("restart");
      } else {
        document.getElementById("questionContent").className = "hidden";
        document.getElementById("countdownTimer").style.display = "none";
        this.$refs.countdown.$emit("stop");
      }
      if (this.player[0] === this.users[0].name) {
        document.getElementById("restart").style.display = "grid";
      } else {
        document.getElementById("restart").style.display = "none";
      }
    });
  },
  components: {
    CountDown,
    AlertBox
  }
};
</script>
<style>
#questionContent {
  transition: 0.15s all;
  display: grid;
}
.visible {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}
.hidden {
  visibility: hidden;
  opacity: 0;
  transform: scale(0.5);
}
#restart {
  display: none;
  background-color: transparent;
  border: 1px solid #ffeb62;
  border-radius: 25px;
  color: white;
  font-size: 0.8rem;
  padding: 0.4rem;
  opacity: 0.5;
  transition: 0.3s all;
}
#restart:hover {
  opacity: 1;
}
.logo {
  width: 100vw;
  display: grid;
  justify-content: center;
  align-content: center;
}
.logo > p {
  font-size: 2rem;
  font-family: "Monoton", cursive;
  border-top: 1px solid #ffeb62;
  border-bottom: 1px solid white;
  margin: 1rem;
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
    /* transform: translateX(-50px); */
  }
  100% {
    opacity: 1;
    /* transform: translateX(0px); */
  }
}
@keyframes opacityTransition-out {
  0% {
    opacity: 1;
    /* transform: translateX(0px); */
  }
  100% {
    opacity: 0;
    /* transform: translateX(-50px); */
  }
}
</style>