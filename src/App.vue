<template>
  <div id="app">

<router-view/>
  </div>
</template>

<style scoped>
#app{
  height: 100%;
}
</style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

<script setup>
import Manage from "@/views/Manage.vue";
import Login from "@/../../help-oringal/src/views/Login.vue";

</script>
