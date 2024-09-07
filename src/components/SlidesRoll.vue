<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="slides-roll">
    <div
      class="slides-roll__wrapper"
      v-for="(s, i) in SlidesComponents"
      :key="i"
      @click="emitSetActive(i)"
    >
      <component
        :is="s"
        :class="{ 'active': activeComp === i }"
        v-bind="{ ...slidesInfo[i], slideIdx: i }"
        :slideIdx="i"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Slide as SlideType, SlidesThemes, SlidesTypes } from '@/components/types/slides'
import { ChartTypeRegistry } from 'chart.js'
import { defineAsyncComponent, ref, watch } from 'vue'

const props = defineProps<{
  slidesInfo: SlideType<keyof ChartTypeRegistry | null>[]
  activeComp: number
}>()

const emit = defineEmits<(event: 'setActive', value: number) => void>()

const SlidesComponents = ref<any[]>([])

// Функция для паскалькейса
const pascal = (v: string) => v.charAt(0).toUpperCase() + v.slice(1, v.length)

// Функция для асинхронной загрузки компонентов
const loadSlideComponent = async (type: SlidesTypes, theme: SlidesThemes) => {
  try {
    const component = defineAsyncComponent(() => import(`@/components/Slides/${theme}/${type}.vue`))
    return component
  } catch (error) {
    console.error('Ошибка при загрузке компонента:', error)
    return null // Вернуть null или заглушку
  }
}

// Загрузка компонентов слайдов при изменении данных
const loadComps = async () => {
  const loadedComponents = await Promise.all(
    // eslint-disable-next-line no-return-await
    props.slidesInfo.map(async (s) => await loadSlideComponent(s.type, s.theme)),
  )
  SlidesComponents.value = loadedComponents
}

// Следим за изменением `slidesInfo` для загрузки компонентов
watch(() => props.slidesInfo, loadComps, { immediate: true })

// Метод для эмита события активного слайда
const emitSetActive = (index: number) => {
  console.log(index)
  emit('setActive', index)
}
</script>

<style lang="scss">
.slides-roll {
  max-width: 20%;
  width: 20%;
  max-height: 600px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .slide {
    scale: 0.1;
    pointer-events: none;
    transform-origin: top left; /* Установка точки трансформации */
    width: 100px; /* Задаем реальные размеры */
    height: 100px;
    margin: auto;
    margin-bottom: 30px;

    &.active {
      .content {
        border: 10px solid blue;
      }
    }
  }
}
</style>
