<script setup lang="ts">
import type { IDocument } from '@/api/infra/docs/typings';
import { getImageSrc, handleImageError } from '@/common/utils/formatImage';

const props = withDefaults(defineProps<{
  document: IDocument;
  isSelected?: boolean;
}>(), {
  isSelected: false
});

const emits = defineEmits<{
  select: [value: IDocument | null];
}>();

function onSelect() {
  emits('select', !props.isSelected ? props.document : null)
}
</script>

<template>
  <li 
    class="list-item" 
    :class="isSelected && 'list-item--selected'"
    @click="onSelect"
  >
    <div class="list-item__image-block">
      <img 
        :src="getImageSrc(document.image)"
        :alt="document.name" 
        @error="handleImageError"
      />
    </div>

    <div class="list-item__info">
      <p class="list-item__name">{{ document.name }}</p>
      <span class="list-item__weight">12 MB</span>
    </div>
  </li>
</template>

<style scoped lang="scss">
  .list-item {
    display: flex;
    width: 100%;
    min-height: 70px;
    overflow: hidden;

    box-shadow: 0px 0px 10px 0px #0000001A;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
  
    transition: ease 300ms;

    &:hover {
      .list-item__info {
        background-color: rgb(104 164 255 / 16%);
        
        transition: ease 300ms;
      }
    }

    .list-item__image-block {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 70px;
      max-width: 70px;
      height: 70px;

      background-color: #fff;
      border-right: 1px solid #E0E0E0;
    }

    .list-item__image-block img {
      width: 100%;
      height: 100%;
      
      object-fit: cover;
      object-position: center;
    }
    
    .list-item__info {
      width: 100%;
      padding: 15px;

      transition: ease 300ms;
    }
  
    .list-item__name {
      font-weight: 600;
  
      color: #212529;
    }
  
    .list-item__weight {
      display: block;
      margin: 6px 0 0 0;
      color: #6C757D;
    }
  }

  .list-item--selected {
    transition: ease 300ms;

    &:hover {
      .list-item__info {
        background-color: #005be3;
      }
    }

    .list-item__info {
      background-color: #0D6EFD;
    }

    .list-item__name {
      color: #F8F9FA;
    }

    .list-item__weight {
      color: #DEE2E6;
    }

  }
</style>