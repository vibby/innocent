<script setup lang="ts">
import { RouterLink } from "vue-router";
import RestartButton from "@/components/RestartButton.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
</script>

<template>
  <nav>
    <RestartButton />
    <RouterLink to="/about"> <icon-heart />&nbsp;&nbsp;À propos </RouterLink>
  </nav>
</template>
