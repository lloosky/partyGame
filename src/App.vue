<template>
  <div id="application">
    <transition name="slide" mode="out-in">
        <router-view></router-view>
    </transition> 
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
.slide-enter-active {
  animation: slide-in 0.2s ease-out;
}
.slide-leave-active {
  animation: slide-out 0.2s ease-out;
}
@keyframes slide-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes slide-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}
</style>
