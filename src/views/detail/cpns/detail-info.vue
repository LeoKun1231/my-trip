<!--
 * @Author: hqk
 * @Date: 2022-09-26 21:36:53
 * @LastEditors: hqk
 * @LastEditTime: 2022-09-27 22:13:08
 * @Description: 
-->
<template>
  <div class="info">
    <div class="info__title">
      {{ infoData.houseName }}
    </div>
    <div class="info__tags">
      <template v-for="(item, index) in infoData.houseTags" :key="index">
        <span
          class="info__tags__item"
          v-if="item.tagText"
          :style="{
            color: item.tagText.color,
            background: item.tagText?.background.color,
          }"
        >
          {{ item.tagText.text }}
        </span>
      </template>
    </div>
    <div class="info__comment common">
      <div class="comment__left">
        <span class="left__score">{{ infoData.commentBrief?.overall }}</span>
        <span class="left__title">{{ infoData.commentBrief?.scoreTitle }} </span>
        <span class="left__desc">{{ infoData.commentBrief?.commentBrief }}</span>
      </div>
      <div class="comment__right">
        {{ infoData.commentBrief?.totalCount }}条评论<van-icon name="arrow" />
      </div>
    </div>

    <div class="info__position common">
      <div class="position__left">
        {{ infoData.nearByPosition?.address }}
      </div>
      <div class="position__right">地图·周边<van-icon name="arrow" /></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  infoData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped lang="less">
.info {
  padding: 16px;
  &__title {
    color: #333;
    font-size: 20px;
    font-weight: 700;
  }

  &__tags {
    margin: 10px 0px;
    &__item {
      font-size: 12px;
      padding: 2px 4px;
      margin: 0 2px;
      overflow: hidden;
    }
  }

  &__comment {
    .comment__left {
      .left__score {
        font-size: 18px;
        font-weight: 700;
        color: #333;
        padding: 2px;
      }
      .left__title {
        font-size: 12px;
        font-weight: 700;
        color: #333;
        padding: 2px;
      }
      .left__desc {
        font-size: 12px;
        color: #666;
      }
    }
    .comment__right {
      font-size: 12px;
      color: var(--primary-color);
    }
  }

  &__position {
    .position__left {
      font-weight: 700;
      color: #333;
    }
    .position__right {
      font-size: 12px;
      color: var(--primary-color);
    }
  }
  .common {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f7fa;
    padding: 12px;
    border-radius: 6px;
    margin: 10px 0px;
  }
}
</style>
