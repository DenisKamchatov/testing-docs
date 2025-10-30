<script setup lang="ts">
import Search from '@/components/search/search.vue';
import DocumentList from '../list/document-list.vue';
import DocumentListItem from '../list/document-list-item.vue';
import type { IDocument } from '@/api/infra/docs/typings';
import { ref, watch } from 'vue';

withDefaults(defineProps<{
  documents: IDocument[],
  selected?: IDocument | null,
  loading?: boolean,
  error?: string | null,
}>(), {
});

const emits = defineEmits<{
  search: [value: string];
  select: [value: IDocument | null];
  retry: [];
}>();

const searchValue = ref<string>('')

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(searchValue, (newVal) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    emits('search', newVal.trim());
  }, 300);
});
</script>

<template>
  <div class="sidebar">
    <h2 class="sidebar__title">Поиск документа</h2>

    <Search 
      class="sidebar__search" 
      placeholder="Введите ID документа"
      v-model="searchValue"
      clearable
    />

    <h2 class="sidebar__title sidebar__title-results">Результаты</h2>

    <DocumentList 
      class="sidebar__list"
      :documents="documents"
      :loading="loading"
      :error="error"
      @retry="emits('retry')"
    >
        <DocumentListItem 
          v-for="document in documents" 
          :key="document.id"
          :document="document"
          :is-selected="selected ? document.id === selected.id : false"
          @select="(document) => emits('select', document)"
        />
    </DocumentList>
  </div>
</template>

<style scoped lang="scss">
@include mobile {
  .sidebar {
    padding: 27px 20px;

    border-bottom: 1px solid #E0E0E0
  }

  .sidebar__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
  }

  .sidebar__search {
    margin: 14px 0 0 0;
  }

  .sidebar__title-results {
    margin: 29px 0 0 0;
  }

  .sidebar__list {
    margin: 18px 0 0 0;
  }
}

@include tablet {
  .sidebar {
    padding: 27px 20px;

    border-right: 1px solid #E0E0E0
  }
}

</style>