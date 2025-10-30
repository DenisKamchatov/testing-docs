<script setup lang="ts">
import Header from './components/header/header.vue';

</script>

<template>
  <div id="app">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
#app {
  padding: 40px 50px 58px 50px;
}
</style>
