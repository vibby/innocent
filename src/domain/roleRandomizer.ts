import type { RolesCount } from "@/domain/RolesCount";

export const roleRandomizer = {
  build: function (playersCount: number): RolesCount {
    const count = { attentive: 0, innate: 0, sleeper: 0 };
    if (playersCount === 3) {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
        case 1:
          count.innate = 1;
          break;
        case 2:
          count.sleeper = 1;
          break;
      }
    }
    if (playersCount === 4) {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          count.innate = 1;
          count.sleeper = 1;
          break;
        case 1:
          count.innate = 1;
          break;
        case 2:
          count.sleeper = 1;
          break;
      }
    }
    if (playersCount === 5) {
      switch (Math.floor(Math.random() * 4)) {
        case 0:
          count.innate = 2;
          break;
        case 1:
          count.innate = 1;
          count.sleeper = 1;
          break;
        case 2:
          count.innate = 1;
          break;
        case 3:
          count.sleeper = 1;
          break;
      }
    }
    if (playersCount === 6) {
      switch (Math.floor(Math.random() * 12)) {
        case 0:
          count.innate = 2;
          count.sleeper = 1;
          break;
        case 1:
        case 2:
        case 3:
          count.innate = 2;
          count.sleeper = 0;
          break;
        case 4:
        case 5:
        case 6:
          count.innate = 1;
          count.sleeper = 1;
          break;
        case 7:
        case 8:
          count.innate = 0;
          count.sleeper = 2;
          break;
        case 9:
        case 10:
          count.innate = 1;
          count.sleeper = 0;
          break;
        case 11:
          count.innate = 0;
          count.sleeper = 1;
          break;
      }
    }
    if (playersCount === 7) {
      switch (Math.floor(Math.random() * 12)) {
        case 0:
        case 1:
        case 2:
          count.innate = 2;
          count.sleeper = 1;
          break;
        case 3:
          count.innate = 2;
          count.sleeper = 0;
          break;
        case 4:
        case 5:
        case 6:
          count.innate = 2;
          count.sleeper = 0;
          break;
        case 7:
        case 8:
        case 9:
          count.innate = 1;
          count.sleeper = 1;
          break;
        case 10:
          count.innate = 1;
          count.sleeper = 0;
          break;
        case 11:
          count.innate = 0;
          count.sleeper = 1;
          break;
      }
    }
    if (playersCount === 8) {
      switch (Math.floor(Math.random() * 12)) {
        case 0:
          count.innate = 3;
          count.sleeper = 1;
          break;
        case 1:
          count.innate = 2;
          count.sleeper = 2;
          break;
        case 2:
        case 3:
          count.innate = 3;
          count.sleeper = 0;
          break;
        case 4:
        case 5:
          count.innate = 2;
          count.sleeper = 1;
          break;
        case 6:
        case 7:
          count.innate = 1;
          count.sleeper = 2;
          break;
        case 8:
        case 9:
          count.innate = 2;
          count.sleeper = 0;
          break;
        case 10:
        case 11:
          count.innate = 1;
          count.sleeper = 1;
          break;
      }
    }
    count.attentive = playersCount - count.innate - count.sleeper;

    return count;
  },
};
