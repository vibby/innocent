<script setup lang="ts">
import { usePlayersStore } from "@/stores/players";
import type { Player } from "@/stores/players";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import IconToolbox from "@/components/icons/IconToolbox.vue";

const playersStore = usePlayersStore();
const { players } = storeToRefs(playersStore);

const router = useRouter();
function excludeUser(player: Player) {
  console.log(player.name);
  router.push({ name: "game" });
}
</script>

<template>
  <h1 class="currentPlayer">
    <icon-toolbox />&nbsp; C’est le temps d’éliminer
  </h1>
  <ul class="buttonList">
    <li v-for="player in players" v-bind:key="player.name">
      <button @click="excludeUser(player)">
        {{ player.name }}
      </button>
    </li>
  </ul>
</template>
