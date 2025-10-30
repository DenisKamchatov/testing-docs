import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { IDocument } from '@/api/infra/docs/typings';

import { getDocuments } from '@/api/infra/docs/docs.service';

export const useDocumentsStore = defineStore('documents', () => {
  const items = ref<IDocument[]>([]);
  const selected = ref<IDocument | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const searchDocuments = async (query: string) => {
    loading.value = true;
    error.value = null;
    try {
      items.value = await getDocuments({ search: query });
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Неизвестная ошибка';
    } finally {
      loading.value = false;
    }
  };

  const selectDocument = (doc: IDocument | null) => {
    selected.value = doc;
  };

  const removeDocument = () => {
    if (!selected.value) return;
    items.value = items.value.filter(d => d.id !== selected.value!.id);
    selected.value = null;
  };

  const downloadDocument = () => {
    if (!selected.value) return;

    const blob = new Blob([selected.value.description], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selected.value.name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    items,
    selected,
    loading,
    error,
    searchDocuments,
    selectDocument,
    removeDocument,
    downloadDocument,
  };
});