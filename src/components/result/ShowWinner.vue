<script setup lang="ts">
import { usePlayersStore } from "@/stores/players";
import { storeToRefs } from "pinia";
import { Role } from "@/domain/role";
import { useRouter } from "vue-router";
import { useWordsStore } from "@/stores/words";

const playersStore = usePlayersStore();
const { getWinner } = storeToRefs(playersStore);

const wordsStore = useWordsStore();

const router = useRouter();
function newGame() {
  wordsStore.chooseWords();
  playersStore.initGame();
  router.push({ name: "words" });
}
</script>

<template>
  <h1 class="currentPlayer">
    Bravo
    <span v-if="getWinner === Role.attentive">les attentifs</span>
    <span v-if="getWinner === Role.innate">les rêveurs</span>
  </h1>
  <button @click="newGame">Nouvelle réunion</button>
</template>
