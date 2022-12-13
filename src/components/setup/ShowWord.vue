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
      :value="words.dreamer"
      readonly
      v-if="showWord && players[playerIndex].role === Role.dreamer"
      class="word"
    />
    <button v-if="playerIndex < players.length - 1" @click="nextPlayer">
      Ok
    </button>
    <button v-else @click="startGame">C’est parti</button>
  </div>
</template>
