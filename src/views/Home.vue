<template>
  <div class="home-container">
    <div class="navigation">
      <app-nav></app-nav>
    </div>
  </div>
</template>
<script>
import Navigation from './../components/Navigation.vue';
export default {
  name: 'Home',
  components: {
    appNav: Navigation
  }
};
</script>
<style>
.home-container {
    display: grid;
    grid-template-columns: 100%;
    /* grid-template-rows: 0% 100%; */
    height: 100vh;
    justify-items: center;
    align-items: center;
}
</style>
