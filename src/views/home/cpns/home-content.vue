<!--
 * @Author: hqk
 * @Date: 2022-09-20 21:28:00
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-27 21:33:17
 * @Description: 
-->
<template>
  <div class="home-content">
    <template v-for="item in houseList" :key="item.data?.houseId">
      <HouseItemV9
        :item-data="item.data"
        v-if="item.discoveryContentType == 9"
        @click="handleHouseItemItem(item.data)"
      />
      <HouseItemV3
        :item-data="item.data"
        v-else-if="item.discoveryContentType == 3"
        @click="handleHouseItemItem(item.data)"
      />
    </template>
  </div>
</template>

<script setup>
import HouseItemV9 from "@/components/house-item-v9/house-item-v9.vue";
import HouseItemV3 from "@/components/house-item-v3/house-item-v3.vue";

import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const homeStore = useHomeStore();
const { houseList } = storeToRefs(homeStore);

const handleHouseItemItem = (item) => {
  router.push("/detail/" + item.houseId);
};
</script>

<style scoped lang="less">
.home-content {
  display: flex;
  flex-wrap: wrap;
}
</style>
