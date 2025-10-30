<script setup lang="ts">
import { ref, watch } from 'vue';

import Button from '@/components/button/button.vue';

import type { IDocument } from '@/api/infra/docs/typings';

import { getImageSrc, handleImageError as handleError } from '@/common/utils/formatImage';

const props = withDefaults(defineProps<{
  document: IDocument | null;
}>(), {
});

const emits = defineEmits<{
  remove: [];
  download: [];
}>();

const isImageValid = ref(false);

const handleImageError = (e: Event) => {
  handleError(e)
  isImageValid.value = false;
}

watch(
  () => props.document, 
  () => {
    if (!props.document) {
      isImageValid.value = false;
      return;
    }

    const img = props.document.image;
    if (!img || img.trim() === '') {
      isImageValid.value = false;
      return;
    }

    isImageValid.value = true;
  }, 
  { 
    immediate: true 
  }
);
</script>

<template>
  <div class="preview" v-if="document">
    <img 
      class="preview__image"
      :src="getImageSrc(document.image)"
      :alt="document.name" 
      @error="handleImageError"
    />

    <div class="preview__content">
      <div class="preview__action-block">
        <h2 class="preview__title">{{ document.name }}</h2>

        <div class="preview__buttons">
          <Button  
            type="download"
            @click="emits('download')" 
          >
            Скачать
          </Button>

          <Button  
            type="delete"
            :disabled="!isImageValid"
            @click="emits('remove')" 
          >
            Удалить
          </Button>
        </div>
      </div>

      <div class="preview__description-block">
        <h3 class="preview__title">Описание:</h3>

        <p class="preview__description">{{ document.description }}</p>
      </div>
    </div>
  </div>

  <p v-else class="preview--empty">Выберите документ, чтобы посмотреть его содержиое</p>
</template>

<style scoped lang="scss">

@include mobile {
  .preview {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
    padding: 15px;
  }

  .preview__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
  }

  .preview__action-block {
    .preview__image {
      max-width: 100%;
      height: auto;
    }

    .preview__buttons {
      display: flex;
      align-items: center;
      gap: 17px;
      margin: 14px 0 0 0;
    }
  }

  .preview__description-block {
    margin: 47px 0 0 0;

    .preview__description {
      margin: 14px 0 0 0;

      color: #6C757D;
    }
  }

  .preview--empty {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 200px;
  }
}

@include desktop {
  .preview {
    grid-template-columns: 1fr 1fr;
    grid-gap: 61px;
    padding: 30px;
  }
}
</style>