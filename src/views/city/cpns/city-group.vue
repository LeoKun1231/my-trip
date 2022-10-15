<!--
 * @Author: hqk
 * @Date: 2022-09-15 22:26:36
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-17 17:54:17
 * @Description: 
-->
<template>
  <div class="city__group">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="#">热门</van-index-anchor>
      <div class="city__group__hotCities">
        <template v-for="city in currentGroup.hotCities" :key="city.cityName">
          <div class="city__group__hotCities__item" @click="handleSelectCity(city)">
            {{ city.cityName }}
          </div>
        </template>
      </div>
      <template v-for="group in currentGroup?.cities" :key="group.group">
        <van-index-anchor :index="group.group" />
        <template v-for="city in group.cities" :key="city.cityName">
          <van-cell :title="city.cityName" @click="handleSelectCity(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import useCityStore from "@/stores/modules/city";
import { computed } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  currentGroup: {
    type: Object,
    default: () => ({}),
  },
});

//根据服务器返回的数据生成索引列表
const indexList = computed(() => {
  return ["#", ...props.currentGroup.cities.map((item) => item.group)];
});

const cityStore = useCityStore();
const router = useRouter();
//处理城市点击
const handleSelectCity = (city) => {
  //1.存储当前选中的城市
  cityStore.currentCity = city;
  // 2.返回上一级
  router.back();
};
</script>

<style scoped lang="less">
.city__group {
  &__hotCities {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10px;
    padding-right: 20px;
    &__item {
      width: 78px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 14px;
      font-size: 14px;
      color: #000;
      background-color: #fff4ec;
      margin: 6px 0;
    }
  }
}
</style>
