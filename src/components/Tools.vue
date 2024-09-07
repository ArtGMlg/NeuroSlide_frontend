<template>
  <div class="tool-bar">
    <ColorPicker
      format="rgb"
      shape="square"
      disable-alpha
      round-history
      blurClose
      @update:pureColor="updateColor"
      @pointerdown.prevent="el ? el.focus() : ''"
      ref="colpic"
    >
      <template #extra>
        <button @click="hb">Done</button>
      </template>
    </ColorPicker>

      <!-- <ColorPicker @update:modelValue="updateColor" @hide="eventBus.emit('doneEditing')" /> -->
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { TinyEmitter } from 'tiny-emitter'
// import ColorPicker from 'primevue/colorpicker'
import { ColorPicker } from 'vue3-colorpicker'

const props = defineProps<{
  capturedElement?: HTMLElement
  eventBus: TinyEmitter
}>()

const el = ref<HTMLElement>()

const updateColor = (color: string) => {
  if (el.value) {
    el.value.style.color = color
    // props.eventBus.emit('doneEditing')
  }
}

const colpic = ref<ColorPicker>()

const hb = () => {
  console.log('done')
  props.eventBus.emit('doneEditing')
  colpic.value?.$el.blur()
}

// const color =
// computed(() => (props.capturedElement ? window.getComputedStyle(props.capturedElement) : ''))

// watch(() => color, () => console.log(color))

props.eventBus.on('capture', (elem: HTMLElement | undefined) => {
  el.value = elem
})

</script>

<style scoped lang="scss">
.tool-bar {
  height: 80px;
  background-color: antiquewhite;
}
</style>
