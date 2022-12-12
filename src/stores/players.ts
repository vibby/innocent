import type { Ref } from "vue";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { Role } from "@/tools/role";
import { shuffle } from "@/tools/shuffler";

export interface Player {
  name: string;
  role: Role;
  order: number;
}
export const usePlayersStore = defineStore("players", () => {
  const players: Ref<Array<Player>> = ref([]);
  const getPlayers = computed(() => players);
  function addPlayer(name: string) {
    players.value.push({
      name: name,
      role: Role.Guilty,
      order: players.value.length,
    });
  }
  function randomizeRoles() {
    players.value.forEach((element) => (element.role = Role.Guilty));
    players.value[Math.floor(Math.random() * players.value.length)].role =
      Role.Innocent;
  }
  function randomizeOrder() {
    players.value = shuffle(players.value);
  }
  function reset() {
    players.value = [];
  }

  return {
    players,
    getPlayers,
    addPlayer,
    randomizeRoles,
    randomizeOrder,
    reset,
  };
});
