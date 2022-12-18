import { createRouter, createWebHistory } from "vue-router";
import Users from "../views/SetupUsersView.vue";
import Word from "../views/SetupWordsView.vue";
import Game from "../views/GameView.vue";
import EndTurn from "../views/EndTurnView.vue";
import Proposal from "../views/ProposalView.vue";
import EndGame from "../views/EndGameView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "users",
      component: Users,
    },
    {
      path: "/word",
      name: "words",
      component: Word,
    },
    {
      path: "/game",
      name: "game",
      component: Game,
    },
    {
      path: "/end-turn",
      name: "endturn",
      component: EndTurn,
    },
    {
      path: "/proposal",
      name: "proposal",
      component: Proposal,
    },
    {
      path: "/end-game",
      name: "endgame",
      component: EndGame,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
