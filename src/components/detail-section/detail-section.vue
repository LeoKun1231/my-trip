<!--
 * @Author: hqk
 * @Date: 2022-09-27 22:17:38
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-28 17:26:36
 * @Description: 
-->
<template>
  <div class="section">
    <div class="section__header">
      <h2>{{ title }}</h2>
    </div>
    <div class="section__content">
      <slot></slot>
    </div>
    <div class="section__footer" v-if="isShowFooter">
      {{ footer }}<van-icon name="arrow" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "我是标题",
  },
  footer: {
    type: String,
    default: "这是底部",
  },

  isShowFooter: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="less">
.section {
  padding: 0 16px;
  border-top: 5px solid #f2f3f4;
  &__header {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
  }
  &__content {
    padding: 5px 0;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: end;
    height: 44px;
    color: var(--primary-color);
  }
}
</style>
