<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/alt-text -->
<template>
  <div class="slide" :style="{ transform: `scale(${scaleFactor})` }">
    <div style="width: 1920px; height: 1080px; position: relative; background: #E5DFC8">
      <img style="width: 1720px; height: 375px; left: 100px; top: 100px; position: absolute; border: 1px black solid" src="https://via.placeholder.com/1720x375" />
      <div style="width: 1080px; height: 0px; left: 100px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 1px black solid"></div>
      <div style="width: 1080px; height: 0px; left: 1819px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 1px black solid"></div>
      <div style="width: 1920px; height: 0px; left: 1920px; top: 575px; position: absolute; transform: rotate(180deg); transform-origin: 0 0; border: 1px black solid"></div>
      <div style="width: 1061px; height: 0px; left: 1061px; top: 980px; position: absolute; transform: rotate(180deg); transform-origin: 0 0; border: 1px black solid"></div>
      <div
        style="width: 1472px; left: 180px; top: 631px; position: absolute; color: black; font-size: 64px; font-family: Lora; font-weight: 400; line-height: 76.80px; word-wrap: break-word"
        contenteditable="true"
      >
        {{ header }}
      </div>
      <div style="left: 1081px; top: 953px; position: absolute; color: black; font-size: 36px; font-family: Lora; font-weight: 400; word-wrap: break-word">Иванов Иван Иванович</div>
      <div style="width: 414px; height: 0px; left: 1920px; top: 980px; position: absolute; transform: rotate(180deg); transform-origin: 0 0; border: 1px black solid"></div>
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
}>()
</script>

<style scoped>
.slide {
  transform-origin: center center; /* Точка масштабирования - центр */
  transition: transform 0.3s; /* Плавное изменение масштаба */
}
</style>
