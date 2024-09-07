<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/alt-text -->
<template>
  <div>
    <img src="image 5.png" class="logo">
    <div class="wrapper">
      <div class="welcome-text">Создание перезентаций с помощью искусственного интеллекта</div>
      <div class="start-btn" @click="redirect">Создать презентацию</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const redirect = () => {
  router.push('/guide')
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

.welcome-text {
  color: rgb(17, 17, 17);
  font-family: Montserrat;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 0%;
  text-align: center;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.start-btn {
  background-color: rgb(26, 106, 245);
  padding: 32px 64px 32px 64px;
  color: rgb(255, 255, 255);
  font-family: Montserrat;
  font-size: 30px;
  font-weight: 600;
  line-height: 59px;
  letter-spacing: 0%;
  text-align: center;
  width: fit-content;
  padding: 0 25px;
  border-radius: 35px;
}
</style>
