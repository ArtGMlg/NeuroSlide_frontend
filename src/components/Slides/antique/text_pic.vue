<!-- eslint-disable vuejs-accessibility/alt-text -->
<!-- eslint-disable max-len -->
<template>
  <div class="slide" :style="{ transform: `scale(${scaleFactor})` }">
    <div class="Style1TextPicture content" style="width: 1920px; height: 1080px; position: relative;" :style="{ backgroundColor: color || '#E5DFC8' }">
      <div class="Line1"
        style="width: 1080px; height: 0px; left: 131px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 1px black solid">
      </div>
      <div class="Line2"
        style="width: 1080px; height: 0px; left: 1789px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 1px black solid">
      </div>
      <div class="Line5"
        style="width: 1080px; height: 0px; left: 1256px; top: 0px; position: absolute; transform: rotate(90deg); transform-origin: 0 0; border: 1px black solid">
      </div>
      <div class="Line3"
        style="width: 1920px; height: 0px; left: 1920px; top: 129px; position: absolute; transform: rotate(180deg); transform-origin: 0 0; border: 1px black solid">
      </div>
      <div class="Line4"
        style="width: 1920px; height: 0px; left: 1920px; top: 949px; position: absolute; transform: rotate(180deg); transform-origin: 0 0; border: 1px black solid">
      </div>
      <div
        style="left: 1841px; top: 985px; position: absolute; text-align: center; color: black; font-size: 48px; font-weight: 400; line-height: 57.60px; word-wrap: break-word"
        :style="{ fontFamily: font || 'Lora' }"
      >
        {{ slideIdx + 1 }}</div>
      <div
        contenteditable
        @input="(v) => emit('inputText', (v.target as HTMLElement).innerHTML || 'Text')"
        style="left: 203px; top: 302px; position: absolute; color: black; font-size: 48px; font-weight: 400; line-height: 64.80px; word-wrap: break-word"
        :style="{ fontFamily: font || 'Lora' }"
      >
        {{ text }}</div>
      <div
        contenteditable
        @input="(v) => emit('inputHeader', (v.target as HTMLElement).innerHTML || 'Header')"
        style="left: 203px; top: 185px; position: absolute; color: black; font-size: 64px; font-weight: 400; line-height: 76.80px; word-wrap: break-word"
        :style="{ fontFamily: font || 'Lora' }"
      >
        {{ header }}</div>
      <img class="Image4"
        style="width: 534px; height: 821px; left: 1256px; top: 129px; position: absolute; border: 1px black solid"
        src="https://via.placeholder.com/534x821" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChartTypeRegistry } from 'chart.js'
import { SlideContent } from '@/components/types/slides'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()

const color = ref<string>('')
const font = ref<string>('')

if (route.query.color) {
  color.value = `#${route.query.color.toString()}`
}

if (route.query.font) {
  font.value = route.query.font.toString()
}

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
