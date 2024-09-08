<!-- eslint-disable vuejs-accessibility/alt-text -->
<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable max-len -->
<template>
  <div class="ed" v-if="slidesInfo.length">
    <!-- <div>
      <img src="image 5.png">
      <div @click="toggleEx">Экспорт</div>
    </div> -->
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
    <div></div>
  </div>
  <div v-else>
    <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: calc(100vh - 50px);">
      <span class="loader"></span>
    </div>
  </div>
  <div v-if="slidesInfo.length" class="call-ai" @click="toggle">
    <i class="pi pi-sparkles"></i>
  </div>
  <Popover ref="op">
    <div style="display: flex; align-items: center; margin: 10px;">
      <input class="input-ai" v-model="newPrompt" placeholder="Что нужно поменять...">
      <div class="submit-ai" @click="submitAI">
        <i v-if="!isSubmitting" class="pi pi-check"></i>
        <i v-else class="pi pi-spin pi-spinner"></i>
      </div>
    </div>
  </Popover>
  <Popover ref="opEx">
    <div @click="exportSlides('pdf')">PDF</div>
  </Popover>
</template>

<script setup lang="ts">
import { Slide as SlideType, SlidesThemes, SlidesTypes } from '@/components/types/slides'
import Slide from '@/components/Slide.vue'
import { ChartTypeRegistry } from 'chart.js'
import { defineAsyncComponent, ref } from 'vue'
import SlidesRoll from '@/components/SlidesRoll.vue'
import { TinyEmitter } from 'tiny-emitter'
import { generateService } from '@/init/services'
import { useRoute } from 'vue-router'
import Popover from 'primevue/popover'

const route = useRoute()

const op = ref()
const opEx = ref()

const slidesInfo = ref<SlideType<keyof ChartTypeRegistry | null>[]>([])

const scaleFactor = ref<number>(0.4)

const activeSlideIndex = ref<number>(0)

const capturedElement = ref<HTMLElement>()

const newPrompt = ref<string>('')

const isSubmitting = ref<boolean>(false)

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
  slidesInfo.value.forEach(async (s) => {
    const c = await loadSlideComponent(s.type, s.theme)
    SlidesComponents.value.push(c)
  })
}

const toggle = (event: any) => {
  op.value.toggle(event)
}

const toggleEx = (event: any) => {
  opEx.value.toggle(event)
}

const exportSlides = (type: string) => {
  const htmls: string[] = []

  Array.from(document.getElementsByClassName('slide')).forEach((e) => {
    if (e.innerHTML) {
      htmls.push(e.innerHTML)
    }
  })

  generateService.export(htmls).then((r) => console.log(r))
}

const submitAI = () => {
  if (newPrompt.value && route.query.chatId) {
    isSubmitting.value = true
    generateService.rewrite({
      chatId: route.query.chatId.toString(),
      message: newPrompt.value,
      oldMessage: slidesInfo.value[activeSlideIndex.value].text,
    }).then((res) => {
      slidesInfo.value[activeSlideIndex.value].text = res
      isSubmitting.value = false
    })
  }
}

const prompt = sessionStorage.getItem('prompt')

if (route.query.chatId && prompt && route.query.theme) {
  generateService.generate({
    chatId: route.query.chatId.toString(),
    message: prompt,
  })
    .then((res) => {
      let i = 0

      const getType = (n: number) => {
        if (n === 0) return 'title'
        if (n === res.length - 1) return 'caption'
        return 'single_text'
      }

      res.forEach((r) => {
        slidesInfo.value.push({
          type: getType(i),
          theme: route.query.theme?.toString(),
          header: r.title || 'Title',
          text: r.text || 'Text',
        })

        i += 1
      })

      loadComps()
    })
    .catch(console.log)
}
</script>

<style scoped lang="scss">
.ed {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-height: 600px;
}

.call-ai {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #1C68F5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 25px;
  cursor: pointer;
  top: 35px;
  right: 15px;
}

.submit-ai {
  border-radius: 20px;
  width: 25px;
  height: 25px;
  background-color: #1C68F5;
  color: white;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 5px;
}

.input-ai {
  padding: 10px;
  border: none;
  border-radius: 40px;
  background-color: #F4F4F4;
}

.loader {
  width: 100px;
  height: 100px;
  background: linear-gradient(
    165deg,
    rgba(28, 104, 245, 1) 0%,     /* Основной цвет */
    rgb(100, 150, 255) 40%,       /* Светлый оттенок */
    rgb(70, 120, 255) 98%,        /* Переход к тёмному */
    rgb(28, 40, 155) 100%         /* Более тёмный оттенок */
  );
  border-radius: 50%;
  position: relative;
  display: block;
}

.loader:before {
  position: absolute;
  content: "";
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border-bottom: 0 solid rgba(28, 104, 245, 0.05);
  box-shadow: 0 -10px 20px 20px rgba(100, 150, 255, 0.4) inset,  /* Светлый оттенок */
              0 -5px 15px 10px rgba(100, 150, 255, 0.5) inset,   /* Светлее */
              0 -2px 5px rgba(100, 150, 255, 0.8) inset,         /* Ещё светлее */
              0 -3px 2px rgba(100, 150, 255, 1) inset,           /* Максимально светлый */
              0 2px 0px rgba(100, 150, 255, 0.9),                /* Блик */
              0 2px 3px rgba(100, 150, 255, 0.9),
              0 5px 5px rgba(100, 150, 255, 0.9),
              0 10px 15px rgba(100, 150, 255, 0.6),
              0 10px 20px 20px rgba(100, 150, 255, 0.4);
  filter: blur(3px);
  animation: 2s rotate linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

</style>
