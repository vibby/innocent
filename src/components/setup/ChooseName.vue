<script setup lang="ts">
import { ref } from "vue";
import { usePlayersStore } from "@/stores/players";
import { useWordsStore } from "@/stores/words";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const wordsStore = useWordsStore();

const playersStore = usePlayersStore();
const { players } = storeToRefs(playersStore);

const name = ref("");

function addItemAndClear(playerName: string) {
  if ("" === playerName) {
    return;
  }
  playersStore.addPlayer(playerName);
  name.value = "";
}

const router = useRouter();
function showWords() {
  wordsStore.chooseWords();
  playersStore.randomizeRoles();
  playersStore.randomizeOrder();
  router.push({ name: "words" });
}
</script>

<template>
  <form @submit.prevent="addItemAndClear(name)">
    <button v-if="players.length >= 3" @click="showWords" class="mainButton">
      Commencer la partie !
    </button>
    <h1>Joueur {{ players.length + 1 }}</h1>
    <input v-model="name" type="text" />
    <button>Valider</button>
  </form>
</template>

<style scoped>
.mainButton {
  margin-bottom: 2.6rem;
}
</style>
