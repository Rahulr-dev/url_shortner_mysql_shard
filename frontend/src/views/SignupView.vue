<template>
    <HeaderComponent :is_login="is_login"/>
    <div class="container">
      <h1>Sign Up</h1>
      <form @submit.prevent="signup">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" v-model="username" class="form-control" id="username" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" />
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button><button type="button" class="btn btn-secondary ms-2" @click="redirecttoLogin">Login</button>
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
      async signup() {
        try {
          await axios.post('http://localhost:3010/auth/register', {
            username: this.username,
            password: this.password,
          });
          alert('Registration successful!');
          this.$router.push('/login');
        } catch (error) {
          alert(error.response.data.error);
        }
      },
      redirecttoLogin(){
        this.$router.push('/login')
      }
    },
  };
  </script>
  