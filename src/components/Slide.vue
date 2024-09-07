<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="wrapper">
    <div class="slide-holder">
      <slot></slot>
    </div>
    <div class="zoom-controls">
      <input type="range" min="0.1" max="2.0" step="0.1" v-model="scale">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const scale = ref<string>('0.4')

const emit = defineEmits<(event: 'scale', value: number) => void>()

watch(scale, () => {
  emit('scale', parseFloat(scale.value))
})
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 70%;
}

.slide-holder {
  max-height: 500px;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
