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
let modified = false;

function addItemAndClear(playerName: string) {
  if (checkValidationError()) {
    return;
  }
  playersStore.addPlayer(playerName);
  name.value = "";
  modified = false;
}

const router = useRouter();
function showBriefing() {
  wordsStore.chooseWords();
  playersStore.initGame();
  router.push({ name: "words" });
}

function checkValidationError(ignoreIfNotModified = true): boolean {
  return nameUsed(ignoreIfNotModified) || nameEmpty(ignoreIfNotModified);
}

function nameEmpty(ignoreIfNotModified = true): boolean {
  if (!modified && ignoreIfNotModified) {
    return false;
  }
  return name.value === "";
}

function nameUsed(ignoreIfNotModified = true): boolean {
  if (!modified && ignoreIfNotModified) {
    return false;
  }
  for (const player of players.value) {
    if (name.value === player.name) {
      return true;
    }
  }
  return false;
}
</script>

<template>
  <form @submit.prevent="addItemAndClear(name)">
    <button
      v-if="players.length >= 3"
      @click="showBriefing"
      class="mainButton"
      type="button"
    >
      Commencer la partie !
    </button>
    <div v-if="players.length < 8">
      <p>
        Le patron veut voir tout le monde en salle de réunion dans 5 minutes.
        Émargez vos noms !
      </p>
      <h1>Collaborateur {{ players.length + 1 }}</h1>
      <input
        v-model="name"
        type="text"
        :class="{ inputError: checkValidationError() }"
        @keyup="modified = true"
      />
      <button>Valider</button>
      <div class="formErrorMessage" v-if="nameUsed()">Nom déjà utilisé</div>
      <div class="formErrorMessage" v-if="nameEmpty()">Ne peut être vide</div>
    </div>
  </form>
</template>

<style scoped>
.mainButton {
  margin-bottom: 2.6rem;
}
</style>
