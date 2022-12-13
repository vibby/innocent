import type { WordsCouple } from "@/domain/words/WordsCouple";
import words from "@/domain/words/words.csv?raw";
import { random } from "@/tools/randomizer";
import { shuffle } from "@/tools/shuffler";

export const wordsCouplesBuilder = {
  build: function (): WordsCouple {
    const lines = words.split("\n");
    const lineItems = random(lines).split(";");
    const items = shuffle(lineItems);

    return {
      attentive: items[0],
      dreamer: items[1],
    };
  },
};
