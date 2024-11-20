<template>
    <div class="card mb-3">
      <div class="card-body">
        <a class="card-title" :href="url.short_url" @click.prevent="handleUrlClick(url.short_url)">{{ url.short_url }}</a>
        <p class="card-text">Original URL: {{ url.long_url }}</p>
        <button class="btn btn-primary" @click="viewAnalytics">View Analytics</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: ['url'],
    methods: {
      viewAnalytics() {
        this.$router.push(`/analytics/${this.url.short_url}`);
      },
      async handleUrlClick(shortUrl) {
        try {
            // Send analytics event to the backend
            const response = await axios.post(`http://localhost:3010/analytics/click`, { shortUrl });
            
            // Open the long URL in a new tab
            window.open(response.data.long_url, '_blank'); // Opens in a new tab
        } catch (error) {
            console.error('Error handling URL click:', error);
        }
      },
    },
  };
  </script>
  