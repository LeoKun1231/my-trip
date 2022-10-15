<!--
 * @Author: hqk
 * @Date: 2022-09-11 13:31:52
 * @LastEditors: hqk
 * @LastEditTime: 2022-10-05 11:43:23
 * @Description: 
-->
<template>
  <div class="favor">
    <textarea v-model="textarea" style="text-align: left" placeholder="111111122213"></textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";

const textarea = ref("");
</script>

<style scoped lang="less"></style>
