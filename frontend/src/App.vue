<template>
  <div id="app">
 

    <!-- The main content of the app will be rendered here based on the current route -->
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',

};
</script>

<style>
/* Global styles */
#app {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #343a40;
  color: #fff;
  padding: 10px 20px;
}

main {
  flex: 1;
  padding: 20px;
}

footer {
  background-color: #343a40;
  color: #fff;
  padding: 10px;
  text-align: center;
}
</style>
