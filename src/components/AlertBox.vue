<template>
  <div class="alert-container">
    <div class="alert-box">
      <h3>{{title}}</h3>
      <div>
        <span>Następny zawodnik: </span>
        <span>{{howIsNext}}</span>
      </div>
      <div class="button-container">
        <button class="button-normal" @click="$emit('accept')">Graj</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "howIsNext"]
};
</script>

<style>
</style>
