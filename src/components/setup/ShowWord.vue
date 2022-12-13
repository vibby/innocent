<script setup lang="ts">
import { ref } from "vue";
import { usePlayersStore } from "@/stores/players";
import { useWordsStore } from "@/stores/words";
import { storeToRefs } from "pinia";
import { Role } from "@/domain/role";
import { useRouter } from "vue-router";
import IconBook from "@/components/icons/IconBook.vue";

const playersStore = usePlayersStore();
const { players } = storeToRefs(playersStore);
const wordsStore = useWordsStore();
const { words } = storeToRefs(wordsStore);

const playerIndex = ref(0);
const showWord = ref(false);

function revealWord() {
  showWord.value = true;
}

function nextPlayer() {
  playerIndex.value++;
  showWord.value = false;
}

const router = useRouter();
function startGame() {
  router.push({ name: "game" });
}
</script>

<template>
  <h1>Réunion de crise !</h1>
  <p>
    La réunion bat son plein. Le patron met les points sur les i. Après avoir
    expliqué le mot crucial de la situation, il réalise que certains membres de
    l’équipe ne sont pas attentifs. Dans sa rage, il quitte la salle de réunion
    en sommant l’ordre d’exclure le (ou les) traitres.
  </p>
  <p>
    Vous devez donc identifier ceux qui ont entendu ce mot et les autres.
    D’ailleurs l’avez-vous bien entendu vous-même ? Chaque collaborateur va
    maintenant fouiller sa mémoire pour se rappeler du mot …
  </p>
  <h1 class="currentPlayer">
    <icon-book />&nbsp;<small>Voici le mot pour</small>&nbsp;<strong>{{
      players[playerIndex].name
    }}</strong>
  </h1>
  <button v-if="!showWord" @click="revealWord()">C’est moi</button>
  <div v-if="showWord">
    <input
      :value="words.attentive"
      readonly
      v-if="showWord && players[playerIndex].role === Role.attentive"
      class="word"
    />
    <input
      :value="words.innate"
      readonly
      v-if="showWord && players[playerIndex].role === Role.innate"
      class="word"
    />
    <button v-if="playerIndex < players.length - 1" @click="nextPlayer">
      Ok
    </button>
    <button v-else @click="startGame">C’est parti</button>
  </div>
</template>
