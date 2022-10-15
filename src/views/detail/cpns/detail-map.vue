<!--
 * @Author: hqk
 * @Date: 2022-09-27 23:06:15
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-28 16:00:55
 * @Description: 
-->
<template>
  <div class="map">
    <DetailSection title="位置周围" footer="查看更多周边信息">
      <Map />
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";
import Map from "@/components/map/map.vue";
</script>

<style scoped lang="less"></style>
