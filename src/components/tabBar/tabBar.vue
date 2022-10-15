<!--
 * @Author: hqk
 * @Date: 2022-09-12 15:38:15
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-21 21:38:10
 * @Description: 
-->
<template>
  <van-tabbar v-model="active" active-color="#ff9854" route>
    <template v-for="item in tabBarData" :key="item.text">
      <van-tabbar-item :to="item.path">
        <span>{{ item.text }}</span>
        <template #icon="props">
          <img
            :src="props.active ? getImageUrl(item.imageActive) : getImageUrl(item.image)"
          />
        </template>
      </van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<script setup>
import { ref } from "vue";
import { getImageUrl } from "@/utils/load-assets";
import tabBarData from "@/assets/data/tabBar";
const active = ref(0);
</script>

<style scoped lang="less"></style>
