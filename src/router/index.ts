import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import DocumentsView from '@/views/documents/documents-view.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/documents',
  },
  {
    path: '/documents',
    name: 'Documents',
    component: DocumentsView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;