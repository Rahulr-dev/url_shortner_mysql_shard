<template>
    <div>
      <HeaderComponent :is_login="is_login"/>
      <div class="container">
        <h1>Dashboard</h1>
        <form @submit.prevent="shortenUrl">
          <div class="mb-3">
            <label for="originalUrl" class="form-label">Original URL</label>
            <input type="text" v-model="originalUrl" class="form-control" id="originalUrl" />
          </div>
          <button type="submit" class="btn btn-primary mb-2">Shorten</button>
        </form>
  
        <div v-for="url in urls" :key="url.shortUrl">
          <UrlCard :url="url" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import UrlCard from '../components/UrlCard.vue';
  import HeaderComponent from '../components/HeaderComponent.vue';
  
  export default {
    components: { HeaderComponent, UrlCard },
    data() {
      return {
        originalUrl: '',
        urls: [],
        is_login: true
      };
    },
    async mounted() {
      this.fetchUrls();
    },
    methods: {
      async fetchUrls() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3010/urls', {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.urls = response.data.urls;
        } catch (error) {
          alert('Error fetching URLs', error);
        }
      },
      async shortenUrl() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
            'http://localhost:3010/urls/shorten',
            { longUrl: this.originalUrl },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.urls.push(response.data);
          this.originalUrl = '';
        } catch (error) {
          alert(error.response.data.error);
        }
      },
    },
  };
  </script>
  