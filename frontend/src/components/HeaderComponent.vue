<template>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">URL Shortener</a>
        <button v-if="is_login" class="btn btn-outline-light" @click="logout">Logout</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    props: ['is_login'],
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  nav {
    margin-bottom: 20px;
  }
  </style>
  