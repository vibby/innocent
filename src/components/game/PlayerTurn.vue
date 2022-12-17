<script setup lang="ts">
import { ref } from "vue";
import { usePlayersStore } from "@/stores/players";
import { storeToRefs } from "pinia";
import IconBubbles from "@/components/icons/IconBubbles.vue";
import { useRouter } from "vue-router";
import { useWordsStore } from "@/stores/words";

const playersStore = usePlayersStore();
const { getActivePlayers, players } = storeToRefs(playersStore);
const wordsStore = useWordsStore();
const { words } = storeToRefs(wordsStore);

const playerIndex = ref(0);

function nextPlayer() {
  playerIndex.value++;
}

function newTurn() {
  playerIndex.value = 0;
}

const router = useRouter();
if (
  players.value.length < 3 ||
  !words?.value.attentive ||
  !words?.value.innate
) {
  router.push({ name: "users" });
}
</script>

<template>
  <h1 class="currentPlayer">
    <icon-bubbles />&nbsp; <small>Au tour de</small>&nbsp;<strong>{{
      getActivePlayers[playerIndex].name
    }}</strong>
  </h1>
  <p>
    Tous les yeux se braque sur lui. Il ne peut pas dire le mot qu’il a retenu,
    pour ne pas le révéler aux tires-au-flanc.
  </p>
  <p>
    Mais il peut donner un indice (mot ou expression) pour rassurer ses
    collaborateurs !
  </p>
  <div v-if="playerIndex < getActivePlayers.length - 1">
    <button @click="nextPlayer()">Suivant</button>
  </div>
  <div v-else>
    <h2>Il est temps pour une décision collective !</h2>
    <ul class="buttonList">
      <li>
        <button @click="newTurn()">Pas sûr ? Refaite un tour de table</button>
      </li>
      <li>
        <router-link to="/end-turn">
          <button role="link">Virer un collaborateur</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>
