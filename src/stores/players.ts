import type { ComputedRef, Ref } from "vue";
import { computed } from "vue";
import { defineStore } from "pinia";
import { Role } from "@/domain/role";
import { shuffle } from "@/tools/shuffler";
import { useLocalStorage } from "@vueuse/core";
import { useWordsStore } from "@/stores/words";
import { random } from "@/tools/randomizer";
import { roleRandomizer } from "@/domain/roleRandomizer";

export interface Player {
  name: string;
  role: Role;
  order: number;
  isActive: boolean;
  proposal: string | null;
  isProposing: boolean;
}
export const usePlayersStore = defineStore("players", () => {
  const players: Ref<Array<Player>> = useLocalStorage("players", []);
  const getActivePlayers = computed(() =>
    players.value.filter((el) => el.isActive)
  );
  const getBeingExcludedPlayer: ComputedRef<Player | null> = computed(
    (): Player | null => players.value.find((el) => el.isProposing) || null
  );
  const getWinner = computed(function (): Role | null {
    const wordsStore = useWordsStore();
    const sleeperWinner = getActivePlayers.value.find(
      (el) =>
        el.role === Role.sleeper && el.proposal === wordsStore.words.attentive
    );
    if (sleeperWinner) {
      return Role.sleeper;
    }
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
  function addPlayer(name: string) {
    players.value.push({
      name: name,
      role: Role.attentive,
      order: players.value.length,
      isActive: true,
      proposal: null,
      isProposing: false,
    });
  }
  function randomizeRoles() {
    const counts = roleRandomizer.build(players.value.length);
    players.value.forEach((element) => (element.role = Role.attentive));
    Array.from({ length: counts.innate }, () => {
      random(
        players.value.filter((player: Player) => player.role === Role.attentive)
      ).role = Role.innate;
    });
    Array.from({ length: counts.sleeper }, () => {
      random(
        players.value.filter((player: Player) => player.role === Role.attentive)
      ).role = Role.sleeper;
    });
  }
  function randomizeOrder() {
    players.value = shuffle(players.value);
    while (players.value[0].role === Role.sleeper) {
      players.value = shuffle(players.value);
    }
  }
  function reset() {
    players.value = [];
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
    getActivePlayers,
    getWinner,
    getBeingExcludedPlayer,
    addPlayer,
    initGame,
    reset,
  };
});
