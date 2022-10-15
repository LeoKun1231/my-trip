<!--
 * @Author: hqk
 * @Date: 2022-09-28 17:28:53
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-28 20:31:27
 * @Description: 
-->
<template>
  <div class="order">
    <DetailSection title="预定须知" :is-show-footer="false">
      <template v-for="item in orderData" :key="item.title">
        <div class="order__item">
          <div class="order__item__left">
            <div class="order__item__title">{{ item.title }}</div>
            <div class="order__item__introduction">{{ item.introduction }}</div>
          </div>
          <div class="order__item__right" v-if="item.tips?.length > 0">查看说明</div>
        </div>
      </template>
    </DetailSection>
  </div>
</template>

<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";

defineProps({
  orderData: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="less">
.order {
  margin-bottom: 20px;
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    &__left {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__title {
      color: #999;
      font-size: 12px;
      width: 60px;
    }
    &__introduction {
      font-size: 12px;
    }

    &__right {
      font-size: 12px;
    }
  }
}
</style>
