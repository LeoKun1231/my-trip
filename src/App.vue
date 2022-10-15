<!--
 * @Author: hqk
 * @Date: 2022-09-10 14:52:19
 * @LastEditors: hqk
 * @LastEditTime: 2022-10-05 10:38:51
 * @Description: 
-->
<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive include="home">
        <Component :is="Component"></Component>
      </keep-alive>
    </router-view>
    <tarbar v-if="!$route.meta.isNotShowTabBar" />
  </div>
</template>

<script setup>
import Tarbar from "./components/tabBar/tabBar.vue";
</script>

<style scoped lang="less"></style>
