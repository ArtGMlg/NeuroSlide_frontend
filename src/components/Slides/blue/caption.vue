<!-- eslint-disable vuejs-accessibility/alt-text -->
<!-- eslint-disable max-len -->
<template>
  <div class="slide" :style="{ transform: `scale(${scaleFactor})` }">
    <div class="Frame24 content" style="width: 1920px; height: 1080px; position: relative; background: #F5F7F9">
      <div
        contenteditable @input="(v) => emit('inputText', (v.target as HTMLElement).innerHTML || 'Text')"
        style="width: 100%; text-align: center; top: 663px; position: absolute; color: black; font-size: 64px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">
        {{ text }}</div>
      <img class="61" style="width: 1920px; height: 622px; left: 0px; top: 1px; position: absolute"
        src="cap.png" />
      <div class="Rectangle35"
        style="width: 473px; height: 526px; left: 736px; top: 59px; position: absolute; background: #1C68F5"></div>
      <div
        contenteditable @input="(v) => emit('inputHeader', (v.target as HTMLElement).innerHTML || 'Header')"
        style="width: 100%; text-align: center; top: 387px; position: absolute; color: white; font-size: 128px; font-family: Montserrat; font-weight: 900; word-wrap: break-word">
        {{ header }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChartTypeRegistry } from 'chart.js'
import { SlideContent } from '@/components/types/slides'

defineProps<{
  header: string
  text: string
  content: SlideContent<keyof ChartTypeRegistry | null>
  scaleFactor: number
  slideIdx: number
}>()

// eslint-disable-next-line func-call-spacing, no-spaced-func
const emit = defineEmits<{
  (e: 'inputHeader', v: string): void
  (e: 'inputText', v: string): void
}>()
</script>

<style scoped></style>
