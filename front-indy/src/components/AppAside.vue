<template>
  <aside class="sidenav">
    <div class="sidenav__close-icon">
      <i class="fas fa-times sidenav__brand-close"></i>
    </div>
    <ul class="sidenav__list">
      <router-link to="/" tag="li"  class="sidenav__list-item">
        Wallet
      </router-link>
      <router-link to="/schema" tag="li" class="sidenav__list-item">
        Esquemas
      </router-link>
      <router-link to="/credential" tag="li" class="sidenav__list-item">
        Credenciales
      </router-link>
      <router-link to="/verify" tag="li" class="sidenav__list-item">
        Verificar
      </router-link>
    </ul>
  </aside>
</template>

<script>
export default {
name: "AppAside"
}
</script>

<style scoped>

.sidenav__close-icon {
  position: absolute;
  visibility: visible;
  top: 8px;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  color: #ddd;
}

.sidenav__list {
  padding: 0;
  margin-top: 85px;
  list-style-type: none;
}
.sidenav_link{
  color: #ddd;
  text-decoration: none;

}
.sidenav__list-item {
  padding: 20px 20px 20px 40px;
  color: #ddd;
}

.sidenav__list-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

</style>