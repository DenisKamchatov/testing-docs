<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import DocumentPreview from './components/preview/document-preview.vue';
import DocumentSidebar from './components/sidebar/document-sidebar.vue';

import { useDocumentsStore } from '@/stores/documents/documents';

const documentsStore = useDocumentsStore()
const { 
  items: documents, 
  selected,
  error,
  loading, 
} = storeToRefs(documentsStore)

function handleRetry() {
  documentsStore.searchDocuments('');
};

onMounted(() => {
  if (documents.value.length === 0) {
    documentsStore.searchDocuments('');
  }
});
</script>

<template>
  <main class="documents">
    <DocumentSidebar 
      :documents="documents" 
      :selected="selected" 
      :loading="loading" 
      :error="error" 
      @search="documentsStore.searchDocuments"
      @select="documentsStore.selectDocument"
      @retry="handleRetry"
    />

    <DocumentPreview 
      :document="selected"
      @remove="documentsStore.removeDocument"
      @download="documentsStore.downloadDocument"
    />
  </main>
</template>

<style lang="scss">

@include mobile {
  .documents {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    margin: 35px 0 0 0;

    border-radius: 10px;
    
    background-color: #FDFDFD;
    box-shadow: 0px 0px 10px 0px #0000001A;
  }
}

@include tablet {
  .documents {
    grid-template-columns: 290px 1fr;
  }
}
  
</style>