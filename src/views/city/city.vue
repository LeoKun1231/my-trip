<!--
 * @Author: hqk
 * @Date: 2022-09-12 20:02:42
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-17 19:06:21
 * @Description: 
-->
<template>
  <div class="city">
    <div class="city__header">
      <van-search
        v-model="searchValue"
        shape="round"
        show-action
        placeholder="城市/区域"
        @cancel="handleCancel"
      />
      <van-skeleton :row="1" row-width="99.9%" :loading="loading">
        <van-tabs v-model:active="tabValue" color="#ff9854">
          <template v-for="(value, key, index) in allCities" :key="value">
            <van-tab :title="value.title" :name="key"></van-tab>
          </template>
        </van-tabs>
      </van-skeleton>
    </div>
    <div class="city__content">
      <van-skeleton :row-width="skeletonArr" :row="rowNum" :loading="loading">
        <template v-for="(value, key, index) in allCities" :key="value">
          <CityGroup v-show="tabValue == key" :current-group="value" />
        </template>
      </van-skeleton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import CityGroup from "./cpns/city-group.vue";

const router = useRouter();

//搜索框
const searchValue = ref("");
const handleCancel = () => {
  router.back();
};

//tabs
const tabValue = ref();
const cityStore = useCityStore();
/**
 * 1.请求数据
 * 2.拿数据
 */
//骨架屏加载
const loading = ref(true);
//骨架屏每行长度
const skeletonArr = [
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
  "100%",
];
cityStore.fetchAllCitiesAction().then(() => {
  loading.value = false;
});
const { allCities } = storeToRefs(cityStore);

const rowNum = computed(() => {
  return ((window.screen.height - 118) / 44).toFixed(0);
});
</script>

<style scoped lang="less">
.city {
  &__header {
    --van-skeleton-row-height: 32px;
    height: 6.125rem;
    position: relative;
    z-index: 100;
    overflow: hidden;
  }

  &__content {
    --van-skeleton-row-height: 32px;
    height: calc(100vh - 6.125rem);
    overflow-y: scroll;
  }
}
</style>
