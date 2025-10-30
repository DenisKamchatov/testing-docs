<script setup lang="ts">
withDefaults(defineProps<{
  text?: string;
  disabled?: boolean;
  type?: "default" | "download" | "delete";
}>(), {
  disabled: false,
  type: 'default'
});

const emits = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button 
    class="button"
    :class="
      type === 'download' && 'button--download',
      type === 'delete' && 'button--delete',
      disabled && 'button--disabled'
    "
    :disabled="disabled"
    @click="emits('click')"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  padding: 7px 28px;

  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;

  transition: ease 200ms;


  &:hover {
    background-color: #eee;

    transition: ease 200ms;
  }
}

.button--download {
  color: #0D6EFD;

  border: 1px solid #0D6EFD;

  &:hover {
    color: #0d61df;

    border: 1px solid #0d61df;
    background-color: #0d61df08;
    
    transition: ease 200ms;
  }

  &:focus {
    color: #0d58c8;

    border: 1px solid #0d58c8;
    background-color: #0d61df08;
    
    transition: ease 200ms;
  }

  &:active {
    color: #0c4eb2;

    border: 1px solid #0c4eb2;
    background-color: #0d61df08;
    
    transition: ease 200ms;
  }
}

.button--delete {
  color: #DC3545;

  border: 1px solid #DC3545;

  &:hover {
    color: #c42a39;

    border: 1px solid #DC3545;
    background-color: #dc354608;
    
    transition: ease 200ms;
  }

  &:focus {
    color: #aa1f2d;

    border: 1px solid #c42a39;
    background-color: #dc354608;
    
    transition: ease 200ms;
  }

  &:active {
    color: #941522;

    border: 1px solid #941522;
    background-color: #dc354608;
    
    transition: ease 200ms;
  }
}

.button--disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>