<template>
  <div class="loading" @click="handleClick" v-if="isLoading">
    <div class="loading__bg">
      <img src="@/assets/img/home/full-screen-loading.gif" />
    </div>
  </div>
</template>

<script setup>
import useMainStore from "@/stores/modules/main";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);

const handleClick = () => {
  isLoading.value = false;
};
</script>

<style scoped lang="less">
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2000;
  &__bg {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(@/assets/img/home/loading-bg.png);
    background-size: 100% 100%;
    background-position: 0 0;
    img {
      width: 75px;
      height: 75px;
      margin-bottom: 10px;
    }
  }
}
</style>
