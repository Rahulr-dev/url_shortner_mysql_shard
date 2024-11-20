<template>
    <HeaderComponent :is_login="is_login"/>
    <div class="container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" v-model="username" class="form-control" id="username" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" />
        </div>
        <button type="submit" class="btn btn-primary">Login</button><button type="button" class="btn btn-secondary ms-2" @click="redirecttoSignup">Signup</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import HeaderComponent from '../components/HeaderComponent.vue';
  
  export default {
    components: { HeaderComponent },
    data() {
      return {
        username: '',
        password: '',
        is_login: false
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3010/auth/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token);
          this.$router.push('/dashboard');
        } catch (error) {
          alert(error.response.data.error);
        }
      },
      redirecttoSignup(){
        this.$router.push('/signup')
      }
    },
  };
  </script>
  