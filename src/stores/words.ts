import { computed } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { wordsCouplesBuilder } from "@/domain/words/wordsCouplesBuilder";
import type { WordsCouple } from "@/domain/words/WordsCouple";
import { useLocalStorage } from "@vueuse/core";

export const useWordsStore = defineStore("words", () => {
  const words: Ref<WordsCouple> = useLocalStorage(
    "words",
    wordsCouplesBuilder.build()
  );
  const getWords = computed(() => words);
  function chooseWords() {
    words.value = wordsCouplesBuilder.build();
  }
  return { words: words, getWords: getWords, chooseWords };
});
