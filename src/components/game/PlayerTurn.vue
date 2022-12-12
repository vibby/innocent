<script setup lang="ts">
import { ref } from "vue";
import { usePlayersStore } from "@/stores/players";
import { storeToRefs } from "pinia";
import IconBubbles from "@/components/icons/IconBubbles.vue";

const playersStore = usePlayersStore();
const { players } = storeToRefs(playersStore);

const playerIndex = ref(0);

function nextPlayer() {
  playerIndex.value++;
}

function newTurn() {
  playerIndex.value = 0;
}
</script>

<template>
  <h1 class="currentPlayer">
    <icon-bubbles />&nbsp; <small>Au tour de</small>&nbsp;<strong>{{ players[playerIndex].name }}</strong>
  </h1>
  <button v-if="playerIndex < players.length - 1" @click="nextPlayer()">
    Suivant
  </button>
  <div v-else>
    <ul class="buttonList">
      <li>
        <button @click="newTurn()">Refaire un tour</button>
      </li>
      <li>
        <router-link to="/end-turn">
          <button role="link">Éliminer un joueur</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>
