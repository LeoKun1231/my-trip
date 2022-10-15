<!--
 * @Author: hqk
 * @Date: 2022-09-19 21:25:36
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-20 20:26:06
 * @Description: 
-->
<template>
  <div style="overflow: hidden">
    <div class="home-categories">
      <a
        v-for="item in categories"
        class="categories__item"
        :key="item.id"
        :href="item.navigateUrl"
      >
        <img :src="item.pictureUrl" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";

const homeStore = useHomeStore();
const { categories } = storeToRefs(homeStore);
</script>

<style scoped lang="less">
.home-categories {
  display: flex;
  align-items: center;
  flex-shrink: 1;
  margin-top: 20px;
  padding: 0 20px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .categories__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    img {
      width: 32px;
    }
    div {
      text-align: center;
      width: 60px;
    }
  }
}
</style>
