import type { Ref } from "vue";
import { computed } from "vue";
import { defineStore } from "pinia";
import { Role } from "@/domain/role";
import { shuffle } from "@/tools/shuffler";
import { useLocalStorage } from "@vueuse/core";

export interface Player {
  name: string;
  role: Role;
  order: number;
  isActive: boolean;
}
export const usePlayersStore = defineStore("players", () => {
  const players: Ref<Array<Player>> = useLocalStorage("players", []);
  const getActivePlayers = computed(() =>
    players.value.filter((el) => el.isActive)
  );
  const getWinner = computed(function (): Role | null {
    if (
      getActivePlayers.value.filter((el) => el.role === Role.attentive)
        .length === getActivePlayers.value.length
    ) {
      return Role.attentive;
    }
    if (
      getActivePlayers.value.filter((el) => el.role === Role.innate).length >=
      getActivePlayers.value.filter((el) => el.role === Role.attentive).length
    ) {
      return Role.innate;
    }
    return null;
  });
  const getPlayers = computed(() => players);
  function addPlayer(name: string) {
    players.value.push({
      name: name,
      role: Role.attentive,
      order: players.value.length,
      isActive: true,
    });
  }
  function randomizeRoles() {
    players.value.forEach((element) => (element.role = Role.attentive));
    players.value[Math.floor(Math.random() * players.value.length)].role =
      Role.innate;
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
  function initGame() {
    randomizeRoles();
    randomizeOrder();
    activateAll();
  }

  return {
    players,
    getPlayers,
    getActivePlayers,
    getWinner,
    addPlayer,
    initGame,
    reset,
    excludePlayer,
  };
});
