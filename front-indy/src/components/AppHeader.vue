<template>
  <header class="header">
    <div class="header__search"></div>
    <div class="header__avatar">Bienvenido</div>
  </header>
</template>

<script>
export default {
name: "AppHeader"
}
</script>

<style scoped>
/* Give every child element its grid name */
.header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #648ca6;
}

/* Make room for the menu icon on mobile */
.header__search {
  margin-left: 42px;
}
</style>