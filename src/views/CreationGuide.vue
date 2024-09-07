<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/alt-text -->
<template>
  <div style="padding: 5rem 6rem;" v-if="currentStep === 1" class="step1">
    <!-- <img src="image 5.png" class="logo"> -->
    <div class="heading1">Опишите тематику презентации</div>
    <div class="heading2">или прикрепите документ(ы) для создания презентации на его основе</div>
    <div class="input-area">
      <div style="display: flex;">
        <input type="text" placeholder="О чём будет презентация?" v-model="prompt">
        <input type="file" accept=".docx" @change="processDoc" ref="doc" style="display: none" />
        <input type="file" accept=".xlsx" @change="processSheet" ref="sheet" style="display: none" />
        <div class="btns-holder">
          <div @click="uploadDoc" class="btn"><i class="pi pi-file-plus"></i></div>
          <div @click="uploadSheet" class="btn"><i class="pi pi-table"></i></div>
        </div>
      </div>
      <div class="files">
        <div v-if="fileDoc" class="file-chip">{{ fileDoc?.name }}<i @click="fileDoc = null" class="pi pi-times"></i></div>
        <div v-if="fileSheet" class="file-chip">{{ fileSheet?.name }}<i @click="fileSheet = null" class="pi pi-times"></i></div>
      </div>
    </div>
  </div>
  <div class="step2" style="padding: 5rem 6rem;" v-if="currentStep === 2">
    <div class="heading1">Выберите шаблон презентации</div>
    <div class="heading2">Цвет и шрифт можно изменить</div>

    <div class="style-selector">
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedStyle === 'antique' }" @click="selectedStyle = 'antique'">
          <template #title>Стиль 1</template>
          <template #content>
            <div style="background: url('antique.png'); height: 200px;"></div>
          </template>
        </Card>
      </div>
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedStyle === 'blue' }" @click="selectedStyle = 'blue'">
          <template #title>Стиль 2</template>
          <template #content>
            <div style="background: url('blue.png'); height: 200px; background-size: contain;"></div>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div class="step3" style="padding: 5rem 6rem;" v-if="currentStep === 3">
    <div class="heading1">Выберите цвет презентации</div>
    <!-- <div class="heading2">Цвет и шрифт можно изменить</div> -->

    <div class="style-selector">
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedColor === '5291FF' }" @click="selectedColor = '5291FF'">
          <template #title>Цвет 1</template>
          <template #content>
            <div style="background: url('colorlightblue.png'); height: 200px; background-size: contain;"></div>
          </template>
        </Card>
      </div>
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedColor === 'FF52F8' }" @click="selectedColor = 'FF52F8'">
          <template #title>Цвет 2</template>
          <template #content>
            <div style="background: url('colorpink.png'); height: 200px; background-size: contain;"></div>
          </template>
        </Card>
      </div>
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedColor === '52FF63' }" @click="selectedColor = '52FF63'">
          <template #title>Цвет 3</template>
          <template #content>
            <div style="background: url('colorgreen.png'); height: 200px; background-size: contain;"></div>
          </template>
        </Card>
      </div>
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedColor === 'FF5252' }" @click="selectedColor = 'FF5252'">
          <template #title>Цвет 4</template>
          <template #content>
            <div style="background: url('colorred.png'); height: 200px; background-size: contain;"></div>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div class="step4" style="padding: 5rem 6rem;" v-if="currentStep === 4">
    <div class="heading1">Выберите шрифт презентации</div>
    <!-- <div class="heading2">Цвет и шрифт можно изменить</div> -->

    <div class="style-selector">
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedFont === 'Ysabeau' }" @click="selectedFont = 'Ysabeau'">
          <template #title><span style="font-family: Ysabeau;">Ysabeau</span></template>
          <template #content>
            <div style="background: url('Ysabeau.png'); height: 200px; background-size: contain;"></div>
          </template>
        </Card>
      </div>
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedFont === 'Lora' }" @click="selectedFont = 'Lora'">
          <template #title><span style="font-size: Lora;">Lora</span></template>
          <template #content>
            <div style="background: url('Lora.png'); height: 200px; background-size: contain;"></div>
          </template>
        </Card>
      </div>
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedFont === 'Montserrat' }" @click="selectedFont = 'Montserrat'">
          <template #title><span style="font-family: Montserrat;">Montserrat</span></template>
          <template #content>
            <div style="background: url('Montserrat.png'); height: 200px; background-size: contain;"></div>
          </template>
        </Card>
      </div>
      <div>
        <Card style="width: 350px;" :class="{ 'selected': selectedFont === 'Roboto' }" @click="selectedFont = 'Roboto'">
          <template #title><span style="font-family: Roboto;">Roboto</span></template>
          <template #content>
            <div style="background: url('Roboto.png'); height: 200px; background-size: contain;"></div>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div class="floating-btn" v-if="currentStep !== 4" @click="nextStep">Дальше</div>
  <div class="floating-btn" v-else @click="finish">Создать<br>презентацию</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import { generateService } from '@/init/services'
import { uniqueId } from '@/reusable/functions'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentStep = ref<number>(1)

const doc = ref<HTMLInputElement>()
const sheet = ref<HTMLInputElement>()

const fileDoc = ref<File | null>(null)
const fileSheet = ref<File | null>(null)
const prompt = ref<string>('')

const uploadDoc = () => {
  doc.value?.click()
}

const uploadSheet = () => {
  sheet.value?.click()
}

const selectedStyle = ref<string>('')
const selectedColor = ref<string>('')
const selectedFont = ref<string>('')

const nextStep = () => {
  switch (currentStep.value) {
    case 1:
      if (prompt.value && fileDoc.value) {
        currentStep.value += 1
      }
      break
    case 2:
      if (selectedStyle.value) {
        currentStep.value += 1
      }
      break
    case 3:
      if (selectedColor.value) {
        currentStep.value += 1
      }
      break
    default:
      break
  }
}

const id = uniqueId()

const finish = () => {
  if (selectedFont.value && fileDoc.value) {
    generateService.loadDoc(id, fileDoc.value).then(() => {
      sessionStorage.setItem('prompt', prompt.value)
      router.push(`/app?chatId=${id}&theme=${selectedStyle.value}&color=${selectedColor.value}&font=${selectedFont.value}`)
    })
  }
}

const processDoc = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    fileDoc.value = target.files[0]
    console.log('Выбранный файл:', fileDoc.value)
  }
}

const processSheet = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    fileSheet.value = target.files[0]
    console.log('Выбранный файл:', fileSheet.value)
  }
}
</script>

<style scoped>
.logo {
  position: absolute;
  width: 330px;
  height: 107px;
  left: 0;
  top: 9px;
}

.style-selector {
  display: grid;
  grid-template-columns: 350px 350px;
  gap: 80px;
  margin-top: 50px;
  height: 360px;
  overflow: auto;
  width: 800px;
  padding: 20px 0;

  .selected {
    border: #1A6AF5 4px solid;
  }
}

.heading1 {
  font-family: Montserrat;
  font-size: 40px;
  text-align: left;
  width: 55%;
}

.heading2 {
  font-family: Montserrat;
  color: #1A6AF5;
  font-size: 29px;
  text-align: left;
  width: 50%;
}

.input-area {
  display: flex;
  margin-top: 30px;
  flex-direction: column;

  input {
    background-color: #F7F7F7;
    border: none;
    border-radius: 40px;
    padding: 20px;
    width: 600px;
  }
}

::v-deep .p-card-title {
  font-family: Montserrat;
  font-size: 20px;
  text-align: left;
  margin-bottom: 10px;
}

.files {
  display: flex;
  margin-top: 20px;
}

.floating-btn {
  font-family: Montserrat;
  width: fit-content;
  background-color: #1A6AF5;
  color: white;
  padding: 10px 20px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 25px;
  position: absolute;
  right: 80px;
  bottom: 170px;
  cursor: pointer;
}

.file-chip {
  background-color: #ECF3FF;
  padding: 10px;
  border-radius: 20px;
  margin-right: 5px;

  display: flex;
  align-items: center;

  i {
    cursor: pointer;
  }
}

.btns-holder {
  display: flex;
  align-items: center;
}

.btn {
  font-size: 40px;
  background-color: #1A6AF5;
  color: white;
  padding: 10px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
}
</style>
