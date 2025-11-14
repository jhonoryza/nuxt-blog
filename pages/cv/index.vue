<script setup>
import cv from "../../data/cv.json";
</script>

<template>
  <main
    class="max-w-3xl px-4"
  >
    <CVPreview :data="cv" />
  </main>
</template>
