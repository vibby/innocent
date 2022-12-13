import { ref, computed } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { wordsCouplesBuilder } from "@/domain/words/wordsCouplesBuilder";
import type { WordsCouple } from "@/domain/words/WordsCouple";

export const useWordsStore = defineStore("words", () => {
  const words: Ref<WordsCouple> = ref(wordsCouplesBuilder.build());
  const getWords = computed(() => words);
  function chooseWords() {
    words.value = wordsCouplesBuilder.build();
  }
  return { words: words, getWords: getWords, chooseWords };
});
