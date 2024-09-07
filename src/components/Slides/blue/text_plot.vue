<!-- eslint-disable vuejs-accessibility/alt-text -->
<!-- eslint-disable max-len -->
<template>
  <div class="slide" :style="{ transform: `scale(${scaleFactor})` }">
    <div class="Frame22 content" style="width: 1920px; height: 1080px; position: relative; background: #F5F7F9">
      <img class="Image5" style="width: 270px; height: 88px; left: 10px; top: 0px; position: absolute"
        src="image 5.png" />
      <div class="Line10"
        style="width: 1820px; height: 0px; left: 50px; top: 88px; position: absolute; border: 1px #C7D0D8 solid"></div>
      <div
        style="left: 1827px; top: 7px; position: absolute; text-align: right; color: #BCD3E3; font-size: 64px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">
        {{ slideIdx + 1 }}</div>
      <img class="21"
        style="width: 280px; height: 242px; left: 1920px; top: 838px; position: absolute; transform: rotate(180deg); transform-origin: 0 0"
        src="rocket.png" />
      <div
        contenteditable @input="(v) => emit('inputHeader', (v.target as HTMLElement).innerHTML || 'Header')"
        style="left: 1048px; top: 238px; position: absolute; color: #1A6AF5; font-size: 96px; font-family: Montserrat; font-weight: 900; word-wrap: break-word">
        {{ header }}</div>
      <div
        contenteditable @input="(v) => emit('inputText', (v.target as HTMLElement).innerHTML || 'Text')"
        style="width: 822px; text-align: left; left: 1048px; top: 379px; position: absolute; color: black; font-size: 48px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">
        {{ text }}</div>
      <div class="Rectangle1"
        style="width: 901px; height: 551px; left: 50px; top: 238px; position: absolute; background: white; border: 1px black solid">
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
