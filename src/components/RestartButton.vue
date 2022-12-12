<script setup lang="ts">
import { useRouter } from "vue-router";
import { usePlayersStore } from "@/stores/players";
import { ref } from "vue";
import IconCube from "@/components/icons/IconCube.vue";

const playersStore = usePlayersStore();
const router = useRouter();

function restart() {
  router.push({ name: "users" }).then(() => playersStore.reset());
  showConfirm.value = false;
}
let showConfirm = ref(false);
function step1() {
  showConfirm.value = true;
}
</script>

<template>
  <a href="#" @click="step1" v-if="!showConfirm">
    <icon-cube />&nbsp;&nbsp;Recommencer
  </a>
  <a href="#" class="danger" @click="restart" v-if="showConfirm">Confirmer ?</a>
  <a href="#" class="safe" @click="showConfirm = false" v-if="showConfirm"
    >Annuler</a
  >
</template>

<style scoped>
.danger {
  background-color: red;
}
.safe {
  background-color: green;
}
</style>
