<script setup lang="ts">
import { usePlayersStore } from "@/stores/players";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Role } from "@/domain/role";
import IconBubbles from "@/components/icons/IconBubbles.vue";

const playersStore = usePlayersStore();

const router = useRouter();
if (
  !playersStore.getBeingExcludedPlayer ||
  playersStore.getBeingExcludedPlayer.role !== Role.sleeper
) {
  router.push("game");
}

const attemp = ref("");

function tryWord(word: string) {
  if (playersStore.getBeingExcludedPlayer) {
    playersStore.getBeingExcludedPlayer.proposal = word;
    if (!playersStore.getWinner) {
      playersStore.getBeingExcludedPlayer.isActive = false;
    }
  }
  router.push({ name: "game" });
}
</script>

<template>
  <form @submit.prevent="tryWord(attemp)">
    <h1 class="currentPlayer">
      <icon-bubbles />&nbsp;
      {{ playersStore.getBeingExcludedPlayer?.name }} dormait !
    </h1>
    <p>Mais s’il devine le mot, il gagne !</p>
    <input v-model="attemp" type="text" />
    <button>Valider</button>
  </form>
</template>
