<script setup lang="ts">
import { storeToRefs } from 'pinia';
import DocumentPreview from './components/preview/document-preview.vue';
import DocumentSidebar from './components/sidebar/document-sidebar.vue';
import { useDocumentsStore } from '@/stores/documents/documents';
import { onMounted } from 'vue';

const documentsStore = useDocumentsStore()
const { 
  items: documents, 
  selected,
  hasImage,
  error,
  loading, 
} = storeToRefs(documentsStore)
// removeDocument, 
// downloadDocument

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

    <DocumentPreview />
  </main>
</template>

<style lang="scss">
  .documents {
    display: grid;
    grid-template-columns: 290px 1fr;
    width: 100%;
    height: 575;
    margin: 35px 0 0 0;

    border-radius: 10px;
    
    background-color: #FDFDFD;
    box-shadow: 0px 0px 10px 0px #0000001A;
  }
</style>