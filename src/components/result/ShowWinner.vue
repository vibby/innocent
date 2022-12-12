<script setup lang="ts">
import { usePlayersStore } from "@/stores/players";
import { storeToRefs } from "pinia";
import { Role } from "@/object/role";
import { useRouter } from "vue-router";
import { useWordsStore } from "@/stores/words";

const playersStore = usePlayersStore();
const { getWinner } = storeToRefs(playersStore);

const wordsStore = useWordsStore();

const router = useRouter();
function newGame() {
  wordsStore.chooseWords();
  playersStore.randomizeRoles();
  playersStore.randomizeOrder();
  playersStore.activateAll();
  router.push({ name: "words" });
}
</script>

<template>
  <h1 class="currentPlayer">
    Bravo
    <span v-if="getWinner === Role.Attentive">les attentifs</span>
    <span v-if="getWinner === Role.Dreamer">les rêveurs</span>
  </h1>
  <button @click="newGame">Nouvelle réunion</button>
</template>
