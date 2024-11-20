<template>
    <div>
      <HeaderComponent :is_login="is_login"/>
      <div class="container">
        <!-- Back Button -->
        <button @click="goBack" class="btn btn-secondary">Back</button>
        <h1>Analytics for {{ shortUrl }}</h1>
        
        <!-- Display analytics if available -->
        <div v-if="analytics.length">
          <h3>Click Statistics</h3>
          <ul class="list-group">
            <li v-for="data in analytics" :key="data.id" class="list-group-item">
              <strong>Location:</strong> {{ data.location }} <br />
              <strong>Device:</strong> {{ data.device }} <br />
              <strong>Click Count:</strong> {{ data.click_count }} clicks
            </li>
          </ul>
        </div>
  
        <!-- Show a message if no analytics data -->
        <div v-else>
          <p>No analytics data available for this URL yet.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  export default {
    components: { HeaderComponent },
    data() {
      return {
        shortUrl: this.$route.params.shortUrl,
        analytics: [],
        is_login: true
      };
    },
    async mounted() {
      await this.fetchAnalytics();
    },
    methods: {
      /**
       * Fetch analytics data for a specific shortened URL
       */
      async fetchAnalytics() {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            this.$router.push('/login');
            return;
          }
          const response = await axios.get(
            `http://localhost:3010/analytics/${this.shortUrl}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.analytics = response.data;
        } catch (error) {
          console.error('Error fetching analytics:', error);
          alert('Error fetching analytics data');
        }
      },
      goBack() {
        this.$router.go(-1); // Go back to the previous page
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  
  h3 {
    margin-top: 30px;
  }
  
  .list-group-item {
    margin-bottom: 15px;
  }
  
  strong {
    color: #333;
  }
  </style>
  