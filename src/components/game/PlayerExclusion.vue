<script setup lang="ts">
import { usePlayersStore } from "@/stores/players";
import type { Player } from "@/stores/players";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import IconToolbox from "@/components/icons/IconToolbox.vue";
import { Role } from "@/domain/role";

const playersStore = usePlayersStore();
const { getActivePlayers } = storeToRefs(playersStore);

const router = useRouter();
function excludeUser(player: Player) {
  if (player.role === Role.sleeper) {
    player.isProposing = true;
    router.push({ name: "proposal" });
    return;
  }
  player.isActive = false;
  router.push({ name: "game" });
}
</script>

<template>
  <h1 class="currentPlayer">
    <icon-toolbox />&nbsp; L’un d’entre nous est de trop ici
  </h1>
  <ul class="buttonList">
    <li v-for="player in getActivePlayers" v-bind:key="player.name">
      <button @click="excludeUser(player)">
        {{ player.name }}
      </button>
    </li>
  </ul>
</template>
