import type { Ref } from "vue";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { Role } from "@/object/role";
import { shuffle } from "@/tools/shuffler";

export interface Player {
  name: string;
  role: Role;
  order: number;
  isActive: boolean;
}
export const usePlayersStore = defineStore("players", () => {
  const players: Ref<Array<Player>> = ref([]);
  const getActivePlayers = computed(() =>
    players.value.filter((el) => el.isActive)
  );
  const getWinner = computed(function (): Role | null {
    if (
      getActivePlayers.value.filter((el) => el.role === Role.Attentive)
        .length === getActivePlayers.value.length
    ) {
      return Role.Attentive;
    }
    if (
      getActivePlayers.value.filter((el) => el.role === Role.Dreamer).length >=
      getActivePlayers.value.filter((el) => el.role === Role.Attentive).length
    ) {
      return Role.Dreamer;
    }
    return null;
  });
  const getPlayers = computed(() => players);
  function addPlayer(name: string) {
    players.value.push({
      name: name,
      role: Role.Attentive,
      order: players.value.length,
      isActive: true,
    });
  }
  function randomizeRoles() {
    players.value.forEach((element) => (element.role = Role.Attentive));
    players.value[Math.floor(Math.random() * players.value.length)].role =
      Role.Dreamer;
  }
  function randomizeOrder() {
    players.value = shuffle(players.value);
  }
  function reset() {
    players.value = [];
  }
  function excludePlayer(player: Player) {
    player.isActive = false;
  }
  function activateAll() {
    players.value.forEach((player) => (player.isActive = true));
  }

  return {
    players,
    getPlayers,
    getActivePlayers,
    getWinner,
    addPlayer,
    randomizeRoles,
    randomizeOrder,
    reset,
    excludePlayer,
    activateAll,
  };
});
