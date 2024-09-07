<!-- eslint-disable vuejs-accessibility/alt-text -->
<!-- eslint-disable max-len -->
<template>
  <div class="slide" :style="{ transform: `scale(${scaleFactor})` }">
    <div class="Style1Title content" style="width: 1920px; height: 1080px; position: relative; background: #E5DFC8">
      <img class="Image2"
        style="width: 1720px; height: 375px; left: 100px; top: 100px; position: absolute; border: 1px black solid"
        src="https://via.placeholder.com/1720x375" />
      <div class="Line1"
        style="width: 1080px; height: 0px; left: 100px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 1px black solid">
      </div>
      <div class="Line2"
        style="width: 1080px; height: 0px; left: 1819px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 1px black solid">
      </div>
      <div class="Line3"
        style="width: 1920px; height: 0px; left: 1920px; top: 575px; position: absolute; transform: rotate(180deg); transform-origin: 0 0; border: 1px black solid">
      </div>
      <div class="Line4"
        style="width: 1061px; height: 0px; left: 1061px; top: 980px; position: absolute; transform: rotate(180deg); transform-origin: 0 0; border: 1px black solid">
      </div>
      <div class="20232024"
        contenteditable
        @input="(v) => emit('inputHeader', (v.target as HTMLElement).innerHTML || 'Header')"
        style="width: 1472px; left: 180px; top: 631px; position: absolute; color: black; font-size: 64px; font-family: Lora; font-weight: 400; line-height: 76.80px; word-wrap: break-word">
        {{ header }} </div>
      <div
        contenteditable
        @input="(v) => emit('inputText', (v.target as HTMLElement).innerHTML || 'Text')"
        style="left: 1081px; top: 953px; position: absolute; color: black; font-size: 36px; font-family: Lora; font-weight: 400; word-wrap: break-word">
        {{ text }}</div>
      <div class="Line4"
        style="width: 414px; height: 0px; left: 1920px; top: 980px; position: absolute; transform: rotate(180deg); transform-origin: 0 0; border: 1px black solid">
      </div>
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
