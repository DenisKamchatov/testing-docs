<script setup lang="ts">
import type { IDocument } from '@/api/infra/docs/typings';

withDefaults(defineProps<{
  documents: IDocument[];
  loading?: boolean;
  error?: string | null;
}>(), {
});

const emits = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <ul class="document-list">
    <li v-if="loading" class="document-list__item document-list__item--loading">
      <div class="skeleton-loader">
        <div class="skeleton-loader__image"></div>
        <div class="skeleton-loader__text"></div>
      </div>
    </li>

    <li v-else-if="error" class="document-list__item document-list__item--error">
      <div class="error-message">
        <span>❌ {{ error }}</span>
        <button @click="$emit('retry')" class="retry-btn">Повторить</button>
      </div>
    </li>

    <li v-else-if="documents.length === 0" class="empty-state">
      Ничего не найдено
    </li>

    <slot v-else></slot>
  </ul>
</template>

<style scoped lang="scss">
  .document-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%;
  }

  .document-list__item {
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.2s ease;

    .document-list__item--loading {
      opacity: 0.7;
    }

    .document-list__item--error {
      background-color: #ffebee;
      border: 1px solid #ef9a9a;
      text-align: center;
    }
  }

  .skeleton-loader {
    display: flex;
    align-items: center;
    gap: 16px;

    .skeleton-loader__image {
      min-width: 70px;
      max-width: 70px;
      height: 70px;
      background-color: #e0e0e0;
      border-radius: 4px;
      animation: pulse 1.5s infinite ease-in-out;
    }

    .skeleton-loader__text {
      width: 100%;
      height: 40px;
      background-color: #e0e0e0;
      border-radius: 4px;
      animation: pulse 1.5s infinite ease-in-out;
    }
  }

  .error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .retry-btn {
      margin-top: 8px;
      padding: 8px 16px;
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }
    }
  }

  .empty-state {
    color: #6C757D;
  }

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
</style>