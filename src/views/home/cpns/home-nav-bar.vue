<!--
 * @Author: hqk
 * @Date: 2022-09-11 18:16:22
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-21 21:50:25
 * @Description: 
-->
<template>
  <div class="home-nav-bar">
    <div class="home-nav-bar__title">我的路途</div>
  </div>
</template>

<script setup></script>

<style scoped lang="less">
.home-nav-bar {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px #f2f2f2 solid;
  z-index: 11;
  &__title {
    color: var(--primary-color);
    font-weight: 700;
  }
}
</style>
