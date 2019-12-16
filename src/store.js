import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    player: [],
    players: [
      { name: 'Julia', points: 0 },
      { name: 'Kamil', points: 0 },
      { name: 'Maciek', points: 0 },
      { name: 'Justyna', points: 0 },
      { name: 'Kasia', points: 0 }
    ],
    questions: {
      puns: [
        { typ: 'Kalambury ', tresc: 'Zły, jak osa', points: 3 },
        { typ: 'Kalambury ', tresc: 'Cicha woda brzegi rwie', points: 3 },
        { typ: 'Kalambury ', tresc: 'Pinokio', points: 3 },
        { typ: 'Kalambury ', tresc: 'Jajko mądrzejsze od kury', points: 3 },
        { typ: 'Kalambury ', tresc: 'O psie, który jeździł koleją', points: 3 },
        { typ: 'Kalambury ', tresc: 'Do wesela się zagoi', points: 3 }
      ],
      task: [
        {
          typ: 'Zadanie',
          tresc: 'Na czworaka zachowuj się jak świnia przez 10 sekund',
          points: 2
        },
        {
          typ: 'Zadanie',
          tresc: 'Weź na barana osobę po lewej stronie',
          points: 2
        },
        {
          typ: 'Zadanie',
          tresc: 'Pocałuj w rękę wszystkich uczestników gry',
          points: 2
        },
        { typ: 'Zadanie', tresc: 'Złap się za tyłek i pokreć nim', points: 2 },
        {
          typ: 'Zadanie',
          tresc: 'Daj się uszczypnąć w rękę wszystkim obecnym',
          points: 2
        },
        {
          typ: 'Zadanie',
          tresc: 'Przez minutę mów najniższym głosem jakim potrafisz',
          points: 2
        }
      ],
      question: [
        {
          typ: 'Pytanie',
          tresc: 'Jaka jest najgłupsza rzecz jaką zrobiłeś/aś w życiu?',
          points: 1
        },
        {
          typ: 'Pytanie',
          tresc: 'Z kim się ostatnio pokłóciłeś?',
          points: 1
        },
        {
          typ: 'Pytanie',
          tresc: 'Czy skłamałeś/aś kiedyś na temat swojego wieku?',
          points: 1
        },
        { typ: 'Pytanie', tresc: 'Jaki jest Twój ulubiony film?', points: 1 },
        {
          typ: 'Pytanie',
          tresc: 'Jakiego youtubera lubisz najbardziej?',
          points: 1
        },
        {
          typ: 'Pytanie',
          tresc: 'Co byś zrobił wiedząc, że masz ostatni tydzień życia?',
          points: 1
        }
      ],
      song: [
        { typ: 'Zanuć', tresc: 'Michael Jackson - Thriller', points: 2 },
        { typ: 'Zanuć', tresc: 'Andrzej Zaucha – Siódmy rok', points: 2 },
        { typ: 'Zanuć', tresc: 'Ewa Bem – Kolega Maj', points: 2 },
        { typ: 'Zanuć', tresc: 'Mela Koteluk – Fastrygi', points: 2 },
        { typ: 'Zanuć', tresc: 'Mrozu – Nic do stracenia', points: 2 },
        {
          typ: 'Zanuć',
          tresc: 'Andrzej Rybiński – Nie liczę godzin i lat',
          points: 2
        }
      ]
    },
    selectedQuesionType: '',
    questionType: '',
    questionContent: '',
    chosenPlayer: '',
    indexOfPlayer: 0,
    selectedQuestion: ''
  },
  mutations: {
    SELECT_QUESTION_TYPE(state) {
      const questionsTypes = [
        state.questions.puns,
        state.questions.task,
        state.questions.question,
        state.questions.song
      ];
      state.selectedQuesionType =
        questionsTypes[Math.floor(Math.random() * questionsTypes.length)];
      state.questionType = state.selectedQuesionType;
    },
    SELECT_QUESTION_CONTENT(state) {
      let index = Math.floor(Math.random() * state.questionType.length);
      state.questionContent = state.selectedQuesionType[index];
    },
    CHOSE_PLAYER(state) {
      if (state.indexOfPlayer < state.players.length) {
        state.chosenPlayer = state.players[state.indexOfPlayer++];
        if (state.indexOfPlayer === state.players.length) {
          state.indexOfPlayer = 0;
        }
      }
    }
  },
  actions: {},
  getters: {}
});
