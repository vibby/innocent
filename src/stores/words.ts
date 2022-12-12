import { ref, computed } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { wordsCouples } from "@/object/wordsCouples";

interface WordsSelected {
  guilty: string;
  innocent: string;
}
export const useWordsStore = defineStore("words", () => {
  const words: Ref<WordsSelected> = ref({
    guilty: wordsCouples[0].word1,
    innocent: wordsCouples[0].word2,
  });
  const getWords = computed(() => words);
  function chooseWords() {
    const foundWords =
      wordsCouples[Math.floor(Math.random() * wordsCouples.length)];
    if (Math.random() < 0.5) {
      words.value = {
        guilty: foundWords.word1,
        innocent: foundWords.word2,
      };
    } else {
      words.value = {
        guilty: foundWords.word2,
        innocent: foundWords.word1,
      };
    }
  }
  return { words: words, getWords: getWords, chooseWords };
});
