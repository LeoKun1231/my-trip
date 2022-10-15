<!--
 * @Author: hqk
 * @Date: 2022-09-20 21:04:45
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-21 20:37:26
 * @Description: 
-->
<template>
  <div class="house">
    <div class="house__inner">
      <div class="house__background">
        <img :src="itemData.image?.url" alt="" />
      </div>
      <div class="house__info">
        <div class="house__info__summary">
          {{ itemData.summaryText }}
        </div>
        <div class="house__info__houseName">
          {{ itemData.houseName }}
        </div>
        <div class="house__info__footer">
          <van-rate
            :model-value="itemData.commentScore / 1.0"
            :size="15"
            color="#fff"
            readonly
            allow-half
          />
          <div class="footer__price">¥ {{ itemData.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="less">
.house {
  width: 50%;

  &__inner {
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
  }
  &__background {
    img {
      width: 100%;
    }
  }

  &__info {
    position: absolute;
    bottom: 0;
    color: #fff;
    padding: 8px 10px;
    &__summary {
      font-size: 12px;
    }
    &__houseName {
      margin: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    &__footer {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
