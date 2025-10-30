<script setup lang="ts">
import { computed } from 'vue';

withDefaults(defineProps<{
  placeholder?: string;
  clearable?: boolean;
}>(), {
  placeholder: "",
  clearable: false
});

const emits = defineEmits<{
  clear: [];
}>();

const uniqueId = Math.floor(Math.random() * 99999) + 1;
const inputId = computed<string>(() => `search-${uniqueId}`);

const modelValue = defineModel<string>("modelValue", {
  type: String,
  default: "",
});

function onClear() {
  modelValue.value = ""
  emits('clear')
}
</script>

<template>
<div class="search__wrapper" :class="clearable && 'search__wrapper--clearable'">
  <input 
    class="search" 
    :id="inputId"
    v-model="modelValue"
    :placeholder="placeholder"
  />

  <div 
    class="clear"
    @click="onClear" 
    v-if="clearable"
  >
    <svg viewBox="0 0 24 24">
      <path d="M11 0.7H13V23.3H11z" transform="rotate(-45.001 12 12)"></path><path d="M0.7 11H23.3V13H0.7z" transform="rotate(-45.001 12 12)"></path>
    </svg>
  </div>
</div>
</template>

<style scoped lang="scss">
  .search__wrapper {
    position: relative;  
    padding: 0 24px;

    border: 1.5px solid #E9ECEF;
    border-radius: 8px;
    color: #212529;
    background-color: #fff;

    transition: ease 200ms;

    &::placeholder {
      color: #6C757D;
    }
    
    &:hover {
      border: 1.5px solid #d3d6d9;
      
      transition: ease 200ms;
    }
    
    &:focus, &:focus-visible {
      border: 1.5px solid #a5a8ab;
      
      transition: ease 200ms;
    }
  }

  .search__wrapper--clearable {

    .search {
      padding: 16px 25px 16px 0;
    }
  }

  .search {
    width: 100%;
    padding: 16px 0 16px 0;
  }

  .clear {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    right: 18px;
    padding: 5px;
    margin: -11px 0 0 0;

    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1019607843);
    border-radius: 50%;
    cursor: pointer;
    
    svg {
      width: 12px;
      height: 12px;
    }
  }
</style>