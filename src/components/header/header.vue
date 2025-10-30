<script setup lang="ts">

</script>

<template>
  <header class="header">
    <h1 class="header__title">MyApp</h1>

    <p class="header__name">Username</p>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header__title {
  font-weight: 700;
  font-size: 32px;
}

.header__name {
  font-size: 16px;
}
</style>