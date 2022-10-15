<!--
 * @Author: hqk
 * @Date: 2022-09-24 15:13:41
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-25 16:24:09
 * @Description: 
-->
<template>
  <van-swipe class="swipe" :autoplay="3000">
    <template v-for="item in swipeData">
      <van-swipe-item class="swipe__item">
        <img :src="item.url" />
      </van-swipe-item>
    </template>
    <template #indicator="{ active, total }">
      <div class="swipe__indicator">
        <template v-for="(value, key, index) in swipeGroup" :key="key">
          <span
            class="swipe__indicator__item"
            :class="{ active: key == swipeData[active]?.enumPictureCategory }"
          >
            <span class="swipe__indicator__item__title">
              {{ getSwipeGroupName(value[0].title) }}
            </span>
            <span
              class="swipe__indicator__item__num"
              v-if="key == swipeData[active]?.enumPictureCategory"
            >
              {{ findCurrentPicIndex(swipeData[active]) + 1 }}/{{ value.length }}
            </span>
          </span>
        </template>
      </div>
    </template>
  </van-swipe>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});

const swipeGroup = ref({});
watch(
  () => props.swipeData,
  () => {
    for (const item of props.swipeData) {
      let houseGruop = swipeGroup.value[item.enumPictureCategory];
      if (!houseGruop) {
        houseGruop = [];
        swipeGroup.value[item.enumPictureCategory] = houseGruop;
      }
      houseGruop.push(item);
    }
  }
);

const strRexg = /【(.*?)】/;
const getSwipeGroupName = (str) => {
  const result = strRexg.exec(str);
  return result[1];
};

const findCurrentPicIndex = (value) => {
  return swipeGroup.value[value?.enumPictureCategory].findIndex((item) => item === value);
};
</script>

<style scoped lang="less">
.swipe {
  &__item {
    img {
      width: 100%;
    }
  }

  &__indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    &__item {
      padding: 0 10px;
      &.active {
        background-color: #fff;
        color: black;
        border-radius: 4px;
        overflow: hidden;
      }
    }
  }
}
</style>
