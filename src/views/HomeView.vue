<template>
  <div class="ed">
    <SlidesRoll
      :slides-info="slidesInfo"
      :active-comp="activeSlideIndex"
      @set-active="(i) => activeSlideIndex = i" />
    <Slide @scale="scaleSlide">
      <component
        :is="SlidesComponents[activeSlideIndex]"
        v-bind="{
          ...slidesInfo[activeSlideIndex],
          scaleFactor,
          eventBus,
          slideIdx: activeSlideIndex
        }"
        @capture="handleCapture"
        @inputHeader="(v: string) => slidesInfo[activeSlideIndex].header = v"
        @inputText="(v: string) => slidesInfo[activeSlideIndex].text = v"
      ></component>
    </Slide>
  </div>
</template>

<script setup lang="ts">
import { Slide as SlideType, SlidesThemes, SlidesTypes } from '@/components/types/slides'
import Slide from '@/components/Slide.vue'
import { ChartTypeRegistry } from 'chart.js'
import { defineAsyncComponent, ref } from 'vue'
import SlidesRoll from '@/components/SlidesRoll.vue'
import { TinyEmitter } from 'tiny-emitter'

const slidesInfo: SlideType<keyof ChartTypeRegistry | null>[] = [{
  type: 'title',
  theme: 'antique',
  header: 'Пися попа',
  text: 'Имя',
  content: '',
}, {
  type: 'title',
  theme: 'blue',
  header: 'test',
  text: 'test test',
  content: '',
}, {
  type: 'text_pic',
  theme: 'blue',
  header: 'test',
  text: 'test test',
  content: '',
}, {
  type: 'text_plot',
  theme: 'blue',
  header: 'test',
  text: 'test test',
  content: '',
}, {
  type: 'single_text',
  theme: 'blue',
  header: 'test',
  text: 'test test',
  content: '',
}, {
  type: 'caption',
  theme: 'blue',
  header: 'test',
  text: 'test test',
  content: '',
}]

const scaleFactor = ref<number>(0.4)

const activeSlideIndex = ref<number>(0)

const capturedElement = ref<HTMLElement>()

const scaleSlide = (factor: number) => {
  scaleFactor.value = factor
}

const eventBus = new TinyEmitter()

const handleCapture = (el: HTMLElement | undefined) => {
  capturedElement.value = el
  eventBus.emit('capture', capturedElement.value)
}

eventBus.on('doneEditing', () => {
  handleCapture(undefined)
})

const SlidesComponents = ref<any[]>([])

const pascal = (v: string) => v.charAt(0).toUpperCase() + v.slice(1, v.length)

const loadSlideComponent = async (type: SlidesTypes, theme: SlidesThemes) => {
  try {
    const component = defineAsyncComponent(() => import(`@/components/Slides/${theme}/${type}.vue`))
    return component
  } catch (error) {
    console.error('Ошибка при загрузке компонента:', error)
    return null // Можно вернуть компонент-заглушку в случае ошибки
  }
}

const loadComps = () => {
  slidesInfo.forEach(async (s) => {
    const c = await loadSlideComponent(s.type, s.theme)
    SlidesComponents.value.push(c)
  })
}

loadComps()
</script>

<style scoped lang="scss">
.ed {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-height: 600px;
}
</style>
