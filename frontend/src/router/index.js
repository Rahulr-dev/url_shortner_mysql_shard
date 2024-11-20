import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginView.vue';
import Signup from '../views/SignupView.vue';
import Dashboard from '../views/DashboardView.vue';
import Analytics from '../views/AnalyticsView.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'Signup', component: Signup },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/analytics/:shortUrl', name: 'Analytics', component: Analytics },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
