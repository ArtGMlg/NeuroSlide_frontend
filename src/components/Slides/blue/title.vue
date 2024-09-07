<!-- eslint-disable vuejs-accessibility/alt-text -->
<!-- eslint-disable max-len -->
<template>
  <div class="slide" :style="{ transform: `scale(${scaleFactor})` }">
    <div class="Style1Title content" style="width: 1920px; height: 1080px; position: relative; background-image: url('title_back.png'); ">
      <div style="width: 100%; background-color: white; height: 404px; position: absolute; bottom: 0; left: 0;"></div>
      <div class="20232024"
        contenteditable
        @input="(v) => emit('inputHeader', (v.target as HTMLElement).innerHTML || 'Header')"
        style="width: 100%; top: 681px; text-align: center; position: absolute; color: black; font-size: 96px; font-family: Montserrat; color: #1C68F5; font-weight: bold; line-height: 76.80px; word-wrap: break-word">
        {{ header }} </div>
      <div
        contenteditable
        @input="(v) => emit('inputText', (v.target as HTMLElement).innerHTML || 'Text')"
        style="bottom: 108px; width: 100%; text-align: center; position: absolute; color: black; font-size: 48px; font-family: Montserrat; font-weight: medium; word-wrap: break-word">
        {{ text }}</div>
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
