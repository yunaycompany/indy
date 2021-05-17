<template>
  <footer class="footer">
    <div class="footer__copyright">&copy; 2021 Yosbel Fonseca Mendoza</div>
    <div class="footer__signature">All rights reserved</div>
  </footer>
</template>

<script>
export default {
name: "AppFooter"
}
</script>

<style scoped>

.footer {
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #648ca6;
}
</style>