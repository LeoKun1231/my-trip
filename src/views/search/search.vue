<!--
 * @Author: hqk
 * @Date: 2022-09-18 20:36:54
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-19 21:22:28
 * @Description: 
-->
<template>
  <div class="search">
    <h2>{{ formateDateTime($route.query.startDate) }}</h2>
    <h2>{{ formateDateTime($route.query.endDate) }}</h2>
    <h2>{{ $route.query.currentCity }}</h2>
  </div>
</template>

<script setup>
import { formateDateTime } from "@/utils";
</script>

<style scoped lang="less"></style>
